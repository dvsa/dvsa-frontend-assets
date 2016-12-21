/*
    simpler show/hide toggle to deal with multiple toggled items labelled with a class
    example:

    <div class="js-toggle-this-stuff js-hidden">
        Some stuff...
    </div>

    If JS is on, this is how the anchor part appears in the DOM:

    <a href="#" data-action="showHideToggle" data-open-text="Hide stuff" data-toggle-class="js-toggle-this-stuff" class="toggle-switch layer-table__link js-only" data-closed-text="Show stuff">Show stuff</a>

    Note: the data-closed-text attr is added automatically from the existing text
*/

(function (globals) {
    'use strict';
    var init,
        showerHiderClasses,
        ShowHideToggleClasses,
        DVSA = globals.DVSA || {};

    // Create empty function upon which to hang the prototypes below
    ShowHideToggleClasses = function ShowHideToggleClasses() {};

    function isHidden(targetClassName) {
        var firstElementToCheck = $('.' + targetClassName).first();
        return (!$(firstElementToCheck).is(':visible'));
    }

    ShowHideToggleClasses.prototype.init = function(){

        var self = this;
        this.triggerElements = document.querySelectorAll('[data-action="showHideToggle"]');

        for (var i=0; i < this.triggerElements.length; i++){
            (function () {
                var returnableID = 'inpageLink_' + new Date().getTime();

                var triggerElement = self.triggerElements[i],
                    triggerElementStartText = triggerElement.text,
                    triggerElementOpenText = triggerElement.getAttribute('data-open-text'),
                    targetClassName = triggerElement.getAttribute('data-toggle-class'),
                    toggleType = triggerElement.getAttribute('data-toggle-type'),
                    footerTriggerElement = self.triggerElements[1];

                triggerElement.setAttribute('data-closed-text', triggerElementStartText);

                // add class to target element in case it doesn't have one
                if(toggleType != 'responsive') {
                    $('.' + targetClassName).addClass(' js-hidden');
                }

                if (window.addEventListener) {
                    triggerElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        self.checkState(targetClassName, triggerElementStartText, triggerElementOpenText, toggleType, footerTriggerElement, returnableID);
                    });

                    if(footerTriggerElement) {
                        $(triggerElement).parents('.defect-summary').attr('id', returnableID);
                    }
                }
            }());
        }
    };

    ShowHideToggleClasses.prototype.checkState = function(targetClassName, triggerElementStartText, triggerElementOpenText, toggleType, footerTriggerElement, returnableID){

        if(isHidden(targetClassName)) {

            this.showToggle(targetClassName, triggerElementOpenText, toggleType);

        } else {

            this.hideToggle(targetClassName, triggerElementStartText, toggleType, footerTriggerElement, returnableID);
        }
    };

    ShowHideToggleClasses.prototype.showToggle = function(targetClassName, triggerElementOpenText, toggleType) {

        if(toggleType == 'responsive') {

            $('.' + targetClassName).removeClass('hide-small');

        } else {

            $('.' + targetClassName).removeClass('js-hidden');
        }

        $('[data-toggle-class="' + targetClassName + '"]').each(function(){
            $(this).text(triggerElementOpenText);
            $(this).removeClass('toggle-switch').addClass('toggle-switch--open');
        });
    };

    ShowHideToggleClasses.prototype.hideToggle = function(targetClassName, triggerElementStartText, toggleType, footerTriggerElement, returnableID) {

        if(toggleType == 'responsive') {

            $('.' + targetClassName).addClass('hide-small');

        } else {

            $('.' + targetClassName).addClass('js-hidden');
        }


        if(footerTriggerElement) {
            // TODO: needs refactoring
            // $('#' + returnableID)[0].scrollIntoView(true);
        }

        $('[data-toggle-class="' + targetClassName + '"]').each(function(){
            $(this).text(triggerElementStartText);
            $(this).removeClass('toggle-switch--open').addClass('toggle-switch');
        });
    };

    // use below to init on all pages
    // showerHider = new ShowHideToggle();
    // this has been left in, in case requirements change
    init = function () {
        // showerHider.init();
    };

    globals.DVSAShowHideToggleClasses = {
        init: init,
        showerHiderClasses: ShowHideToggleClasses
    };

}(this));
