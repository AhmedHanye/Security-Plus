"use strict";
const openDB = (dbName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onerror = (event) => reject(event);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(dbName)) {
                const objectStore = db.createObjectStore(dbName, {
                    keyPath: "id",
                    autoIncrement: true,
                });
                objectStore.createIndex("url", "url", { unique: true });
                objectStore.createIndex("state", "state", { unique: false });
                objectStore.createIndex("date", "date", { unique: false });
            }
        };
    });
};
const websiteDB = openDB("websites");
const domainDB = openDB("domains");
const getItems = (DB, dbName) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readonly");
        const request = transaction.objectStore(dbName).getAll();
        request.onerror = (event) => reject(event);
        request.onsuccess = (event) => resolve(request.result);
    });
};
const getItem = (DB, dbName, url) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readonly");
        const request = transaction.objectStore(dbName).index("url").getKey(url);
        request.onerror = (event) => reject(event);
        request.onsuccess = (event) => resolve(request.result);
    });
};
const updateItem = (DB, dbName, id, state) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readwrite");
        const request = transaction.objectStore(dbName).get(id);
        request.onerror = (event) => reject(event);
        request.onsuccess = (event) => {
            try {
                const data = request.result;
                data.state = state;
                const updateRequest = transaction.objectStore(dbName).put(data);
                updateRequest.onerror = (event) => reject(event);
                updateRequest.onsuccess = (event) => resolve();
            }
            catch (error) {
                reject(error);
            }
        };
    });
};
const addItem = (DB, dbName, item, state) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readwrite");
        const request = transaction
            .objectStore(dbName)
            .add({ url: item, state, date: Date.now() });
        request.onerror = async (event) => {
            if (event.target.error.name === "ConstraintError") {
                const index = await getItem(DB, dbName, item);
                resolve(updateItem(DB, dbName, index, state));
            }
            reject(event);
        };
        request.onsuccess = () => resolve();
    });
};
const deleteItem = (DB, dbName, id) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readwrite");
        const objectStore = transaction.objectStore(dbName);
        const getRequest = objectStore.get(id);
        getRequest.onsuccess = () => {
            const data = getRequest.result;
            if (!data) {
                reject(new Error(`Item with ID ${id} does not exist.`));
            }
            else {
                const deleteRequest = objectStore.delete(id);
                deleteRequest.onsuccess = () => resolve();
                deleteRequest.onerror = (event) => reject(event);
            }
        };
        getRequest.onerror = (event) => reject(event);
    });
};
const clearItems = (DB, dbName) => {
    return new Promise((resolve, reject) => {
        const transaction = DB.transaction(dbName, "readwrite");
        const request = transaction.objectStore(dbName).clear();
        request.onerror = (event) => reject(event);
        request.onsuccess = () => resolve();
    });
};
const handleStorageAction = async (request, callback) => {
    try {
        switch (request.type) {
            case 0:
                callback(await getItems(await websiteDB, "websites"));
                break;
            case 1:
                callback(await getItems(await domainDB, "domains"));
                break;
            case 2:
                await addItem(await websiteDB, "websites", request.item, request.state);
                callback("Item added/updated successfully.");
                break;
            case 3:
                await addItem(await domainDB, "domains", request.item, request.state);
                callback("Item added/updated successfully.");
                break;
            case 4:
                await updateItem(await websiteDB, "websites", request.id, request.state);
                callback("Item updated successfully.");
                break;
            case 5:
                await updateItem(await domainDB, "domains", request.id, request.state);
                callback("Item updated successfully.");
                break;
            case 6:
                await deleteItem(await websiteDB, "websites", request.id);
                callback("Item deleted successfully.");
                break;
            case 7:
                await deleteItem(await domainDB, "domains", request.id);
                callback("Item deleted successfully.");
                break;
            case 8:
                await clearItems(await websiteDB, "websites");
                callback("Items cleared successfully.");
                break;
            case 9:
                await clearItems(await domainDB, "domains");
                callback("Items cleared successfully.");
                break;
            default:
                callback("Invalid request.");
        }
    }
    catch (error) {
        callback(`Error: ${error}`, true);
    }
};
// Speak with the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const handleResponse = (response, faild = false) => {
        if (!faild && request.type > 1 && request.type < 10) {
            updateDynamicRules(() => {
                sendResponse([response, faild]);
            });
        }
        else {
            sendResponse([response, faild]);
        }
    };
    handleStorageAction(request, handleResponse);
    // Return true to indicate that the response will be sent asynchronously
    return true;
});
// make a rule object
function returnRule(id, url, action, priority) {
    return {
        id: id,
        priority: priority,
        action: action,
        condition: {
            urlFilter: url,
            resourceTypes: ["main_frame", "sub_frame"],
        },
    };
}
// Get the rules from the storage
async function getNewRules() {
    const [websites, domains] = await Promise.all([
        getItems(await websiteDB, "websites"),
        getItems(await domainDB, "domains"),
    ]);
    const rules = [];
    let id = 1;
    websites.forEach((website) => {
        rules.push(returnRule(id++, website.url, website.state
            ? { type: "allow" } // Allow action
            : {
                type: "redirect",
                redirect: { url: chrome.runtime.getURL("index.html#blocked") },
            }, 3));
    });
    domains.forEach((domain) => {
        rules.push(returnRule(id++, domain.url, domain.state
            ? { type: "allow" } // Allow action
            : {
                type: "redirect",
                redirect: { url: chrome.runtime.getURL("index.html#blocked") },
            }, 2));
    });
    rules.push(returnRule(id, "*://*/*", {
        type: "redirect",
        redirect: { url: chrome.runtime.getURL("index.html") },
    }, 1));
    return rules;
}
// Update the dynamic rules
async function updateDynamicRules(callback) {
    try {
        const newRules = await getNewRules();
        const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
        const oldRuleIds = oldRules.map((rule) => rule.id);
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: oldRuleIds,
            addRules: newRules,
        });
        await callback("Rules updated successfully.", false);
    }
    catch (error) {
        await callback(`Error: ${error}`, true);
    }
}
updateDynamicRules(() => { });
// save the url in the form of tap id : url
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    chrome.storage.local.set({ [details.tabId]: details.url });
});
// Remove the stored data when the tab is closed
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    chrome.storage.local.remove(tabId.toString());
});
