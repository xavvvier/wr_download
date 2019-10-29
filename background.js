
function onStartedDownload(id) {
  console.log(`Download started: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

function findAndDownload(tab) {

   function scriptResult(data){
      var result = data[0];
      var fileExtension = result.audio.src.substr(result.audio.src.lastIndexOf("."));
      var filename= result.word + ` (${result.accent})` + fileExtension;
      browser.downloads.download({
         // conflictAction: 'prompt',
         filename: filename,
         url: result.audio.src
      }).then(onStartedDownload, onFailed);
   }

   browser.tabs.executeScript({
      file: '/getSelectedItem.js'
   }).then(scriptResult);

}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    browser.pageAction.show(tab.id);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Find the element containing the audio url and download the file
*/
browser.pageAction.onClicked.addListener(findAndDownload);


