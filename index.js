const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const settings = require('./settings-bill');
const bill = settings();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index', {
        settings: bill.finTotal(),
        totals: bill.totals(),
        ColorChange: bill.ColorChange()
    });
});
app.post('/settings', function (req, res) {
    bill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    res.redirect('/');
});
app.post('/settings', function (req, res) {
    bill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    });

    res.redirect('/');
});

app.post('/action', function (req, res) {
    bill.recordAction(req.body.actionType);

    res.redirect('/');
});
app.get('/actions', function (req, res) {
    res.render('actions', {
        actions: bill.actions()
    });
});
app.get('/actions/:type', function (req, res) {
    let type = req.params.type;
    let holding = bill.actionsFor(type);
    res.render('actions', {
        actions: holding
    });
});
let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
    console.log('App started on port', PORT);
});
