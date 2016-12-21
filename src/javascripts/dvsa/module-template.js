/*jslint browser: true, evil: false, plusplus: true */
/*global DVSA, $, console */

(function (globals) {
    'use strict';
    var init,
        loadingMessage,
        DVSA = globals.DVSA || {};

    init = function () {
        loadingMessage();
    };

    loadingMessage = function () {
        globals.console.log('DVSA module template loaded.');
    };

    // public
    globals.DVSAModuleTemplate = {
        init: init
    };
}(this));
