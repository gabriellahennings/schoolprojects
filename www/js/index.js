/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    
    /* hide remove photo button as default */
    var removeBtn = document.getElementById('removeSelfie');
    removeBtn.style.display = 'none';

    console.log(navigator.camera);

    /* click event for taking photo when pressing btn */
    document.getElementById('selfie').onclick = function() {
        
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL

        });

        /* save photo and show for user */
        function onSuccess(imageData) {

            /* set and display image */
            var image = document.getElementById('recentPhoto');
            image.src = "data:image/jpeg;base64," + imageData;

            image.innerHTML = "<img src='" + image.src + "' /> ";

            /* hide textblock */
            var textblock = document.getElementById('noPhotoText');
            textblock.style.display = 'none';

            /* show text message if user adds a selfie */
            var textAfterSelfie = document.getElementById('greetingText');
            textAfterSelfie.innerHTML = "You're looking good today!";

            /* hide intro */
            var intro = document.getElementById('intro');
            intro.style.display = "none";

            /* show remove selfie btn */     
            removeBtn.style.display = 'inline';

            /* change text on selfie button */
            var selfieBtn = document.getElementById('selfie');
            selfieBtn.innerHTML = "ReCapture";

        }

        /* error if camera is aborted */
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
}

function removeSelfie() {
    /* remove image */
    var image = document.getElementById('recentPhoto');
    image.style.display = "none";

    /* show textblock */
    var textblock = document.getElementById('noPhotoText');
    textblock.style.display = 'block';

    /* hide remove selfie btn */   
    var removeBtn = document.getElementById('removeSelfie');  
    removeBtn.style.display = 'none';

    /* hide text message if user adds a selfie */
    var textAfterSelfie = document.getElementById('greetingText');
    textAfterSelfie.innerHTML = " ";

    /* change the value of the button */
    var selfieBtn = document.getElementById('selfie');
    selfieBtn.innerHTML = "Capture";

    /* show intro again */
    var intro = document.getElementById('intro');
    intro.style.display = "block";

}
