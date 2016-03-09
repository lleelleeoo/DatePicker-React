var React = require('react'),
    CalendarComponent = require('./calendar.js'),
    datePickerComponent = React.createClass({
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
            var fromDate = React.createElement(
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
                toDate = React.createElement(
                    CalendarComponent,
                    {
                        pickDate: function(date) {
                            this.setState({toDate: date});
                        }.bind(this),
                        pickedDate: this.state.toDate,
                        disableBefore: this.state.fromDate,
                        key: 'to-picker',
                    }),
                calendarWrapper = React.createElement(
                    'div',
                    {
                        className: 'calendar-wrapper',
                        key: 'calendar-wrapper',
                    },
                    [fromDate, toDate]
                ),
                startDuration = React.createElement(
                    'span',
                    {key: 'start-duration'},
                    [
                        this.state.fromDate.getDate(), '.',
                        this.state.fromDate.getMonth(), '.',
                        this.state.fromDate.getFullYear(),
                    ]
                ),
                endDuration = React.createElement(
                    'span',
                    {key: 'end-duration'},
                    [
                        this.state.toDate.getDate(), '.',
                        this.state.toDate.getMonth(), '.',
                        this.state.toDate.getFullYear(),
                    ]
                ),
                durationWrapper = React.createElement(
                    'div',
                    {
                        className: 'duration-wrapper',
                        key: 'duration-wrapper',
                    },
                    [startDuration, endDuration]
                );

            return React.createElement(
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