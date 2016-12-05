'use strict';

(function () {
    var addButton = document.querySelector(".btn-add");
    var deleteButton = document.querySelector(".btn-delete");
    var results1 = document.querySelector("#results1");
    var results2 = document.querySelector("#results2");
    var results3 = document.querySelector("#results3");
    var apiUrl = "https://voting-app-nixter11.c9users.io/api/votes";
    
    function ready (fn) {
        if (typeof fn !== 'function') {
            return;
        }

        if (document.readyState === 'complete') {
            return fn();
        }

        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    function ajaxRequest (method, url, callback) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };

        xmlhttp.open(method, url, true);
        xmlhttp.send();
   }
   
   function updateVoteCount (data) {
       var votesObject = JSON.parse(data);
       results1.innerHTML = votesObject.option1;
       results2.innerHTML = votesObject.option2;
       results3.innerHtml = votesObject.option3;
   }
   
   ready(ajaxRequest('GET', apiUrl, updateVoteCount));
   
   addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateVoteCount)
      });

   }, false);
   
   deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateVoteCount);
      });

   }, false);
})();