chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "goToHomePage") {
      chrome.tabs.create({ url: "chrome://newtab" }); // Open Chrome home page in a new tab
    }
  });

  