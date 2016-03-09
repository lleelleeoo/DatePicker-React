var React = require('react'),
    MONTH_LABELS = [
                    'Jan', 'Feb', 'Mar',
                    'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dec',
                ],
    MonthSelectorComponent = React.createClass({
        render: function() {
            return (
                <h3 className="calendar-header">
                    <span
                        onClick = { this.props.prevMonth }
                        className="active"
                    >
                        {'\u21E6'}
                    </span>
                    <span>
                        { MONTH_LABELS[this.props.focusedMonth] }
                    </span>
                    <span
                        onClick = { this.props.nextMonth }
                        className="active"
                    >
                        {'\u21E8'}
                    </span>

                    <span
                        onClick = { this.props.prevYear }
                        className="active"
                    >
                        {'\u21E6'}
                    </span>
                    <span>
                        { this.props.focusedYear }
                    </span>
                    <span
                        onClick = { this.props.nextYear }
                        className="active"
                    >
                        {'\u21E8'}
                    </span>
                </h3>
            );
        },
    });

module.exports = MonthSelectorComponent;