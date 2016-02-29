var react = require('react'),
    CalendarComponent = require('./calendar.js'),
    fromDate = react.createElement(CalendarComponent),
    toDate = react.createElement(CalendarComponent);

var datePickerComponent = react.createClass({
    getInitialState: function() {
        return {
            fromDate: fromDate,
            toDate: toDate,
        }
    },
    render: function() {
        return react.createElement('div', null, [this.state.fromDate, this.state.toDate])
    },
})

module.exports = datePickerComponent;