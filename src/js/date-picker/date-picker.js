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

function datePickerComponent () {
    this.curentDate = new Date();
    this.pickedDate = undefined;

    this.focusedMonth = this.curentDate.getMonth();
    this.focusedYear = this.curentDate.getFullYear();

    this.weeks = this.getWeeks();
};

datePickerComponent.prototype.dayElements = (function() {
    var result = [],
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ];

    for (var day=0; day < labels.length; day++) {
        result.push(react.createElement('td', null, labels[day]));
    };
    return react.createElement('tr', null, result);
})();

datePickerComponent.prototype.monthLabels = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
];

datePickerComponent.prototype.getWeeks = function() {
    var result = [],
        weeksCount = 6,
        daysInWeek = 7;

    function getDate(day, week) {
        var focusedDate = new Date(this.focusedYear, this.focusedMonth),
            firstDay = focusedDate.getFistDay(),
            result = (day+1)%(daysInWeek+1) - firstDay + week*daysInWeek;


        return ( result > 0 & result <= focusedDate.getDaysInMonth() ) ? result : 0;
    };
    getDate = getDate.bind(this);

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

datePickerComponent.prototype.render = function() {
    var calendarHead = react.createElement('thead', null, this.dayElements),
        calendarBody = react.createElement('tbody', null, this.weeks),
        calendar = react.createElement('table', null, [calendarHead, calendarBody])

    return react.createElement('div', {className: 'date-picker'}, calendar);
};

module.exports = datePickerComponent;