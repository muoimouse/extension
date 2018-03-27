"use strict";

// var RELAX_URL = "http://localhost/api/vocabulary";

chrome.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

// request permission on page load
// document.addEventListener('DOMContentLoaded', function () {
//   if (Notification.permission !== "granted")
//     Notification.requestPermission();
// });

function getVocabulary(callback) {
  var url = "https://shrouded-tor-99018.herokuapp.com/api/vocabulary/random";
  var method = "GET";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}

function notifications(id, title, message) {
  if (Notification.permission !== "granted") Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      body: message
    });
  }
}

setInterval(function() {
  getVocabulary(function(data) {
    if (data) {
      notifications("1", data[0].title, data[0].meaning);
    } else {
      notifications("1", "title default", "message default");
    }
  });
}, 10000);
