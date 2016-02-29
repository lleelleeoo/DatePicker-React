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
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ];

        for (var day=0; day < labels.length; day++) {
            result.push(react.createElement('td', null, labels[day]));
        };
        return react.createElement('tr', null, result);
    })();

function getWeeks (year, month) {
    var result = [],
        weeksCount = 6,
        daysInWeek = 7;

    function getDate(day, week) {
        var focusedDate = new Date(year, month),
            firstDay = focusedDate.getFistDay(),
            result = (day+1)%(daysInWeek+1) - firstDay + week*daysInWeek;

        return ( result > 0 & result <= focusedDate.getDaysInMonth() ) ? result : 0;
    };

    function generateWeek(week) {
        var result = [],
            date;
        for (var day=0; day<daysInWeek; day++) {
            date = getDate(day, week);
            result.push(react.createElement('td', null, date || ''));
        };
        return react.createElement('tr', null, result);
    };

    for (var week = 0; week < weeksCount; week++) {
        result.push(generateWeek(week));
    };
    return result;
};


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
        var month = react.createElement('h3', null, monthLabels[this.state.focusedMonth]),

            calendarHead = react.createElement('thead', null, dayElements),
            calendarBody = react.createElement('tbody', null, this.state.weeks),
            calendar = react.createElement('table', null, [calendarHead, calendarBody]);

        return react.createElement('div', null, [month, calendar]);
    },
});





module.exports = CalendarComponent;