//find the word the user is looking for
var headerWord = document.querySelector('#articleHead .headerWord');
//get the selected accent
var accentSelection = document.querySelector('#accentSelection');
var selectedOption = accentSelection.options[accentSelection.selectedIndex];
//get the selected audio source
var audioSrc = document.querySelector(`#listen_widget audio#aud${selectedOption.value} source`);
//create the object to return
var objectResult = {
   accent: selectedOption.text,
   word: headerWord.innerText,
   audio: 
   {
      src: audioSrc.src,
      type: audioSrc.type
   }
};
// return a value to be used by the background script
// as specified in: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript#Return_value
objectResult;
