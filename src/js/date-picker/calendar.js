var react = require('react');

Date.prototype.getDaysInMonth = function () {
    var here = new Date(this.getTime());
    here.setDate(32);
    return 32 - here.getDate();
};

Date.prototype.getFistDay = function () {
    var here = new Date(this.getFullYear(), this.getMonth(), 1);
    return here.getDay();
};

var CalendarComponent,
    monthLabels = [
                'Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec',
            ],
    dayElements = (function  () {
        var result = [],
            labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', ];

        for (var day=0; day < labels.length; day++) {
            result.push(react.createElement('td', null, labels[day]));
        };
        return react.createElement('tr', null, result);
    })();

function getWeeks (year, month, pickedDate) {
    var result = [],
        weeksCount = 6,
        daysInWeek = 7,
        pickedDate = pickedDate || new Date(),
        pickedYear = pickedDate.getFullYear(),
        pickedMonth = pickedDate.getMonth(),
        pickedDay = pickedDate.getDate();

    function getDate(day, week) {
        var focusedDate = new Date(year, month),
            firstDay = focusedDate.getFistDay(),
            result = (day+1)%(daysInWeek+1) - firstDay + week*daysInWeek;

        return ( result > 0 & result <= focusedDate.getDaysInMonth() ) ? result : 0;
    };

    function generateWeek(week) {
        var result = [],
            date,
            className = '';
        for (var day=0; day<daysInWeek; day++) {
            date = getDate(day, week);
            className = (pickedDay==date & pickedMonth==month & pickedYear==year ) ? 'picked' : '';
            result.push(react.createElement('td', {className: className}, date || ''));
        };
        return react.createElement('tr', null, result);
    };

    for (var week = 0; week < weeksCount; week++) {
        result.push(generateWeek(week));
    };
    return result;
};


MonthSelectorComponent = react.createClass({
    render: function() {
        var prevMonth = react.createElement('span', {onClick: this.props.prevMonth}, '<'),
            nextMonth = react.createElement('span', {onClick: this.props.nextMonth}, '>'),
            prevYear = react.createElement('span', {onClick: this.props.prevYear}, '<'),
            nextYear = react.createElement('span', {onClick: this.props.nextYear}, '>'),
            month = react.createElement('span', null, monthLabels[this.props.focusedMonth]),
            year = react.createElement('span', null, this.props.focusedYear);

        return react.createElement('h3', null, [prevMonth, month, nextMonth, prevYear, year, nextYear])
    },
});


CalendarComponent = react.createClass({
    getInitialState: function() {
        var curentDate = new Date(),
            pickedDate = undefined,
            focusedMonth = curentDate.getMonth(),
            focusedYear = curentDate.getFullYear(),
            weeks = getWeeks(focusedYear, focusedMonth),
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
        var month = react.createElement(
                MonthSelectorComponent,
                {
                    focusedYear: this.state.focusedYear,
                    focusedMonth: this.state.focusedMonth,
                    nextMonth: function(){
                            this.setState({focusedMonth: (this.state.focusedMonth+1)%12});
                        }.bind(this),
                    prevMonth: function(){
                            this.setState({focusedMonth: this.state.focusedMonth-1 || 12});
                        }.bind(this),
                    nextYear: function(){
                            this.setState({focusedYear: this.state.focusedYear+1});
                        }.bind(this),
                    prevYear: function(){
                            this.setState({focusedYear: this.state.focusedYear-1});
                        }.bind(this),
                }),

            calendarHead = react.createElement('thead', null, dayElements),
            calendarBody,
            calendar;

        this.state.weeks = getWeeks(this.state.focusedYear, this.state.focusedMonth, this.state.pickedDate);
        calendarBody = react.createElement('tbody', {onClick: this.selectDate}, this.state.weeks);
        calendar = react.createElement('table', null, [calendarHead, calendarBody]);
        return react.createElement('div', null, [month, calendar]);
    },

    selectDate: function(event) {
        this.setState({
            pickedDate: new Date(
                this.state.focusedYear,
                this.state.focusedMonth,
                event.target.innerHTML
            )
        });
    },
});

module.exports = CalendarComponent;