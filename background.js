let userID = null;

//Uid in local localStorage
if(localStorage.getItem("uid")){
    userID = localStorage.getItem("uid");
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
        if(request.message === "Message from the web app"){
            console.log(request.uid);
            userID = request.uid;
            localStorage.setItem('uid', userID);
        }
});

chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(request, sender, sendResponse) {
        if(request && request.message === "Sending ID"){
            //Sanitize input
            const numRegex = /^\d+$/;
            const ans = request.idToBeSent.match(numRegex);
            if(ans){
                makeRequest(request.idToBeSent);
            } 
        }
    }    
    var firebaseConfig = {
        apiKey: "AIzaSyAN5c98Gziv1pLEP7FltONAcDS07MO7VXE",
        authDomain: "dummy-extension-6d140.firebaseapp.com",
        projectId: "dummy-extension-6d140",
        storageBucket: "dummy-extension-6d140.appspot.com",
        messagingSenderId: "885057001572",
        appId: "1:885057001572:web:3d7d4f3436f207cdb52771"
    }
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    
    async function makeRequest(request){
        if(userID){
            // Add a new document in collection "cities"
            firebase.firestore().collection(userID).doc(request).set({
                category : "Uncategorized"
            })
            .then(() => {
                try {
                    //Send success notification to the content script and display it to the user
                    chrome.notifications.create({
                        iconUrl: chrome.runtime.getURL('tweekr-logo-optimized.svg'),
                        type: 'basic',
                        title: "",
                        message: "Successfully tweeked",
                    }, function() {});
                } catch (err) {
                    throw err;
                }
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }else{
            //Notification to handle absence of uid in chrome extension's local storage even though user is logged in
            //i.e. session cookie is present but maybe uid got manually deleted from chrome extension's local storage
            //This part handles that!
            chrome.notifications.create({
                iconUrl: chrome.runtime.getURL('tweekr-logo-optimized.svg'),
                type: 'basic',
                title: "",
                message: "Seems like you're not logged into the web app. Please make sure you visit your web dashboard once and then try again",
            }, function() {});
        }
    };
