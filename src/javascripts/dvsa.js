/*jslint browser: true, evil: false, plusplus: true */
/*global $ */

(function (globals) {
    'use strict';

    var DVSA = {

        Modules: {},

        Utilities: {},

        // Events: $({}), // Example of using JQuery for events.
        Events: false,

        init: function (events) {
            var x;

            this.Events = events || false;

            for (x in DVSA.Modules) {
                if (DVSA.Modules.hasOwnProperty(x) && typeof (DVSA.Modules[x].init) === "function") {
                    DVSA.Modules[x].init();
                }
            }
        }
    };

    globals.DVSA = DVSA;
}(this));
