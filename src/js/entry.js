var react = require('react'),
    reactDOM = require('react-dom'),

    datePicker = require('./date-picker/date-picker.js');

require('../css/style.css')

reactDOM.render(
    react.createElement('h1', null, datePicker()),
    document.querySelector('#date-picker')
);
