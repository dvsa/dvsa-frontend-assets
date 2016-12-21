/*jslint browser: true, evil: false, plusplus: true */
/*global chai, DVSA, DVSAModuleTemplate, sinon, assert, describe, it */

var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

describe('DVSA Main Module', function () {
    'use strict';
    describe('#init()', function () {
        it('should call init function of a module', function () {

            DVSA.Modules.ModuleTemplate = DVSAModuleTemplate;

            var init = sinon.spy();
            DVSAModuleTemplate.init = init;

            DVSA.init();

            assert(init.called);
        });
    });
});
