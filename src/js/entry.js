var react = require('react'),
    reactDOM = require('react-dom'),

    DatePicker = require('./date-picker/date-picker.js'),
    datePicker = new DatePicker;

require('../css/style.css')

reactDOM.render(
    datePicker.render(),
    document.querySelector('#date-picker')
);
