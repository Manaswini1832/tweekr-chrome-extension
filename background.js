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
        apiKey: "AIzaSyBEDA2cJZJvCS6rRhnHqgitFCZj2MiDGao",
        authDomain: "server-auth-51141.firebaseapp.com",
        projectId: "server-auth-51141",
        storageBucket: "server-auth-51141.appspot.com",
        messagingSenderId: "20867979546",
        appId: "1:20867979546:web:17149a40548c5b0a39f4a3"
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
