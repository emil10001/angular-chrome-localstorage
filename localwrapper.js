/**
 * Created by ejf3 on 12/7/13.
 */
'use strict';

angular.module('angular-chrome-localstorage', [ 'ngResource' ])
    .service('LocalWrapper', function ($rootScope) {

        this.get = function (key, EMIT_STR) {
            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.get(key, function(data){
                    console.log(EMIT_STR,data);
                    $rootScope.$emit(EMIT_STR, data);
                });
            } else {
                $rootScope.$emit(EMIT_STR, localStorage[key]);
            }
        };

        this.set = function (key, val, EMIT_STR) {
            var newSomething = {};
            newSomething[key] = val;
            console.log(EMIT_STR, newSomething);

            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.set(newSomething, function(){
                    $rootScope.$emit(EMIT_STR);
                });
            } else {
                localStorage[key] = val;
                $rootScope.$emit(EMIT_STR);
            }
        };

        this.remove = function (key, EMIT_STR) {
            var newSomething = {};
            newSomething[key] = "";
            console.log(EMIT_STR, newSomething);

            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.set(newSomething, function(){
                    $rootScope.$emit(EMIT_STR);
                });
            } else {
                localStorage[key] = val;
                $rootScope.$emit(EMIT_STR);
            }
        }

    });