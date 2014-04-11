'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var sportivore_serv = angular.module('fbm.services', ['ngResource']);

sportivore_serv.value('version', '0.1');

sportivore_serv.factory('share', function()
{
    return {
        messages : {
            show : false,
            type : '',
            message : ''
        },
        loader : {
            show : false
        }
    };
});