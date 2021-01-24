let authenticated = false;
function getCookie(){
    chrome.cookies.get({name :"session", url: "http://localhost:3000/"}, (res) => {
        if(res) {
            authenticated = true;
        }else{
            authenticated = false;
        }
    });
}

getCookie();

//This message comes from the popup init script, to check if user is authenticated or not and changes popup html to be displayed accordingly
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    getCookie();
    if(request.message === "is_user_signed_in"){
        sendResponse({
            message : "Message successfully received",
            payload : authenticated
        });
    } 
});

//This message comes from content script, to check if user is authenticated or not
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "From_content_script_want_auth_status"){
        sendResponse({
            message : "Message successfully received",
            payload : authenticated
        });
    } 
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "Tabs coming!!!"){
        const currentTabId = request.payload[0].id;
        chrome.tabs.update(currentTabId, {url: "http://localhost:3000/login"});
    }
});
