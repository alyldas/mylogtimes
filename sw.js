"use strict";

console.log("Service Worker really installed.");

self.addEventListener("fetch", function (event) {
  console.log("Service Worker really really installed.");

  var connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  var type = connection.type;

  function updateConnectionStatus() {
    console.log(
      "Connection type changed from " + type + " to " + connection.type
    );
    type = connection.effectiveType;
  }

  connection.addEventListener("change", updateConnectionStatus);
});
