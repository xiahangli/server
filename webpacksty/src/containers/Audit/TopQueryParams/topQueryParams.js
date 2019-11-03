import React from 'react';
import {Menu} from 'antd-mobile';
import axios from '../../../utils/axiosApi';
import styles from './topQueryParams.scss';

const filterStatusData = [
    {label: '全部状态', value: 0},
    {label: '审核通过', value: 2},
    {label: '已作废', value: 3}
];
export default class TopQueryParams extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            typeSearchShow: false,
            typeSearchText: '全部方案',
            typeSearchVal: [],
            typeList: [],
            
            clazzSearchShow: false,
            gradeAndClazzText: '全部班级',
            gradeAndClazzVal: [],
            gradeAndClazzList: [],

            evaluatorText: '全部人员',
            evaluatorVal: [null],
            evaluatorList: [],

            thirdParamsShow: false, //  控制待我审核页面的人员（审核记录页面的状态）

            statusText: '全部状态',
            auditStatus: [0]
        };
    }

    componentDidMount () {
        this.getParamsData();
    }

    //  拿到头部筛选项的数据
    getParamsData = () => {
        let schoolId = sessionStorage.getItem('schoolId');
        let url = '/auth/global/evaluation/eva/app/getSearchConditions.htm';
        axios('get', url, {schoolId}).then((json) => {
            let typeList = json.data.types;
            let gradeAndClazzList = this.handleGradeAndClazz(json.data.grades);
            let evaluatorList = json.data.evaluators;
            this.setState({typeList, gradeAndClazzList, evaluatorList});
        });
    }

    //  处理班级和年级的数据
    handleGradeAndClazz = (gradeAndClazzList) => {
        for (let i = 1; i < gradeAndClazzList.length; i++) {
            let value = null;
            let label = gradeAndClazzList[i].label;
            let obj = {value, label};
            gradeAndClazzList[i].children.unshift(obj);
        }
        return gradeAndClazzList;
    }


    //  点击头部三个筛选条件 
    showSearch = (index) => {
        if (index === '0') {
            if (this.state.typeSearchShow) {
                this.setState({typeSearchShow: false});
            } else {
                this.setState({typeSearchShow: true, clazzSearchShow: false, thirdParamsShow: false, searchCurIndex: 0});
            }
        } else if (index === '1') {
            if (this.state.clazzSearchShow) {
                this.setState({clazzSearchShow: false});
            } else {
                this.setState({clazzSearchShow: true, typeSearchShow: false, thirdParamsShow: false, searchCurIndex: 1});
            }
        } else if (index === '2') {
            if (this.state.thirdParamsShow) {
                this.setState({thirdParamsShow: false});
            } else {
                this.setState({thirdParamsShow: true, clazzSearchShow: false, typeSearchShow: false, searchCurIndex: 2});
            }
        }
        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
        if (auditListWrap) {
            auditListWrap.style.overflow = 'hidden';
        }
    }

    //  改变方案
    changeType = (val) => {
        let {typeList} = this.state;
        let typeSearchText = '';
        let typeVal = val[0];
        let itemVal = val[1];
        let curItem = typeList.find((item) => {
            return item.value === typeVal;
        });
        let str1 = curItem.label;
        let curItem1 = curItem.children.find((item) => {
            return item.value === itemVal;
        });
        let str2 = curItem1.label;
        typeSearchText = `${str1}, ${str2}`;
        this.props.getTypeSearchVal(val);
        this.setState({typeSearchShow: false, typeSearchText, typeSearchVal: val});  
    }   

    //  改变班级
    changeClazz = (val) => {
        const {gradeAndClazzList} = this.state;
        const gradeId = val[0];
        const clazzId = val[1];
        const curGrade = gradeAndClazzList.find((item) => {
            return item.value === gradeId;
        });
        const curClazzIndex = curGrade.children.findIndex((item) => {
            return item.value === clazzId;
        });
        const gradeAndClazzText = curGrade.children[curClazzIndex].label;
        this.props.getGradeAndClazzVal(val);
        this.setState({clazzSearchShow: false, gradeAndClazzVal: val, gradeAndClazzText});
    }

    //  改变评价人员
    changeEvaluator = (val) => {
        const {evaluatorList} = this.state;
        const evaluatorId = val[0];
        const curItem = evaluatorList.find((item) => {
            return item.value === evaluatorId;
        }); 
        const evaluatorText = curItem.label;
        this.props.getEvaluatorVal(val);
        this.setState({thirdParamsShow: false, evaluatorText, evaluatorVal: val});
    }

    //  改变状态
    changeStatus = (val) => {
        this.props.getAuditStatus(val);
        const curItem = filterStatusData.find((item) => {
            return item.value === val[0];
        });
        this.setState({thirdParamsShow: false, auditStatus: val, statusText: curItem.label});
    }

    closeBg = () => {
        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
        if (auditListWrap) {
            auditListWrap.style.overflowY = 'scroll';
        }
        this.setState({typeSearchShow: false, clazzSearchShow: false, thirdParamsShow: false});
    }
    
    render() {
        const {type} = this.props;
        const {searchCurIndex, typeList, gradeAndClazzList, evaluatorList,
            typeSearchShow, typeSearchText, typeSearchVal, 
            clazzSearchShow, gradeAndClazzText, gradeAndClazzVal,
            thirdParamsShow, evaluatorText, evaluatorVal,
            statusText, auditStatus} = this.state;
        const typeMenu = 
            <Menu
                className={`twoColumnsMenu commonMenu ${styles.commonMenu}`}
                data={typeList}
                value={typeSearchVal}
                onChange={this.changeType}
            />;
        
        const clazzMenu = <Menu 
            className={`twoColumnsMenu commonMenu ${styles.commonMenu}`}
            data={gradeAndClazzList}
            value={gradeAndClazzVal}
            onChange={this.changeClazz}
        />;

        const evaluatorMenu = <Menu
            level={1}
            className={`oneColumnMenu commonMenu ${styles.commonMenu}`}
            data={evaluatorList}
            value={evaluatorVal}
            onChange={this.changeEvaluator}
        />;

        const statusMenu = <Menu level={1} 
            className={`oneColumnMenu commonMenu ${styles.commonMenu}`}
            data={filterStatusData}
            value={auditStatus}
            onChange={this.changeStatus}
        />;

        return (
            <div>
                <div className={`${styles.searchTitle} searchTitle`}>
                    <span className={`oneTitleWrap ${searchCurIndex === 0 ? 'curTitle' : ''}`} onClick={() => {
                        this.showSearch('0');
                    }}>
                        <span className={`titleVal f-ellipsis`}>{typeSearchText}</span>
                        <i className={`evaiconfont styles.arrowUp`}>&#xe82f;</i>
                    </span>
                    <span className={`oneTitleWrap ${searchCurIndex === 1 ? 'curTitle' : ''}`} onClick={() => {
                        this.showSearch('1');
                    }}>
                        <span className={`titleVal f-ellipsis`}>{gradeAndClazzText}</span>
                        <i className="evaiconfont">&#xe82f;</i>
                    </span>
                    <span className={`oneTitleWrap ${searchCurIndex === 2 ? 'curTitle' : ''}`} onClick={() => {
                        this.showSearch('2');
                    }}>
                        <span className={`titleVal f-ellipsis`}>{type && type === 'toAudit' ? evaluatorText : statusText}</span>
                        <i className="evaiconfont">&#xe82f;</i>
                    </span>
                </div>
                {(typeSearchShow || clazzSearchShow || thirdParamsShow) && <div className={styles.bgShade} onClick={this.closeBg}></div> }
                
                {/******* 三个查询头部开始 ******/}
                {typeSearchShow && typeMenu}
                {clazzSearchShow && clazzMenu}
                {thirdParamsShow && (type && type === 'toAudit' ? evaluatorMenu : statusMenu)}
                {/****** 三个查询头部结束 ******/}
            </div>
        );
    }
}