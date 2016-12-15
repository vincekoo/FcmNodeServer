var express = require('express');
var router = express.Router();
var fcm = require('fcm-node');

var SERVER_API_KEY = 'AAAAqxureYY:APA91bHsFMZx6rLeXbdDG8Wo1CR3MZUptJ_0hDFNucXi5pf0U6DSPI3LBJdXcdvu2iXEzje57caGCZMCkULMlm6diqczRVtvurC8fNoEYPW8m4AkC_lrxGSNwUCUzDVKG16yXwq7DqYR0xkqqYnPP0kju-8mY00QdQ';//put your api key here
var validDeviceRegistrationToken = '/topics/all';

var fcmCli = new fcm(SERVER_API_KEY);
var counter = 0;

var payloadOK = {
    to: validDeviceRegistrationToken,
    priority: 'high',
    content_available: true,
    notification: { //notification object
        title: 'HELLO', body: 'World!', sound: "default", badge: "1"
    }
};

var callbackLog = function (sender, err, res) {
    console.log("\n__________________________________")
    console.log("\t" + sender);
    console.log("----------------------------------")
    console.log("err=" + err);
    console.log("res=" + res);
    console.log("----------------------------------\n>>>");
};

function pushNotification() {
    try {
        fcmCli.send(payloadOK, function (err, res) {
            callbackLog('sendOK', err, res);
        });
    } catch (err) {
        console.log(err);
    }
}

router.get('/', function(req, res) {
    res.sendStatus(200)
    pushNotification();
});

module.exports = router;