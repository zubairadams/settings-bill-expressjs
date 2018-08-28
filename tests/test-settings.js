'use strict';

let assert = require('assert');
let settings = require('../settings-bill');
let setSettings = settings();

describe('the settings bill function', function () {
    it('it should return the value of an sms as the value entered', function () {
        assert.equal(1, setSettings.setSettings(1));
    });
});
