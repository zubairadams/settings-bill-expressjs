
module.exports = function () {
    let smsCost = 0;
    let callCost = 0;
    let warningLevel = 0;
    let criticalLevel = 0;
    let actionList = [];

    function setSettings (settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }
    // function getSettings() {
    //     return {
    //         smsCost = Number(settings.smsCost);
    //         callCost = Number(settings.callCost);
    //         warningLevel = settings.warningLevel;
    //         criticalLevel = settings.criticalLevel;
    //     }
    // }

    function getSettings () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        };
    }

    function recordAction (action) {
        
        // let myToday = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
       // console.log(date);
        //console.log(myToday);

        let record = {
            type: action,
            timestamp: new Date()
        }

        if (finTotal() < criticalLevel) {
            let cost = 0;
            if (action === 'sms') {
                cost = smsCost;
                record.cost = smsCost;
            } else if (action === 'call') {
                cost = callCost;
                record.cost = callCost;
            }

            actionList.push(record);
        }
    }

    function actions () {
        return actionList;
    }

    function actionsFor (type) {
        const filteredActions = [];

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];

            if (action.type === type) {
                filteredActions.push(action);
            }
        }

        return filteredActions;
    }

    function getTotal (type) {
        let total = 0;

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                total += action.cost;
            }
        }
        return total;
    }

    function finTotal () {
        return getTotal('sms') + getTotal('call');
    }

<<<<<<< HEAD
    function totals () {
=======
    function totals() {
>>>>>>> 27b2b7accedd8e470e3bba49acbbc133a86fd0ab
        let smsTotal = getTotal('sms').toFixed(2);
        let callTotal = getTotal('call').toFixed(2);
        return {
            smsTotal,
            callTotal,
            finTotal: finTotal().toFixed(2)
        };
    }

    function hasReachedWarningLevel () {
        const total = finTotal();
        const reachedWarningLevel = total >= warningLevel &&
            total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel () {
        const total = finTotal();
        return total >= criticalLevel;
    }

    function ColorChange () {
        if (hasReachedWarningLevel()) {
            return 'warning';
        } else if (hasReachedCriticalLevel()) {
            return 'danger';
        }
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        finTotal,
        actions,
        actionsFor,
        totals,
        finTotal,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        ColorChange

    };
};

