const theme = localStorage.getItem("theme") == "true";
document.querySelector("html").classList.add(theme ? "dark" : "light");
