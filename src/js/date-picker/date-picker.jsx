var React = require('react'),
    CalendarComponent = require('./calendar.jsx'),
    datePickerComponent = React.createClass({
        getInitialState: function() {
            var fromDate = new Date(),
                toDate = new Date();

            toDate.setDate(toDate.getDate()+14);
            return {
                fromDate: fromDate,
                toDate: toDate,
            };
        },
        render: function() {
            return (
                <div className="date-picker-wrapper">
                    <div className="calendar-wrapper">
                        <CalendarComponent
                            pickDate = { function(date) {
                                            this.setState({fromDate: date});
                                        }.bind(this)
                            }
                            pickedDate = { this.state.fromDate }
                            disableBefore = { new Date() }
                            disableAfter = { this.state.toDate }
                        />
                        <CalendarComponent
                            pickDate = { function(date) {
                                            this.setState({toDate: date});
                                        }.bind(this)
                            }
                            pickedDate = { this.state.toDate }
                            disableBefore = {
                                new Date(
                                    this.state.fromDate.getFullYear(),
                                    this.state.fromDate.getMonth(),
                                    this.state.fromDate.getDate() + 2
                                )
                            }
                        />
                    </div>
                    <div className="duration-wrapper">
                        <span>
                            {this.state.fromDate.getDate()}.
                            {this.state.fromDate.getMonth()}.
                            {this.state.fromDate.getFullYear()}
                        </span>
                        <span>
                            {this.state.toDate.getDate()}.
                            {this.state.toDate.getMonth()}.
                            {this.state.toDate.getFullYear()}
                        </span>
                    </div>
                </div>
            );
        },
    });

module.exports = datePickerComponent;