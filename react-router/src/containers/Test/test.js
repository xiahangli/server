import React from 'react';
import {DatePicker} from 'antd-mobile';


export default class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //   date: now,
            //   time: now,
            //   utcDate: utcNow,
            dpValue: null,
            customChildValue: null,
            //   visible: false,
        };
    }

    render() {
        return (
            //   <List className="date-picker-list" style={{backgroundColor: 'white'}}>
            <DatePicker
                value={this.state.date}
                onChange={date => this.setState({date})}
            >
                {/* <List.Item arrow="horizontal">Datetime789</List.Item> */}
                <p>Dddddddddatetime789</p>
            </DatePicker>
            //   </List>
        );
    }
}