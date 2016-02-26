// var calendar = require('./calendar.js');
var react = require('react');

function datePickerComponent () {
    this.content = 'pew';

    return react.createElement(
        'div',
        {
            className: 'date-picker'
        },
        'calendar was here'
    );
}

module.exports = datePickerComponent;