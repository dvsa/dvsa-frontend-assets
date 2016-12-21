/*jslint browser: true, evil: false, plusplus: true */
/*global DVSA, $, DVSASelectToggle */

(function (globals) {
    'use strict';
    // Add modules
    globals.DVSA.Modules.DVSASelectToggle = DVSASelectToggle;
    globals.DVSA.Modules.DVSACriteria = DVSACriteria;
    globals.DVSA.Modules.DVSACookiesEnabled = DVSACookiesEnabled;
    globals.DVSA.Modules.DVSAShowHideToggle = DVSAShowHideToggle;
    globals.DVSA.Modules.DVSAShowHideToggleClasses = DVSAShowHideToggleClasses;
    globals.DVSA.Modules.DVSAMarkRepairs = DVSAMarkRepairs;
    globals.DVSA.Modules.DoubleClickPrevention = DoubleClickPrevention;

    // Initialise
    globals.DVSA.init($({}));
}(this));
