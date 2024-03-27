console.log("background is running!!!");

let toggle = false;



chrome.action.onClicked.addListener((tab) => {
    // chrome.scripting.executeScript({
    //     target: {tabId: tab.id},
    //     func: ()=>{
    //         console.log(document.getSelection().toString())
    //     },
    // });

    let obj = {
        mess: "START"
    };
    if(toggle){
        obj.mess = "STOP";
    }
    toggle = !toggle;
    chrome.tabs.sendMessage(tab.id, obj);
});