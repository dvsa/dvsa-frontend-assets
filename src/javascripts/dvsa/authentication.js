/**
 * This file is part of the DVSA MOT Frontend project.
 *
 * @link http://gitlab.clb.npm/mot/mot
 */

(function( dvsaMotFrontendAuthentication, $, undefined ) {
    /**
     * @param timeOut in seconds. Defaults to 60 seconds.
     *
     */
    dvsaMotFrontendAuthentication.keepSessionAlive = function(timeOut) {

        var timeOut = typeof timeOut !== 'undefined' ? parseInt(timeOut) : 60;
        if (timeOut <= 0) {
            return;
        }

        setInterval(function() {
            $.get(window.location.href);
        }, timeOut * 1000);
    };

    /**
     * Add non-autocomplete usernameFields.
     *
     * - Override the form submit event
     * - Added dynamic elements
     * - On submit copy dynamic usernameField values to real usernameFields
     */
    dvsaMotFrontendAuthentication.addNonAutocompleteFields = function() {

        var usernameField = $('#IDToken1').eq(0);
        var passwordField = $('#IDToken2').eq(0);
        var form          = $('#Login').eq(0);
        var uniqueId      = new Date().getTime();

        var fakeUsernameField = usernameField.clone().prop({
            id: uniqueId + '_tid1',
            name: uniqueId + '_tid1',
            tabindex: 1
        }).insertAfter(usernameField);

        var fakePasswordField = passwordField.clone().prop({
            id: uniqueId + '_tid2',
            name: uniqueId + '_tid2',
            tabindex: 2
        }).insertAfter(passwordField);

        $.each([usernameField, passwordField], function(k, field) {
            setTimeout(function() {
                field.val('');
            }, 250);
            field.css({
                'width': '1px',
                'position': 'absolute',
                'left': '-9999px'
            });
            field.prop('tabindex', -1);
        });

        form.prop('id', uniqueId + '_tid_form');
        form.prop('autocomplete', 'off');

        fakeUsernameField.focus();

        form.submit(function( event ) {
            usernameField.val(fakeUsernameField.val());
            passwordField.val(fakePasswordField.val());

            return true;
        });
    };

}( window.dvsaMotFrontendAuthentication = window.dvsaMotFrontendAuthentication || {}, jQuery ));

$( document ).ready(function() {
    dvsaMotFrontendAuthentication.addNonAutocompleteFields();
});
