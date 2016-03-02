var react = require('react'),
    CalendarComponent = require('./calendar.js'),
    datePickerComponent = react.createClass({
        getInitialState: function() {
            var fromDate = new Date(),
                toDate = new Date();

            toDate.setDate(toDate.getDate()+14);
            return {
                fromDate: fromDate,
                toDate: toDate,
            }
        },
        render: function() {
            var fromDate = react.createElement(
                    CalendarComponent,
                    {
                        pickDate: function(date) {
                            this.setState({fromDate: date});
                        }.bind(this),
                        pickedDate: this.state.fromDate,
                        disableBefore: new Date(),
                        disableAfter: this.state.toDate,
                        key: 'from-picker',
                    }),
                toDate = react.createElement(
                    CalendarComponent,
                    {
                        pickDate: function(date) {
                            this.setState({toDate: date});
                        }.bind(this),
                        pickedDate: this.state.toDate,
                        disableBefore: this.state.fromDate,
                        key: 'to-picker',
                    }),
                calendarWrapper = react.createElement(
                    'div',
                    {
                        className: 'calendar-wrapper',
                        key: 'calendar-wrapper',
                    },
                    [fromDate, toDate]
                ),
                startDuration = react.createElement(
                    'span',
                    {key: 'start-duration'},
                    [
                        this.state.fromDate.getDate(), '.',
                        this.state.fromDate.getMonth(), '.',
                        this.state.fromDate.getFullYear(),
                    ]
                ),
                endDuration = react.createElement(
                    'span',
                    {key: 'end-duration'},
                    [
                        this.state.toDate.getDate(), '.',
                        this.state.toDate.getMonth(), '.',
                        this.state.toDate.getFullYear(),
                    ]
                ),
                durationWrapper = react.createElement(
                    'div',
                    {
                        className: 'duration-wrapper',
                        key: 'duration-wrapper',
                    },
                    [startDuration, endDuration]
                );

            return react.createElement(
                'div',
                {
                    className: 'date-picker-wrapper',
                    key: 'date-picker-wrapper',
                },
                [calendarWrapper, durationWrapper]
            )
        },
    });

module.exports = datePickerComponent;