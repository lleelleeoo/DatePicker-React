var react = require('react'),
    CalendarComponent = require('./calendar.js'),
    toDate = react.createElement(CalendarComponent);

var datePickerComponent = react.createClass({
    getInitialState: function() {
        return {
            toDate: toDate,
        }
    },
    render: function() {
        return react.createElement('div', null, this.state.toDate)
    },
})

module.exports = datePickerComponent;