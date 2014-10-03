How to build mobile on iOS?
    1. make sure cordova is installed by "npm install -g cordova"
    2. cd to mobile/bongard directory
    3. run "cordova platform add ios"
    4. add plugin for social sharing: "cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git"
    5. run "cordova emulate ios" to run in simulator
    6. run "cordova run ios" to run in connected devices.