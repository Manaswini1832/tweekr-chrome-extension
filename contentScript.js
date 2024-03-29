chrome.runtime.sendMessage({ message : "From_content_script_want_auth_status"}, (res) => {
  if(res.message === "Message successfully received" && res.payload ){
      //Add icon to each tweet
      window.addEventListener("scroll", async() => {
        await appendIcon();
      });
  }else{
    console.log("Should authenticate");
  }
});

//FUNCTIONS TO APPEND ICON AND ADD AN EVENT LISTENER TO EACH ICON

async function appendIcon() {
    let divs = await document.querySelectorAll("div"); // Load Div Elements
    let divsDebug = [];
    let appendDiv;
    let containsImage = false;


    for (let div of divs) {
      let dataTestId = div.getAttribute("data-testid");
      if (dataTestId == "tweet") {
        divsDebug.push(div);
    }
  }
    for(let divDebug of divsDebug) {
      if (divDebug){
      //This is the div to which the icon is to be appended
      let reqdDiv;
      if(divDebug.childNodes[1].childNodes[1]){
        if(divDebug.childNodes[1].childNodes[1].childNodes[2].getAttribute("role") === "group"){
          reqdDiv = divDebug.childNodes[1].childNodes[1].childNodes[2];
        }else{
          reqdDiv = divDebug.childNodes[1].childNodes[1].childNodes[3];
        }
      }

      appendDiv = document.createElement('div');
      // appendDiv.setAttribute("class", divDebug.childNodes[1].childNodes[1].childNodes[2].classList.value);
      appendDiv.innerHTML += '<button focusable="true" tabindex="0" aria-label="add tweet to tweekr" style="background-color:transparent;border:0;position:relative;top:5px;cursor:pointer;"><svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0721 8.07127L15.8687 2.99715L23.0408 7.76504L17.0721 8.07127Z" fill="url(#paint0_linear)"></path><path opacity=".99" d="M6.46739 7.83829L8.48589 12.0482L1.43826 9.17889L6.46739 7.83829Z" fill="url(#paint1_linear)"></path><path d="M12.5802 10.0882L10.0628 15.3985L6.47659 7.85353L12.5802 10.0882Z" fill="url(#paint2_linear)"></path><path d="M18.6933 14.4317L7.4478 20.9062L15.8848 2.98964L18.6933 14.4317Z" fill="#108AC7"></path><defs><linearGradient id="paint0_linear" x1="19.2" y1="6.546" x2="10.904" y2="1.981" gradientUnits="userSpaceOnUse"><stop stop-color="#63BAEF"></stop><stop offset="1" stop-color="#539DCA"></stop><stop offset="1" stop-color="#4B91BC"></stop></linearGradient><linearGradient id="paint1_linear" x1="11.644" y1="9.323" x2="2.988" y2="9.333" gradientUnits="userSpaceOnUse"><stop stop-color="#58A4D2"></stop><stop offset=".782" stop-color="#0E93D6"></stop></linearGradient><linearGradient id="paint2_linear" x1="14.669" y1="12.714" x2="6.883" y2="11.737" gradientUnits="userSpaceOnUse"><stop stop-color="#43A1DA"></stop><stop offset=".68" stop-color="#6EC5FA"></stop></linearGradient></defs></svg></button>';

      //Get tweet id
      let aTags = divDebug.getElementsByTagName("a");
      for (let aTag of aTags) {
        let href = aTag.getAttribute("href");
        if (href.includes("/status/")) {
          let tweetId = href.split("/status/");
          tweetId = tweetId[1];
          ///HATE BEGINS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          const hate = /photo/;
          const doubleHate = tweetId.match(hate);
          if(doubleHate){
            containsImage = true;
          }else{
            containsImage = false;
          }
          ///HATE ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          const tweetIDRegex = /\d+/;
          const enteredId = tweetId.match(tweetIDRegex)[0];
          appendDiv.setAttribute("data-testid", enteredId);  

          const childNodesLen = reqdDiv.childNodes.length;
          if(childNodesLen === 4){
            if(!reqdDiv.childNodes[4]){
                  reqdDiv.insertBefore(appendDiv, reqdDiv.childNodes[2]);
              }
          }
          appendDivListener(appendDiv, enteredId, containsImage);
        }
      } 
    }
  }
}

function appendDivListener(appendDiv, idToBeSent, containsImage){
      if(!containsImage){
          //if containsImage is false do this
          //Assign click handler to appendDiv
          appendDiv.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let sending = chrome.runtime.sendMessage({ message: "Sending ID", idToBeSent});
            appendDiv.getElementsByTagName("button")[0].setAttribute("disabled", true);
            appendDiv.getElementsByTagName("button")[0].getElementsByTagName("svg")[0].style.pointerEvents = "none";
      });
      }else{
            //If containsImage is true do this
            appendDiv.removeEventListener("click", (e) => {
            containsImage = false;
            });
      }
}

{/* <div class="css-1dbjc4n r-18u37iz r-1h0z5md">
    <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.0721 8.07127L15.8687 2.99715L23.0408 7.76504L17.0721 8.07127Z" fill="url(#paint0_linear)"></path>
      <path opacity=".99" d="M6.46739 7.83829L8.48589 12.0482L1.43826 9.17889L6.46739 7.83829Z" fill="url(#paint1_linear)"></path>
      <path d="M12.5802 10.0882L10.0628 15.3985L6.47659 7.85353L12.5802 10.0882Z" fill="url(#paint2_linear)"></path>
      <path d="M18.6933 14.4317L7.4478 20.9062L15.8848 2.98964L18.6933 14.4317Z" fill="#108AC7"></path>
      <defs>
        <linearGradient id="paint0_linear" x1="19.2" y1="6.546" x2="10.904" y2="1.981" gradientUnits="userSpaceOnUse">
          <stop stop-color="#63BAEF"></stop>
          <stop offset="1" stop-color="#539DCA"></stop>
          <stop offset="1" stop-color="#4B91BC"></stop>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="11.644" y1="9.323" x2="2.988" y2="9.333" gradientUnits="userSpaceOnUse">
          <stop stop-color="#58A4D2"></stop>
          <stop offset=".782" stop-color="#0E93D6"></stop>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="14.669" y1="12.714" x2="6.883" y2="11.737" gradientUnits="userSpaceOnUse">
          <stop stop-color="#43A1DA"></stop>
          <stop offset=".68" stop-color="#6EC5FA"></stop>
        </linearGradient>
      </defs>
    </svg>
</div> */}