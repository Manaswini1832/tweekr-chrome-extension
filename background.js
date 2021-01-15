function handleMessage(request, sender, sendResponse) {
    console.clear();
    console.log("Message from the content script: " +
      request.message);

    // sendResponse(request);
    const response = { 
        response: "Success",
    }

    //Send above success message to the content script on successfully adding tweek to database
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, response);
    });

    console.clear();
}
chrome.runtime.onMessage.addListener(handleMessage);