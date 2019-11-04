import React, {Component} from "react";
import {List, Picker} from 'antd-mobile';
import {connect} from "react-redux";
import {updateFirstItem, updateStandardData, deleteBehaviorData} from '../../../store/actions';

import styles from './firstItem.scss';
import axios from '../../../utils/axiosApi';

class FirstItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            pickerValue: []
        }; 
    }
    
    componentDidMount () {
        let typeId = this.props.targetTypeData.id;
        axios('get', '/auth/global/evaluation/eva/app/getFirstItem.htm', {typeId})
            .then((json) => {
                if (json.success) {
                    let pickerValue;
                    if (JSON.stringify(this.props.firstItem) !== '{}' ) {
                        pickerValue = [this.props.firstItem.id];
                    } else {
                        pickerValue = [json.data[0].id];
                        this.props.updateFirstItem(json.data[0]);
                        this.props.updateStandardData(json.data[0]);
                    }
                   
                    let listDataStr = JSON.stringify(json.data);
                    listDataStr = listDataStr.replace(new RegExp(/id/g), "value");
                    listDataStr = listDataStr.replace(new RegExp(/name/g), "label");
                    let listData = JSON.parse(listDataStr);
                    this.setState({listData, pickerValue});
                }
            });
    }

    getFirstItem = (e, item) => {
        //  把点击的一级数据存放在redux共享
        this.props.updateFirstItem(item);

        // 判断一级菜单是否是可评项
        if (item.initScore !== null) {
            this.props.updateStandardData(item);
        } 
    }


    changeItem = (pickerValue) => {
        const {listData} = this.state;
        let id = pickerValue[0];
        let curItem = listData.find((item) => {
            return item.value === id;
        });
        curItem.id = curItem.value;
        this.props.updateFirstItem(curItem);
        
        // 判断一级菜单是否是可评项
        if (curItem.initScore !== null) {
            this.props.updateStandardData(curItem);
        } 
        this.setState({pickerValue});
        this.clearStatus();
    }

    //    把之前的状态清空 重头来过
    clearStatus = () => { 
        //  二级和三级的id, index归为初始
        let behaviorData = {}; 
        this.props.deleteBehaviorData(behaviorData);
    }

    render() {
        const {listData, pickerValue} = this.state;
        return (
            <div className={`pickerWrap ${styles.firstItem}`}>
                <Picker
                    data={listData}
                    title={"选择评价项目"}
                    value={pickerValue}
                    onChange = { (v) => {
                        this.changeItem(v);
                    }}
                    cols={1}
                >
                    <List.Item arrow="horizontal">评价项目</List.Item>
                </Picker>
            </div> 
        );
    }
}

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
        targetTypeData: state.targetTypeData,
        firstItem: state.firstItem, 
    }),
    {updateFirstItem, updateStandardData, deleteBehaviorData}
)(FirstItem);
