function handleMessage(request, sender, sendResponse) {
    if(request){
    // console.clear();
    console.log("Message from the content script: " + request);
    }

    try {
        //After receiving id, store data to the database
        console.log("Successfully Tweeked!");
        //Send success notification to the content script and display it to the user
        chrome.notifications.create({
            iconUrl: chrome.runtime.getURL('tweekr-logo-optimized.svg'),
            type: 'basic',
            title: "",
            message: "Successfully tweeked 🎉",
          }, function() {});
    } catch (err) {
        throw err;
    }

    // console.clear();
}
chrome.runtime.onMessage.addListener(handleMessage);