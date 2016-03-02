var react = require('react'),
    reactDOM = require('react-dom'),

    DatePicker = require('./date-picker/date-picker.js'),
    datePicker = react.createElement(DatePicker, {
        key: 'main-date-picker',
    });

require('../css/style.css');

reactDOM.render(
    datePicker,
    document.querySelector('#date-picker')
);
