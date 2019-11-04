import React from 'react';
import styles from './hdQueryParams.scss';
import moment from 'moment';
import axios from '../../../utils/axiosApi';
import {Menu, DatePicker} from 'antd-mobile';


const statusData = [
    {'label': '全部状态', value: null},
    {'label': '待审核', value: 1},
    {'label': '审核通过', value: 2},
    {'label': '已作废', value: 3},
];

export default class HdQueryParams extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            typeList: [],
            typeSearchVal: [],
            maxTime: '',
            minTime: '',
            auditStatus: null,
            monthSearchShow: false,
            monthSearchVal: '',
            monthSearchText: '全部时间'
        };
    }

    componentDidMount () {
        let schoolId = sessionStorage.getItem('schoolId');
        this.getTypeList(schoolId);
        this.getTimeScope(schoolId);
    }

    //  拿到全部类型数据
    getTypeList = (schoolId) => {
        let url = '/auth/global/evaluation/eva/app/getTypeList.htm';
        axios('get', url, {schoolId}).then((json) => {
            let typeList = json.data || [];
            this.setState({typeList});
        });
    }

    //  拿到时间限制
    getTimeScope = (schoolId) => {
        let url = '/auth/global/evaluation/eva/app/getTimeScope.htm';
        axios('get', url, {schoolId}).then((json) => {
            let maxTime = json.data.maxTime;
            let minTime = json.data.minTime;
            maxTime = new Date(maxTime);
            minTime = new Date(minTime);
            this.setState({maxTime, minTime});
        });
    }

      //  改变类型
      changeType = (val) => {
          this.setState({typeSearchVal: val});
      }

    //  改变审核装态
    changeStatus = (auditStatus) => {
        this.setState({auditStatus});
    }

    showMonthSearch = () => {
        this.setState({monthSearchShow: true});
    }

    //  确定选择月份
    sureMonth = val => {
        let evaDate = moment(val).format('YYYY-MM');
        let year = evaDate.split('-')[0];
        let month = evaDate.split('-')[1];
        let monthSearchText = year + '年' + month + '月';
        this.setState({monthSearchShow: false, monthSearchText, monthSearchVal: val});
    }

    //  取消选择月份
    disMissMonth = () => {
        this.setState({monthSearchShow: false});
    }

    clearTime = () => {
        this.setState({monthSearchText: '全部时间', monthSearchVal: ''});
    }

    //  筛选部分的取消按钮
    cancelSearch = () => {
        this.props.changeShowHdQueryParams();
    }

    //  确定筛选，
    sureSearch = () => {
        let {typeSearchVal, auditStatus, monthSearchVal} = this.state;
        let typeId = typeSearchVal[0];
        let itemId = typeSearchVal[1];
        let params = {auditStatus, typeId, itemId};
        if (monthSearchVal) {
            let evaDate = moment(monthSearchVal).format('YYYY-MM');
            params.evaDate = evaDate;
        }
        this.props.getQueryParams(params);
    }

    render() {
        const {typeList, typeSearchVal, auditStatus, monthSearchShow, 
            monthSearchVal, monthSearchText, minTime, maxTime} = this.state;
        const {showStatus} = this.props;
        const typeMenu = 
            <Menu
                className={`twoColumnsMenu commonMenu ${styles.commonMenu}`}
                data={typeList}
                value={typeSearchVal}
                onChange={this.changeType}
            />; 

        const monthSearch = <DatePicker visible={monthSearchShow} 
            mode="month" 
            minDate = {minTime}
            value={monthSearchVal}
            maxDate = {maxTime}
            onOk = {this.sureMonth}
            onDismiss = {this.disMissMonth}
        />;
        return (
            <div className={`${styles.queryParams} queryParams`}>
                <div className={styles.oneQuery}>
                    <p className={styles.title}>评价方案</p>
                    {typeMenu}
                </div>
                {showStatus && <div className={styles.oneQuery}>
                    <p className={styles.title}>审核状态</p>
                    {statusData.map(item=> <span key={item.value}
                        className={`${styles.statusItem} ${auditStatus === item.value ? styles.activeStatus : ''}`}
                        onClick={() => {
                            this.changeStatus(item.value);
                        }}
                    >{item.label}</span>) }
                </div>}
                
                <div className={`${styles.oneQuery} cf`}>
                    <p className={styles.clearTime} onClick={this.clearTime}><i className={'evaiconfont'}>&#xe63f;</i>清空</p>
                    <p className={styles.title}>评价日期<span className={styles.timeVal} onClick={this.showMonthSearch}>{monthSearchText}<i className={'evaiconfont'}>&#xe684;</i></span></p>
                </div>
                <p className={styles.btn}>
                    <span className={styles.cancel} onClick={this.cancelSearch}>取消</span>
                    <span className={styles.confirm} onClick={this.sureSearch}>确定</span>
                </p>
                {monthSearchShow && monthSearch}
            </div>
        );
    }
}