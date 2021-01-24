function init(){
    chrome.runtime.sendMessage({ message : "is_user_signed_in" }, (res) => {
        if(res.message === "Message successfully received" && res.payload ){
            window.location.replace("./signedIn.html");
        }
    });
}

init();

const signInBtn = document.getElementsByTagName("button")[0];
signInBtn.addEventListener("click", () => {
    chrome.tabs.query({currentWindow: true,active: true}, function(tabs){ 
        chrome.runtime.sendMessage({ message : "Tabs coming!!!", payload : tabs, id: chrome.runtime.id });
    });
});