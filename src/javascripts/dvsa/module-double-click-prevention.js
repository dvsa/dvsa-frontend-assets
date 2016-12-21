/*
    multiple form submit prevention
    example:
    <form name="form-name" class="prevent-double-click-form" data-submit-button-id="confirm_test_result">
        <input type="submit" class="button" value="Some value" id="confirm_test_result">
    </formn>
    <script type="text/javascript">
        DoubleClickPrevention.start();
    </script>

    name="form-name" // you have to add some name to your form
    class="prevent-double-click-form" // add this class to enable multiple form submit prevention
    data-submit-button-id="confirm_test_result" // id of a submit button element that will be disabled after form submit
*/
(function (globals) {
    'use strict';
    var start,
        doubleClickPrevention,
        DoubleClickPrevention,
        DVSA = globals.DVSA || {};

    DoubleClickPrevention = function DoubleClickPrevention() {};

    DoubleClickPrevention.prototype.start = function(){
        var validatedForms = {};

        $('.prevent-double-click-form').submit(function (e) {
            if(!validatedForms.hasOwnProperty(this.name)){
                validatedForms[this.name] = true;
                var submitId = $(this).data('submit-button-id');
                var submitButton = $('#' + submitId);
                submitButton.attr('disabled', 'disabled');

                return true;
            } else {
                e.preventDefault();
                return false;
            }
        });
    };

    doubleClickPrevention = new DoubleClickPrevention();

    start = function () {
        doubleClickPrevention.start();
    };

    globals.DoubleClickPrevention = {
        start: start
    };
}(this));
