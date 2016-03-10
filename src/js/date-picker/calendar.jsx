require('./date-helpers.js');

var React = require('react'),
    MonthSelectorComponent = require('./month-selector-component.jsx'),
    CalendarComponent;

CalendarComponent = React.createClass({
    getInitialState: function() {
        var today = new Date(),
            pickedDate = this.props.pickedDate || null,
            focusedMonth = today.getMonth(),
            focusedYear = today.getFullYear(),
            weeks,
            state;

        state = {
            today: today,
            pickedDate: pickedDate,
            focusedMonth: focusedMonth,
            focusedYear: focusedYear,
            weeks: weeks,
        };

        return state;
    },

    selectMonth: function(month) {
        this.setState({focusedMonth: month});
    },

    selectYear: function(year) {
        this.setState({focusedYear: year});
    },

    render: function() {
        this.state.weeks = this.getWeeks();

        return (
            <div>
                <MonthSelectorComponent
                    focusedYear = { this.state.focusedYear }
                    focusedMonth = { this.state.focusedMonth }
                    prevMonth = { this.selectMonth.bind(this, this.state.focusedMonth-1) }
                    nextMonth = { this.selectMonth.bind(this, this.state.focusedMonth+1) }
                    prevYear = { this.selectYear.bind(this, this.state.focusedYear-1) }
                    nextYear = { this.selectYear.bind(this, this.state.focusedYear+1) }
                />
                <table>
                    <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody onClick = { this.selectDate }>
                        { this.state.weeks }
                    </tbody>
                </table>
            </div>
        );
    },

    selectDate: function(event) {
        if (event.target.classList.contains('active')) {
            var pickedDate = new Date(
                    this.state.focusedYear,
                    this.state.focusedMonth,
                    event.target.innerHTML
                );
            this.setState({
                pickedDate: pickedDate
            });

            this.props.pickDate(pickedDate);
        }
    },

    getWeeks: function  () {
        var today = new Date(),
            result = [],
            weeksCount = 6,
            daysInWeek = 7,
            pickedDate = this.props.pickedDate || today,
            pickedYear = pickedDate.getFullYear(),
            pickedMonth = pickedDate.getMonth(),
            pickedDay = pickedDate.getDate(),
            disableBefore = this.props.disableBefore || today,
            disableAfter = this.props.disableAfter || new Date(today.getFullYear()+2, today.getMonth());

        function generateWeek(week) {
            var result = [],
                date,
                className = '';

            function getDate(day, week) {
                var focusedDate = new Date(this.state.focusedYear, this.state.focusedMonth),
                    firstDay = focusedDate.getFistDay(),
                    result = (day+1)%(daysInWeek+1) - firstDay + week*daysInWeek;

                return ( result>0 & result <= focusedDate.getDaysInMonth() ) ? result : 0;
            }

            for (var day=0; day<daysInWeek; day++) {
                date = getDate.call(this, day, week);
                className = '';
                className += (
                    pickedDay==date & pickedMonth==this.state.focusedMonth & pickedYear==this.state.focusedYear
                ) ? 'picked' : '';
                var isAvailable = (new Date(this.state.focusedYear, this.state.focusedMonth, date+1) >= disableBefore) &&
                    (new Date(this.state.focusedYear, this.state.focusedMonth, date+1) <= disableAfter);

                className += (date && isAvailable) ? ' active' : ' disable';
                result.push(
                    <td className = { className }>
                        { date || '' }
                    </td>
                );
            }

            return <tr>{ result }</tr>;
        }

        for (var week = 0; week < weeksCount; week++) {
            result.push(generateWeek.call(this, week));
        }

        return result;
    },
});

module.exports = CalendarComponent;