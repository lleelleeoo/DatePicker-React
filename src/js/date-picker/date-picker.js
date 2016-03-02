var react = require('react'),
    CalendarComponent = require('./calendar.js'),
    datePickerComponent = react.createClass({
        getInitialState: function() {
            return {
                fromDate: new Date(),
                toDate: new Date(),
            }
        },
        render: function() {
            var fromDate = react.createElement(
                    CalendarComponent,
                    {
                        pickDate: function(date) {
                            this.setState({fromDate: date});
                        }.bind(this)
                    }),
                toDate = react.createElement(
                    CalendarComponent,
                    {
                        pickDate: function(date) {
                            this.setState({toDate: date});
                        }.bind(this)
                    }),
                calendarWrapper = react.createElement(
                    'div',
                    {className: 'calendar-wrapper'},
                    [fromDate, toDate]
                ),
                startDuration = react.createElement(
                    'span',
                    null,
                    [
                        this.state.fromDate.getDate(), '.',
                        this.state.fromDate.getMonth(), '.',
                        this.state.fromDate.getFullYear(),
                    ]
                ),
                endDuration = react.createElement(
                    'span',
                    null,
                    [
                        this.state.toDate.getDate(), '.',
                        this.state.toDate.getMonth(), '.',
                        this.state.toDate.getFullYear(),
                    ]
                ),
                durationWrapper = react.createElement(
                    'div',
                    {className: 'duration-wrapper'},
                    [startDuration, '. . .', endDuration]
                );

            return react.createElement(
                'div',
                {className: 'date-picker-wrapper'},
                [calendarWrapper, durationWrapper]
            )
        },
    });

module.exports = datePickerComponent;