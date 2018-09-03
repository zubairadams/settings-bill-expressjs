let assert = require('assert');
let settings = require('./settings-bill.js');

describe('the settings bill function', function () {
    it('it should return the price of two calls and no sms', function () {
        var settingsBill = settings();

        let values = {
            smsCost: 5,
            callCost: 5,
            warningLevel: 15,
            criticalLevel: 20
        };
        settingsBill.setSettings(values);
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');

        let totals = settingsBill.totals();

        assert.equal(10, totals.callTotal);
        assert.equal(0, totals.smsTotal);
        assert.equal(10, totals.finTotal);
    });
    it('it should return the price of two sms and no calls', function () {
        var settingsBill = settings();

        let values = {
            smsCost: 5,
            callCost: 5,
            warningLevel: 15,
            criticalLevel: 20
        };
        settingsBill.setSettings(values);
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        let totals = settingsBill.totals();

        assert.equal(0, totals.callTotal);
        assert.equal(10, totals.smsTotal);
        assert.equal(10, totals.finTotal);
    });
    //     it('should stop adding once the critical has been reached ', function () {
    //         var settingsBill = settings();

    //         let values = {
    //             smsCost: 15,
    //             callCost: 15,
    //             warningLevel: 15,
    //             criticalLevel: 30
    //         };
    //         settingsBill.setSettings(values);
    //         settingsBill.recordAction('sms');
    //         settingsBill.recordAction('call');
    //         settingsBill.recordAction('sms');
    //         settingsBill.recordAction('action');
    //         assert.equal(true, settingsBill.hasReachedCriticalLevel());
    //         let totals = settingsBill.totals();

    //         assert.equal(15, totals.callTotal);
    //         assert.equal(15, totals.smsTotal);
    //         assert.equal(30, totals.finTotal);
    //     });
    it('should stop adding to the total when critical has been reached ', function () {
        var settingsBill = settings();

        let values = {
            smsCost: 5,
            callCost: 5,
            warningLevel: 15,
            criticalLevel: 20
        };
        settingsBill.setSettings(values);
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        let totals = settingsBill.totals();

        assert.equal(5, totals.callTotal);
        assert.equal(15, totals.smsTotal);
        assert.equal(20, totals.finTotal);
    });
    it('should return the value of one call and two sms', function () {
        var settingsBill = settings();

        let values = {
            smsCost: 5,
            callCost: 5,
            warningLevel: 15,
            criticalLevel: 20
        };
        settingsBill.setSettings(values);
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        let totals = settingsBill.totals();

        assert.equal(5, totals.callTotal);
        assert.equal(10, totals.smsTotal);

        assert.equal(15, totals.finTotal);
    });
});