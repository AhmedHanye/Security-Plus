let openDB=r=>new Promise((t,a)=>{var e=indexedDB.open(r,1);e.onerror=e=>a(e),e.onsuccess=e=>t(e.target.result),e.onupgradeneeded=e=>{var e=e.target.result;e.objectStoreNames.contains(r)||((e=e.createObjectStore(r,{keyPath:"id",autoIncrement:!0})).createIndex("url","url",{unique:!0}),e.createIndex("state","state",{unique:!1}),e.createIndex("date","date",{unique:!1}))}}),websiteDB=openDB("websites"),domainDB=openDB("domains"),getItems=(e,s)=>new Promise((t,a)=>{let r=e.transaction(s,"readonly").objectStore(s).getAll();r.onerror=e=>a(e),r.onsuccess=e=>t(r.result)}),getItem=(e,s,i)=>new Promise((t,a)=>{let r=e.transaction(s,"readonly").objectStore(s).index("url").getKey(i);r.onerror=e=>a(e),r.onsuccess=e=>t(r.result)}),updateItem=(e,n,t,c)=>new Promise((r,s)=>{let i=e.transaction(n,"readwrite"),o=i.objectStore(n).get(t);o.onerror=e=>s(e),o.onsuccess=e=>{try{var t=o.result,a=(t.state=c,i.objectStore(n).put(t));a.onerror=e=>s(e),a.onsuccess=e=>r()}catch(e){s(e)}}}),addItem=(s,i,o,n)=>new Promise((a,r)=>{var e=s.transaction(i,"readwrite").objectStore(i).add({url:o,state:n,date:Date.now()});e.onerror=async e=>{var t;"ConstraintError"===e.target.error.name&&(t=await getItem(s,i,o),a(updateItem(s,i,t,n))),r(e)},e.onsuccess=()=>a()}),deleteItem=(e,i,o)=>new Promise((t,a)=>{let r=e.transaction(i,"readwrite").objectStore(i),s=r.get(o);s.onsuccess=()=>{var e;s.result?((e=r.delete(o)).onsuccess=()=>t(),e.onerror=e=>a(e)):a(new Error(`Item with ID ${o} does not exist.`))},s.onerror=e=>a(e)}),clearItems=(r,s)=>new Promise((e,t)=>{var a=r.transaction(s,"readwrite").objectStore(s).clear();a.onerror=e=>t(e),a.onsuccess=()=>e()}),handleStorageAction=async(e,t)=>{try{switch(e.type){case 0:t(await getItems(await websiteDB,"websites"));break;case 1:t(await getItems(await domainDB,"domains"));break;case 2:await addItem(await websiteDB,"websites",e.item,e.state),t("Item added/updated successfully.");break;case 3:await addItem(await domainDB,"domains",e.item,e.state),t("Item added/updated successfully.");break;case 4:await updateItem(await websiteDB,"websites",e.id,e.state),t("Item updated successfully.");break;case 5:await updateItem(await domainDB,"domains",e.id,e.state),t("Item updated successfully.");break;case 6:await deleteItem(await websiteDB,"websites",e.id),t("Item deleted successfully.");break;case 7:await deleteItem(await domainDB,"domains",e.id),t("Item deleted successfully.");break;case 8:await clearItems(await websiteDB,"websites"),t("Items cleared successfully.");break;case 9:await clearItems(await domainDB,"domains"),t("Items cleared successfully.");break;default:t("Invalid request.")}}catch(e){t("Error: "+e,!0)}};function returnRule(e,t,a,r){return{id:e,priority:r,action:a,condition:{urlFilter:t,resourceTypes:["main_frame"]}}}async function getNewRules(){var[e,t]=await Promise.all([getItems(await websiteDB,"websites"),getItems(await domainDB,"domains")]);let a=[],r=1;return e.forEach(e=>{a.push(returnRule(r++,`|${e.url}|`,e.state?{type:"allow"}:{type:"redirect",redirect:{url:chrome.runtime.getURL("index.html#blocked")}},3))}),t.forEach(e=>{a.push(returnRule(r++,`*://${e.url}/*`,e.state?{type:"allow"}:{type:"redirect",redirect:{url:chrome.runtime.getURL("index.html#blocked")}},2))}),a.push(returnRule(r,"*://*/*",{type:"redirect",redirect:{url:chrome.runtime.getURL("index.html")}},1)),a}async function updateDynamicRules(t){try{var e=await getNewRules(),a=(await chrome.declarativeNetRequest.getDynamicRules()).map(e=>e.id);await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:a,addRules:e}),await t("Rules updated successfully.",!1)}catch(e){console.error("Error updating dynamic rules:",e),await t("Error: "+e,!0)}}chrome.runtime.onMessage.addListener((a,e,r)=>{return handleStorageAction(a,(e,t=!1)=>{!t&&1<a.type&&a.type<10?updateDynamicRules(()=>{r([e,t])}):r([e,t])}),!0}),updateDynamicRules(()=>{}),chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(e=>{chrome.storage.local.set({[e.request.tabId]:e.request.url})}),chrome.tabs.onRemoved.addListener(function(e,t){chrome.storage.local.remove(e.toString())}),chrome.action.onClicked.addListener(e=>{chrome.tabs.create({url:chrome.runtime.getURL("index.html#settings/general")})});