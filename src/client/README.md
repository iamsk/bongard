How to build mobile on iOS?
    1. make sure cordova is installed by "npm install -g cordova"
    2. cd to mobile/bongard directory
    3. run "cordova platform add ios"
    4. add plugin for social sharing: "cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git"
    5. add pluing for admob: "cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git"
    6. run "grunt build" to build all the required assets
    7. run "rm -rf www" to remove the "www" folder
    8. run "ln -sf ../../build www" to create a symbol link to the build assets
    9. run "cordova prepare" for preparing
    10. run "cordova emulate ios" to run in simulator
    11. run "cordova run ios" to run in connected devices.