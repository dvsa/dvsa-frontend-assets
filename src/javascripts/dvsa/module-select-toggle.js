/*jslint browser: true, evil: false, plusplus: true */
/*global DVSA, $, console */

/*
    TODO:

        1. Mustard test
        2. Refactor closure
        3. Investigate/implement .bind
        4. Keep element state in scope to reduce repaint (nice to have)
        5. Test the target element exists: document.querySelector('#' + targetId); 
        6. Write unit tests
        7. Construct 'targetVals' array once (not on every change)
        8. Refactor clearData to The Observer Pattern (https://carldanley.com/js-observer-pattern/)
*/

(function (globals) {
    'use strict';
    var init,
        selectToggle,
        SelectToggle,
        DVSA = globals.DVSA || {};

    SelectToggle = function SelectToggle() {};

    SelectToggle.prototype.init = function(){
        var self = this;
        
        this.triggerElements = document.querySelectorAll("select[data-target]");

        for (var i=0; i < this.triggerElements.length; i++){
            (function () {
                var triggerEl = self.triggerElements[i];
                var targetId = triggerEl.getAttribute('data-target');
                var targetEl = document.querySelector('#' + targetId);  // Needs test
                var targetVal = triggerEl.getAttribute('data-target-value');

                // ARIA attributes
                triggerEl.setAttribute('aria-controls', targetId);

                if (window.addEventListener) {
                    triggerEl.addEventListener("keyup", function() {
                        self.checkState(triggerEl, targetEl, targetVal);
                    });
                    triggerEl.addEventListener("change", function() {
                        self.checkState(triggerEl, targetEl, targetVal);
                    });
                }

                self.checkState(triggerEl, targetEl, targetVal);
            }());
        }
    };

    SelectToggle.prototype.checkState = function(triggerEl, targetEl, targetVal){
        
        var triggerMet = false;
        var targetVals = this.getTargetValues(targetVal);
        
        for (var i=0; i < targetVals.length; i++){
            if (triggerEl.value === targetVals[i]) {
                triggerMet = true;
            }
        }

        if (triggerMet === true) {
            this.showContent(triggerEl, targetEl);
        }else{
            this.hideContent(triggerEl, targetEl);
            this.clearData(targetEl);
        }
    };

    SelectToggle.prototype.getTargetValues = function(targetVal){
        return targetVal.split(',');
    };

    SelectToggle.prototype.clearData = function(target){
        var i;
        var inputList = target.querySelectorAll(
                'textarea:not([value=""]), ' +
                'input[type="text"], ' +
                'input[type="email"], ' +
                'input[type="password"], ' +
                'input[type="tel"]'
            );

        for (i = 0; i < inputList.length; ++i) {
            var leaveContentSwitch = $(inputList[i]).data('retain-value');
            if(leaveContentSwitch !== true) {
                inputList[i].value = '';
            }
        }
    };

    SelectToggle.prototype.hideContent = function(trigger, target){
        target.style.display = 'none';
        // ARIA attributes
        target.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    };

    SelectToggle.prototype.showContent = function(trigger, target){
        target.style.display = 'block';
        // ARIA attributes
        target.setAttribute('aria-hidden', 'false');
        trigger.setAttribute('aria-expanded', 'true');
    };

    selectToggle = new SelectToggle();

    init = function () {
        selectToggle.init();
    };

    globals.DVSASelectToggle = {
        init: init,
        selectToggle: selectToggle
    };
}(this));
