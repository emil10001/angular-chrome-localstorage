/**
 * Created by ejf3 on 12/7/13.
 */
'use strict';

angular.module('angular-chrome-localstorage', [ 'ngResource' ])
    .service('LocalWrapper', function ($rootScope) {

        this.GET = 'get';
        this.SET = 'set';
        this.REMOVE = 'remove';

        this.get = function (key) {
            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.get(key, function(data){
                    console.log(this.GET,data);
                    $rootScope.$emit(this.GET, data);
                });
            } else {
                $rootScope.$emit(this.GET, localStorage[key]);
            }
        };

        this.set = function (key, val) {
            var newSomething = {};
            newSomething[key] = val;
            console.log(this.SET, newSomething);

            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.set(newSomething, function(){
                    $rootScope.$emit(this.SET);
                });
            } else {
                localStorage[key] = val;
                $rootScope.$emit(this.SET);
            }
        };

        this.remove = function (key) {
            var newSomething = {};
            newSomething[key] = "";
            console.log(this.REMOVE, newSomething);

            if (!!chrome && !!chrome.storage) {
                chrome.storage.sync.set(newSomething, function(){
                    $rootScope.$emit(this.REMOVE);
                });
            } else {
                localStorage[key] = val;
                $rootScope.$emit(this.REMOVE);
            }
        }

    });