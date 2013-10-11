/**
 * Created by i.sungurov on 02.10.13.
 */

operatorShell.service('authentication', function ($rootScope, wamp, notifier, LOGIN_URL, LOGOUT_URL) {

    'use strict';

    var
        _isLoggedIn = false,

        login = function (login, pswd) {

            var result = wamp.call(LOGIN_URL, [login, pswd]);

            result.then(function (data) {
                _isLoggedIn = true;
            }, function (error) {
                _isLoggedIn = false;
            });

            return result;
        },

        logout = function () {
            _isLoggedIn = false;
            return wamp.call(LOGOUT_URL);
        },

        isLoggedIn = function () {
            return _isLoggedIn;
        },
        setLogged = function () {
            _isLoggedIn = true;
        };

    return {
        login: login,
        logout: logout,
        setLogged: setLogged,
        isLoggedIn: isLoggedIn
    };
});