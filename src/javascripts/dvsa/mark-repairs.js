/*
    mark repairs in basket
*/
(function (globals) {
    'use strict';

    var init,
        markRepairs,
        MarkRepairs,
        DVSA = globals.DVSA || {};

    MarkRepairs = function MarkRepairs() {};

    MarkRepairs.prototype.init = function(){

        function updateBrakeTest (brakeTestOutcome, brakesTested, brakeResults, disableSubmitButton) {
            if (!!$('.js-brakeTestActionPanel').length ) {
                var $brakeTestStatus = $('.js-brakeTestStatus'),
                    $addBrakeTest = $('.js-addBrakeTest'),
                    $brakeTestActions = $('.js-brakeTestActions'),
                    $reviewTestButton = $('.js-reviewTestButton');

                $brakeTestStatus.text(brakeTestOutcome);

                if (!!$brakeTestActions.length) {
                    if (true === brakesTested && true === brakeResults) {
                        $brakeTestActions.removeClass('u-hidden');
                    } else {
                        $brakeTestActions.addClass('u-hidden');
                    }
                }

                if (!!$brakeTestActions.length) {
                    if(false === brakesTested || true === brakeResults) {
                        $addBrakeTest.addClass('u-hidden');
                    } else {
                        $addBrakeTest.removeClass('u-hidden');
                    }
                }

                if (!!$reviewTestButton.length) {
                    if (true === disableSubmitButton) {
                        $reviewTestButton.attr('disabled', true);
                    } else {
                        $reviewTestButton.attr('disabled', false);
                    }
                }

            }
        }

        function updateCount (type, action) {
            var numberOfFailures = $('.js-numberOfFailures'),
                valNumberOfFailures = parseInt(numberOfFailures.first().text()),
                numberOfAdvisories = $('.js-numberOfAdvisories'),
                valNumberOfAdvisories = parseInt(numberOfAdvisories.first().text());

            if (action == 'repair') {
                if (type == 'advisory' && !!numberOfAdvisories.length) {
                    numberOfAdvisories.text(valNumberOfAdvisories - 1);
                }else if (type == 'failure' && !!numberOfFailures.length){
                    numberOfFailures.text(valNumberOfFailures - 1);
                }
            }else{
                if (type == 'advisory' && !!numberOfAdvisories.length) {
                    numberOfAdvisories.text(valNumberOfAdvisories + 1);
                }else if (type == 'failure' && !!numberOfFailures.length){
                    numberOfFailures.text(valNumberOfFailures + 1);
                }
            }
        }

        $(document).on('click', '.js-buttonMarkRepaired', function(e){
            e.preventDefault();

            var self = $(this),
                rfrForm = self.parents('.js-rfrForm'),
                url = rfrForm.attr('action') || self.data('url'),
                formData = rfrForm.serialize() || self.data('form'),
                rfrItem = self.parents('.js-rfrItem'),
                itemStatus = rfrItem.find('.js-itemStatus'),
                isLoading;

            self.attr('disabled', true);

            $.ajax({
                type:"POST",
                url: url,
                data: formData,
                beforeSend: function () {
                    isLoading = setTimeout(function(){
                        rfrItem.addClass('has-status');
                        itemStatus.html('Loading');
                    }, 2000);
                },
                success: function (data) {
                    clearTimeout(isLoading);

                    if (data.success) {

                        rfrItem.removeClass('has-status');

                        if (data.action == 'repair') {

                            rfrItem.addClass('has-success');
                            updateCount(data.defectType, data.action);

                        } else {
                            rfrItem.removeClass('has-success');
                            updateCount(data.defectType, data.action);
                        }

                        updateBrakeTest(data.brakeTestOutcome, data.brakesTested, data.brakeTestResults, data.disableSubmitButton);

                    } else {
                        rfrItem.addClass('has-status');
                        itemStatus.html('That didn\'t work, <a class="js-buttonMarkRepaired" href="" data-url="'+url+'" data-form="'+formData+'">try again</a>');
                    }
                },
                error: function() {
                    clearTimeout(isLoading);
                    rfrItem.addClass('has-status');
                    itemStatus.html('That didn\'t work, <a class="js-buttonMarkRepaired" href="" data-url="'+url+'" data-form="'+formData+'">try again</a>');
                },
                complete: function() {
                    self.attr('disabled', false);
                }
            });

        });
    };

    globals.DVSAMarkRepairs = {
        markRepairs: MarkRepairs
    };

}(this));
