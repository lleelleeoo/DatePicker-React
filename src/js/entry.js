var react = require('react'),
    reactDOM = require('react-dom'),

    DatePicker = require('./date-picker/date-picker.js'),
    datePicker = react.createElement(DatePicker);

require('../css/style.css');

reactDOM.render(
    datePicker,
    document.querySelector('#date-picker')
);
