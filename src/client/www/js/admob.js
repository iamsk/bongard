 function onDomLoad() {
        if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', onDeviceReady, false);
        } else {
            onDeviceReady();
        }
    }
 function onDeviceReady() {
    initAd();

    // display a banner at startup
    window.plugins.AdMob.createBannerView();

    // prepare the interstitial
    window.plugins.AdMob.createInterstitialView();

    // somewhere else, show the interstital, not needed if set autoShow = true
    window.plugins.AdMob.showInterstitialAd();
}
function initAd(){
    if ( window.plugins && window.plugins.AdMob ) {
        var ad_units = {
            ios : {
                banner: 'ca-app-pub-8444566453872913/5347663750',
                interstitial: 'ca-app-pub-8444566453872913/6824396950'
            },
            android : {
                banner: 'ca-app-pub-8444566453872913/6545195354',
                interstitial: 'ca-app-pub-8444566453872913/8021928550'
            }
        };
        var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;

        window.plugins.AdMob.setOptions( {
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            bannerAtTop: true, // set to true, to put banner at top
            overlap: false, // set to true, to allow banner overlap webview
            offsetTopBar: true, // set to true to avoid ios7 status bar overlap
            isTesting: false, // receiving test ad
            autoShow: true // auto show interstitial ad when loaded
        });

        registerAdEvents();

    } else {
        alert( 'admob plugin not ready' );
    }
}
// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener('onReceiveAd', function(){});
    document.addEventListener('onFailedToReceiveAd', function(data){});
    document.addEventListener('onPresentAd', function(){});
    document.addEventListener('onDismissAd', function(){ });
    document.addEventListener('onLeaveToAd', function(){ });
    document.addEventListener('onReceiveInterstitialAd', function(){ });
    document.addEventListener('onPresentInterstitialAd', function(){ });
    document.addEventListener('onDismissInterstitialAd', function(){ });
}