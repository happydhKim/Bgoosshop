

//사용하지 않는 부분

// For the best user experience, make sure the user is ready to give your app 
// camera access before you show the prompt. On iOS, you only get one chance. 
 
QRScanner.prepare(onDone); // show the prompt 
 
function onDone(err, status){
  if (err) {
   // here we can handle errors and clean up any loose ends. 
   console.error(err);
  }
  if (status.authorized) {
    // W00t, you have camera a옴cess and the scanner is initialized. 
  } else if (status.denied) {
   // The video preview will remain black, and scanning is disabled. We can 
   // try to ask the user to change their mind, but we'll have to send them 
   // to their device settings with `QRScanner.openSettings()`. 
  } else {
    // we didn't get permission, but we didn't get denied. (On Android, a denial 
    // isn't permanent unless the user checks the "Don't ask again" box.) 
    // We can ask again at the next relevant opportunity. 
  }
}


//보여줄 준비가 되었을때!


// Make the webview transparent so the video preview is visible behind it. 
// (Not required for scanning to work on iOS.) 
QRScanner.show();
// Be sure to make any opaque HTML elements transparent here to avoid 
// covering the video. 
 
// Start a scan. Scanning will continue until something is detected or 
// `QRScanner.cancelScan()` is called. 
QRScanner.scan(displayContents);
 
function displayContents(err, text){
  if(err){
    // an error occurred, or the scan was canceled (error code `6`) 
  } else {
    // The scan completed, display the contents of the QR code: 
    alert(text);
  }
}