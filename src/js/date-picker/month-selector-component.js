var React = require('react'),
    MONTH_LABELS = [
                    'Jan', 'Feb', 'Mar',
                    'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dec',
                ],
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
                    'span', {key: 'selected-month'}, MONTH_LABELS[this.props.focusedMonth]
                ),
                year = React.createElement(
                    'span', {key: 'selected-year'}, this.props.focusedYear
                );

            return React.createElement('h3', {className: 'calendar-header'},
                [prevMonth, month, nextMonth, prevYear, year, nextYear]
            )
        },
    });

module.exports = MonthSelectorComponent;