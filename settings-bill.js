let Moment = require('moment');
module.exports = function () {
    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;
    let actionList = [];

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function finTotal() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        };
    }

    function recordAction(action) {
        if (finTotal() < criticalLevel) {
            let cost = 0;
            if (action === 'sms') {
                cost = smsCost;
            } else if (action === 'call') {
                cost = callCost;
            }

            actionList.push({
                type: action,
                cost: cost,
                timestamp: Moment(new Date()).fromNow()
            });
        }
    }

    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];

            if (action.type === type) {
                filteredActions.push(action);
            }
        }

        return filteredActions;
    }

    function getTotal(type) {
        let total = 0;

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                total += action.cost;
            }
        }
        return total;
    }

    function finTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms');
        let callTotal = getTotal('call');
        return {
            smsTotal,
            callTotal,
            finTotal: finTotal()
        };
    }


    function hasReachedWarningLevel() {
        const total = finTotal();
        const reachedWarningLevel = total >= warningLevel &&
            total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = finTotal();
        return total >= criticalLevel;
    }

    function ColorChange() {
        if (hasReachedWarningLevel()) {
            return 'warning';
        } else if (hasReachedCriticalLevel()) {
            return 'danger';
        }
    }


    return {
        setSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        ColorChange

    };
};