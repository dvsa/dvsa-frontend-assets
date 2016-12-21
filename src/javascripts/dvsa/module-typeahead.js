/*jslint browser: true, evil: false, plusplus: true */
/*global DVSA, $, console */

(function (globals) {
    'use strict';
    var init,
        searchSuggest,
        DVSA = globals.DVSA || {};

    //  GOVUK interface for twitter typeahead v.0.9.n
    //  Dependencies: jQuery, Twitter Typeahead
    //
    // - Defaults config options - ensuring consistent behaviour
    // - Loads JS source only when required (async)
    // - Allows upgrade path without impacting views

    searchSuggest = function searchSuggest(selector, dataSetID, prefetchURL,  options){

        // todo: pass 'onSelect' callback func

        this.sourceJS = '/public/javascripts/vendor/typeahead.min.js';
        this.selector = selector;
        this.dataSetID = dataSetID;
        this.prefetchURL = prefetchURL;

        var options = options || {};

        this.options = {
            "cache": options.cache || false,
            "minLength": options.minLength || 3,
            "limit": options.limit || 8
        };

        this.init();
    };

    searchSuggest.prototype.init = function(){

        if (typeof $.prototype.typeahead !== 'function' ){
            console.log('ext loading');
            this.loadJS(this.sourceJS, this.setup.bind(this));
        }else{
            console.log('already loaded');
            this.setup();
        }
    };

    searchSuggest.prototype.setup = function(){

        $(this.selector).typeahead([
            {
                name: this.dataSetID,
                prefetch: this.prefetchURL,
                cache: this.options.cache,
                minLength: this.options.minLength,
                limit: this.options.limit
            }
        ]);

    };

    searchSuggest.prototype.loadJS = function(src, cb){
        var ref = window.document.getElementsByTagName( "script" )[ 0 ];
        var script = window.document.createElement( "script" );

        script.src = src;

        script.async = true;
        ref.parentNode.insertBefore( script, ref );
        if (cb && typeof(cb) === "function") {
            script.onload = cb;
        }
        return script;
    };

    init = function () {};

    // public
    globals.DVSAModuleSearchSuggest = {
        init: init,
        searchSuggest: searchSuggest
    };
}(this));

