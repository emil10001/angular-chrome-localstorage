/**
 * Created by ejf3 on 12/7/13.
 */
'use strict';

angular.module('angular-chrome-localstorage', [ 'ngResource' ])
    .service('LocalWrapper', function ($rootScope) {
        var chromeStore = null;
        (function(){
            // init the chromeStore if it's available
            if (!!chrome && !!chrome.storage) {
                chromeStore = chrome.storage.local;
            }
        })();

        this.setSync = function(sync){
            // if we want to use the chrome.storage.sync APIs, we can set that here
            if (sync)
                chromeStore = chrome.storage.sync;
            else
                chromeStore = chrome.storage.local;
        }

        this.get = function (key, EMIT_STR) {
            // we need a way to inform listeners, so don't allow the EMIT_STR to be empty
            if (!EMIT_STR || EMIT_STR === '')
                return;

            if (!!chromeStore) {
                chromeStore.get(key, function(data){
                     // chrome.storage returns an Object containing { key : value }
                    // need to make sure to pull that out when returning
                    $rootScope.$emit(EMIT_STR, data[key]);
                });
            } else {
                // $rootScope.$emit is AngularJS's event emitter
                $rootScope.$emit(EMIT_STR, localStorage[key]);
            }
        };

        this.set = function (key, val, EMIT_STR) {
            var newSomething = {};
            newSomething[key] = val;

            if (!!chromeStore) {
                // chrome.storage requires an object be passed in to the set function
                chromeStore.set(newSomething, function(){
                    if (!!EMIT_STR)
                        $rootScope.$emit(EMIT_STR);
                });
            } else {
                localStorage[key] = val;
                if (!!EMIT_STR)
                    $rootScope.$emit(EMIT_STR);
            }
        };

        this.remove = function (key, EMIT_STR) {
            var newSomething = {};
            newSomething[key] = "";

            if (!!chromeStore) {
                chromeStore.set(newSomething, function(){
                    if (!!EMIT_STR)
                        $rootScope.$emit(EMIT_STR);
                });
            } else {
                localStorage[key] = val;
                if (!!EMIT_STR)
                    $rootScope.$emit(EMIT_STR);
            }
        }

    });
