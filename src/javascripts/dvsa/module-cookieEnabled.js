/*jslint browser: true, evil: false, plusplus: true */
/*global DVSA, $, console */

/*

DVSA cookie feature test module

*/

(function(globals) {
    'use strict';
    var init,
        CookiesEnabled,
        DVSA = globals.DVSA || {};

    CookiesEnabled = function CookiesEnabled() {

        var cookieName = "cookeTest";
        try {
            // Create cookie
            document.cookie = cookieName + '=1';
            var ret = document.cookie.indexOf(cookieName + '=') != -1;
            // Delete cookie
            document.cookie = cookieName + '=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
            return ret;
        } catch (e) {
            return false;
        }

    };

    // public
    globals.DVSACookiesEnabled = {
        CookiesEnabled: CookiesEnabled 
    };
}(this));
