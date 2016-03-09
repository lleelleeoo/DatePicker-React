var React = require('react');

Date.prototype.getDaysInMonth = function () {
    var here = new Date(this.getTime());
    here.setDate(32);
    return 32 - here.getDate();
};

Date.prototype.getFistDay = function () {
    var here = new Date(this.getFullYear(), this.getMonth(), 1);
    return here.getDay();
};

var monthLabels = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec',
            ],
    dayElements = (function  () {
        var result = [],
            labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', ];

        for (var day=0; day < labels.length; day++) {
            result.push(React.createElement('td', {key: labels[day]}, labels[day]));
        };
        return React.createElement('tr', {key: result}, result);
    })(),
    CalendarComponent,
    MonthSelectorComponent;

function getWeeks (year, month, pickedDate, disableBefore, disableAfter) {
    var today = new Date(),
        result = [],
        weeksCount = 6,
        daysInWeek = 7,
        pickedDate = pickedDate || today,
        pickedYear = pickedDate.getFullYear(),
        pickedMonth = pickedDate.getMonth(),
        pickedDay = pickedDate.getDate(),
        disableBefore = disableBefore || today,
        disableAfter = disableAfter || new Date(today.getFullYear()+2,
                                                today.getMonth());
    function getDate(day, week) {
        var focusedDate = new Date(year, month),
            firstDay = focusedDate.getFistDay(),
            result = (day+1)%(daysInWeek+1) - firstDay + week*daysInWeek;

        return ( result>0 & result <= focusedDate.getDaysInMonth() )
            ? result : 0;
    };

    function generateWeek(week) {
        var result = [],
            date,
            className = '';
        for (var day=0; day<daysInWeek; day++) {
            date = getDate(day, week);
            className = '';
            className += (
                pickedDay==date & pickedMonth==month & pickedYear==year
            ) ? 'picked' : '';
            var isAvailable = (new Date(year, month, date+1) >= disableBefore)
                && (new Date(year, month, date+1) <= disableAfter);
            className += (date && isAvailable) ? ' active' : ' disable';
            result.push(
                React.createElement(
                    'td',
                    {
                        className: className,
                        key: '' + week + day,
                    },
                    date || ''
                )
            );
        };
        return React.createElement('tr', {key: week}, result);
    };

    for (var week = 0; week < weeksCount; week++) {
        result.push(generateWeek(week));
    };
    return result;
};


MonthSelectorComponent = React.createClass({
    render: function() {
        var prevMonth = React.createElement(
                'span',
                {
                    onClick: this.props.prevMonth,
                    className: 'active',
                    key: 'prev-month-button',
                },
                '<'
            ),
            nextMonth = React.createElement(
                'span',
                {
                    onClick: this.props.nextMonth,
                    className: 'active',
                    key: 'next-month-button',
                },
                '>'
            ),
            prevYear = React.createElement(
                'span',
                {
                    onClick: this.props.prevYear,
                    className: 'active',
                    key: 'prev-year-button',
                },
                '<'
            ),
            nextYear = React.createElement(
                'span',
                {
                    onClick: this.props.nextYear,
                    className: 'active',
                    key: 'next-year-button',
                },
                '>'
            ),
            month = React.createElement(
                'span', {key: 'selected-month'}, monthLabels[this.props.focusedMonth]
            ),
            year = React.createElement(
                'span', {key: 'selected-year'}, this.props.focusedYear
            );

        return React.createElement('h3', {className: 'calendar-header'},
            [prevMonth, month, nextMonth, prevYear, year, nextYear]
        )
    },
});


CalendarComponent = React.createClass({
    getInitialState: function() {
        var curentDate = new Date(),
            pickedDate = this.props.pickedDate || null,
            focusedMonth = curentDate.getMonth(),
            focusedYear = curentDate.getFullYear(),
            weeks = getWeeks(focusedYear, focusedMonth, null, this.props.disableBefore, this.props.disableAfter),
            state;

        state = {
            curentDate: curentDate,
            pickedDate: pickedDate,
            focusedMonth: focusedMonth,
            focusedYear: focusedYear,
            weeks: weeks,
        };

        return state;
    },

    render: function() {
        var month = React.createElement(
                MonthSelectorComponent,
                {
                    focusedYear: this.state.focusedYear,
                    focusedMonth: this.state.focusedMonth,
                    nextMonth: function(){
                            this.setState({
                                focusedMonth: (this.state.focusedMonth+1)%12
                            });
                        }.bind(this),
                    prevMonth: function(){
                            this.setState({
                                focusedMonth: this.state.focusedMonth-1 < 0
                                    ? 11 : this.state.focusedMonth-1
                            });
                        }.bind(this),
                    nextYear: function(){
                            this.setState({
                                focusedYear: this.state.focusedYear+1
                            });
                        }.bind(this),
                    prevYear: function(){
                            this.setState({
                                focusedYear: this.state.focusedYear-1
                            });
                        }.bind(this),
                    key: 'month-' + this.state.focusedMonth,
                }),

            calendarHead = React.createElement('thead', {key: 'picker-header'}, dayElements),
            calendarBody,
            calendar;

        this.state.weeks = getWeeks(
            this.state.focusedYear,
            this.state.focusedMonth,
            this.state.pickedDate,
            this.props.disableBefore,
            this.props.disableAfter
        );
        calendarBody = React.createElement(
            'tbody',
            {
                onClick: this.selectDate,
                key: 'picker-body',
            },
            this.state.weeks
        );
        calendar = React.createElement(
            'table',
            {key: 'calendar-component'},
            [calendarHead, calendarBody]
        );
        return React.createElement('div', {key: 'calendar'}, [month, calendar]);
    },

    selectDate: function(event) {
        if (event.target.classList.contains('active')) {
            pickedDate = new Date(
                    this.state.focusedYear,
                    this.state.focusedMonth,
                    event.target.innerHTML
                )
            this.setState({
                pickedDate: pickedDate
            });

            this.props.pickDate(pickedDate)
        }
    },
});

module.exports = CalendarComponent;