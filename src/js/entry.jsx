var React = require('react'),
    reactDOM = require('react-dom'),

    DatePicker = require('./date-picker/date-picker.js');

require('../css/style.css');

reactDOM.render(
    <DatePicker/>,
    document.querySelector('#date-picker') || document.body
);
