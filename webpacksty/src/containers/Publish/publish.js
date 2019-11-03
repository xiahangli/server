import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from '../../utils/axiosApi';
import {List, Picker, Calendar} from 'antd-mobile';
import moment from 'moment';

import styles from './publish.scss';
import FirstItem from './FirstItem/firstItem';
import Behavior from './Behavior/behavior';
import BatchObject from './BatchObject/batchObject';
import constant from '../../utils/constant';
import {Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {updateBatchObjectArray, updateStartTime} from '../../store/actions';

class Publish extends Component {
    originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;
    constructor(props) {
        super(props);
        this.state = { 
            targetTypeData: {}, // targetType: ''  1-学生 2-班级 3-宿舍  
            startTime: '',
            pickerData: [],     //  picker展示的数组
            pickerExtra: '添加',
            pickerValue: [],
            pickerTitle: '班级',
            pickerCol: 2,
            evaDate: '',    //  日期  2019-06-26
            evaWeekDay: '', //  周几 
            showCalendar: false,
            showSubmitSuccessModal: false
        };
    }
    componentDidMount () {
        this.canSubmit = true;
        document.addEventListener('deviceready', function() {
            window.LeTalkCorePlugin.customBack('custom');
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
        }, false);
       
        //  选择学生对象页面回来后，执行这里，保留之前状态
        this.setState({targetTypeData: this.props.targetTypeData}, () => {
            //  拿到首屏渲染数据
            this.getFirstData();
        });

        window.clickBack = () => {
            this.props.history.replace({pathname: '/evaluate'});
        };

        let startTime = this.props.startTime;
        let evaDate = moment(startTime).format('YYYY-MM-DD');
        let evaWeekDay = moment(startTime).format('ddd'); 
        this.setState({startTime, evaDate, evaWeekDay});
    }
    
    componentDidUpdate (prevProps, preState) {
        let pretargetTypeData = JSON.stringify(prevProps.targetTypeData);
        let nowpretargetTypeData = JSON.stringify(this.props.targetTypeData);
        
        if (prevProps.startTime !== this.props.startTime) {
            let startTime = this.props.startTime;
            let evaDate = moment(startTime).format('YYYY-MM-DD');
            let evaWeekDay = moment(startTime).format('ddd'); 
            this.setState({startTime, evaDate, evaWeekDay});
        }

        if (pretargetTypeData !== nowpretargetTypeData) {
            let targetTypeData = this.props.targetTypeData;
            this.setState({targetTypeData}, () => {
                this.getFirstData();
            });
        }

        if (prevProps.shareStandardData.id !== this.props.shareStandardData.id || prevProps.startTime !== this.props.startTime) {
            let {content, evaStdType, initScore, maxValue, minValue} = this.props.shareStandardData;
            if (this.props.batchObjectArray.length) {
                if (evaStdType === 2) {
                    this.props.batchObjectArray.forEach((item) => {
                        item.matterContent = content;
                        item.initScore = initScore;
                        item.scoreDesc = '';
                    });
                } else if (evaStdType === 1) {
                    this.props.batchObjectArray.forEach((item) => {
                        item.rankContent = content;
                        item.initScore = initScore;
                        item.max = maxValue;
                        item.min = minValue;
                    });
                } else if (evaStdType === 3) {// eslint-disable-line
                    this.props.batchObjectArray.forEach((item) => {
                        item.max = 100;
                        item.min = -100;
                        item.initScore = initScore;
                        item.scoreDesc = '';
                    });
                }
                this.getLastRecord().then((historyData) => {
                    this.updateBatchHistory(historyData);
                });
            }
        }
    }

    //  拿到一进到页面需要渲染的数据
    getFirstData = () => {
        let {schoolId, id, targetType} = this.state.targetTypeData;
        let typeId = id;
        
        // 请求宿舍或者班级picker的数据
        if (targetType === 2) {
            this.setState({pickerTitle: '班级', pickerCol: 2});
            let url = '/auth/global/evaluation/eva/app/getClazzEvaluate.htm';
            axios('get', url, {schoolId, typeId})
                .then((json) => {
                    if (json.success) {
                        if (json.data) {
                            this.handleClazzData(json.data);
                        }
                    }
                });
        } else if (targetType === constant.dormType) {
            this.setState({pickerTitle: '宿舍', pickerCol: 3});
            let url = '/auth/global/evaluation/eva/app/getDormsBySchoolId.htm';
            axios('get', url, {schoolId, typeId})
                .then((json) => {
                    if (json.success) {
                        if (json.data) {
                            this.handleDormsData(json.data);
                        }
                    } 
                });
        }
    }

    //  picker点击确定  宿舍管理和班级管理的历史记录
    pickerSure = (pickerValue) => {
        if (pickerValue.length <= 1) {
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '该年级下没有班级，请重新选择评价对象'}]);
        }

        const {targetType} = this.state.targetTypeData;
        if (targetType === 2) {
            this.handleClazzBatch(pickerValue);
        } else if (targetType === constant.dormType) {
            this.handleDormBatch(pickerValue);
        }
    }

    getScoreDesc = (score, content) => {
        let nowContent = content;
        nowContent = JSON.parse(content);
        for (let i = 0; i < nowContent.length; i ++) {
            let {lowScore, topScore} = nowContent[i];
            if (score >= lowScore && score <= topScore) {
                return nowContent[i].scoreDesc;
            } 
        }
        return nowContent[0].scoreDesc;
    }

    //  把选择的班级对象push到大的数组中
    handleClazzBatch = (pickerValue) => {
        let {batchObjectArray} = this.props;
        let gradeId = pickerValue[0];
        let clazzId = pickerValue[1];
        let hasIndex = batchObjectArray.findIndex((item) => {
            return item.clazzId === clazzId;
        });
        if (hasIndex !== -1) {
            return;
        } 
        const {pickerData} = this.state;
        let gradeIndex = pickerData.findIndex((item) => {
            return item.value === gradeId;
        }); 
        let gradeName = pickerData[gradeIndex].label;
        let clazzList = pickerData[gradeIndex].children;
        let clazzIndex = clazzList.findIndex((item) => {
            return item.value === clazzId;
        });
        let clazzName = clazzList[clazzIndex].label;
        
        let {shareStandardData} = this.props;
        let {initScore, evaStdType, content, maxValue, minValue} = shareStandardData;
        let obj = {clazzId, targetId: clazzId, clazzName, gradeId, gradeName, objectVal: clazzName, initScore};

        //  按事项评分
        if (evaStdType === 2) {
            obj.matterContent = content;
            obj.score = 0;      //  按事项评分，score字段代表此次用户操作所加减分数
        } else if (evaStdType === 1) {
            //  按等级评分
            obj.rankContent = content;
            obj.max = maxValue;
            obj.min = minValue;
        } else if (evaStdType === 3) {  // eslint-disable-line
            obj.max = 100;
            obj.min = -100;
        }

        //  请求该对象的历史数据
        this.getLastRecord(clazzId).then((historyData)=>{
            if (historyData.length) {
                obj = Object.assign(obj, {...historyData[0]});
                if (evaStdType === 1) {
                    let lastScore = historyData[0].lastScore;
                    let scoreDesc = this.getScoreDesc(lastScore, content);
                    obj.scoreDesc = historyData[0].lastScoreDesc || scoreDesc;
                }
            } else {
                if (evaStdType === 2) {
                    obj.lastScoreDesc = "";
                }
                obj.lastScore = initScore;
                if (evaStdType === 1) {
                    //  初始化按等级评分描述
                    let scoreDesc = this.getScoreDesc(obj.lastScore, content);
                    obj.scoreDesc = scoreDesc;
                }
            }
            if (evaStdType === 2) {
                obj.score = 0;
                obj.scoreDesc = '';
            } else {
                obj.score = obj.lastScore - obj.initScore;
            }
            this.props.updateBatchObjectArray([...batchObjectArray, obj]);
        });
    }

    //  把选择的宿舍对象push到大的数组中
    handleDormBatch = (pickerValue) => {
        let {batchObjectArray} = this.props;

        let louId = pickerValue[0];
        let cengId = pickerValue[1];
        let dormId = pickerValue[2];

        let hasIndex = batchObjectArray.findIndex((item) => {
            return item.dormId === dormId;
        });
        if (hasIndex > -1) {
            return;
        }
        const {pickerData} = this.state;
        const louIndex = pickerData.findIndex((item) => {
            return item.value === louId;
        });


        const cengData = pickerData[louIndex].children;
        const cengIndex = cengData.findIndex((item) => {
            return item.value === cengId;
        });

        const dormData = cengData[cengIndex].children;
        const dormIndex = dormData.findIndex((item) => {
            return item.value === dormId;
        });
        const louName = pickerData[louIndex].label.split('号楼')[0];
        const cengName = cengData[cengIndex].label.split('层')[0];
        const dormName = dormData[dormIndex].label.split('室')[0];
        const objectVal = `${louName}-${cengName}-${dormName}`;

        let {shareStandardData} = this.props;
        let {initScore, content, evaStdType, maxValue, minValue} = shareStandardData;
        
        let obj = {dormId, targetId: dormId, objectVal, initScore};

        //  按事项评分
        if (evaStdType === 2) {
            obj.matterContent = content;
            obj.score = 0;
        } else if (evaStdType === 1) {
            //  按等级评分
            obj.rankContent = content;
            obj.max = maxValue;
            obj.min = minValue;
        } else if (evaStdType === 3) {  // eslint-disable-line
            obj.max = 100;
            obj.min = -100;
        }
        
        //  请求该对象的历史数据
        this.getLastRecord(dormId).then((historyData)=>{
            let url = `/auth/global/evaluation/eva/app/getAssociatedClazzsForDorm.htm`;
            axios('get', url, {dormId}).then((json) => {
                if (json.success) {
                    if (historyData.length) {
                        let lastScore = historyData[0].lastScore;
                        obj = Object.assign(obj, {...historyData[0]});

                        if (evaStdType === 1) {
                            let scoreDesc = this.getScoreDesc(lastScore, content);
                            obj.scoreDesc = historyData[0].lastScoreDesc || scoreDesc;
                        }

                    } else {
                        if (evaStdType === 2) {
                            obj.lastScoreDesc = "";
                        }
                        obj.lastScore = initScore;
                    }
                    if (evaStdType === 1) {
                        //  初始化按等级评分描述
                        let scoreDesc = this.getScoreDesc(obj.lastScore, content);
                        obj.scoreDesc = scoreDesc;
                    } 
                    if (evaStdType === 2) {
                        obj.score = 0;
                        obj.scoreDesc = '';
                    } else {
                        obj.score = obj.lastScore - obj.initScore;
                    }
                    let actClazz = JSON.stringify(json.data);
                    obj.actClazz = actClazz;
                    this.props.updateBatchObjectArray([...batchObjectArray, obj]);
                }
            });
        });
    }

    //  根据对象id，请求上次评价记录
    getLastRecord = (targetId) => {
        const {evaDate} = this.state;
        let {shareStandardData, targetTypeData, batchObjectArray} = this.props;
        let itemId = shareStandardData.id;
        let url = '/auth/global/evaluation/eva/app/getLastRecord.htm';
        let {schoolId, targetType} = targetTypeData;
        
        let targetIds;
        if (targetId) {
            targetIds = targetId;
        } else {
            //  批量对象的id
            targetIds = [];
            batchObjectArray.forEach((item) => {
                targetIds.push(item.targetId);
            });
            targetIds = targetIds.join(',');
        }
        let params = {schoolId, evaDate, itemId, targetType, targetIds};
        return new Promise((resovle)=>{
            axios('get', url, params).then((json) => {
                if (json.success) {
                    resovle(json.data);
                } else {
                    resovle([]);
                }
            });
        });
    }

    //  日期/一级项目/评价项目 任一改变， 更新他们的历史记录,或者提交成功后，重新请求下当前数据
    updateBatchHistory = (batchHistoryData, initContent) => {
        //  选择了三个对象，改变日期，当天只有一个对象评价过，此时另外两个对象需要进行数据的初始化
        let {batchObjectArray} = this.props;
        for (let i = 0; i < batchObjectArray.length; i++) {
            let historyIndex = batchHistoryData.findIndex((historyItem) => {
                return batchObjectArray[i].targetId === historyItem.targetId;
            });
            let {content, evaStdType} = this.props.shareStandardData;
            if (historyIndex > -1) {
                //  历史评价过，进行赋值
                let historyItem = batchHistoryData[historyIndex];
                batchObjectArray[i] = Object.assign(batchObjectArray[i], {...historyItem});
                batchObjectArray[i].score = batchObjectArray[i].lastScore - batchObjectArray[i].initScore;
                if (evaStdType === 1) {
                    batchObjectArray[i].scoreDesc = this.getScoreDesc(batchObjectArray[i].lastScore, content);
                } 
                if (evaStdType === 2) {
                    batchObjectArray[i].scoreDesc = '';
                    batchObjectArray[i].score = 0;
                }
                if (initContent) {
                    if (evaStdType === 2) {
                        batchObjectArray[i].matterContent = content;
                    }
                }
            } else {
                //  历史未曾评价过，进行项目的初始化
                let {shareStandardData} = this.props;
                let {initScore} = shareStandardData;
                let initObj = {lastScore: initScore, score: 0, scoreDesc: '', lastScoreDesc: '', initScore: initScore, remarkText: '', remarkPicture: '', remarkVideo: null, lastModifyName: '', lastModifyOn: ''};
                batchObjectArray[i] = Object.assign(batchObjectArray[i], {...initObj});   
                if (evaStdType === 1) {
                    batchObjectArray[i].scoreDesc = this.getScoreDesc(batchObjectArray[i].lastScore, content);
                }
            }
        }
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    //  处理班级数据
    handleClazzData = (clazzData) => {
        let newArr = [];
        for (let i = 0; i < clazzData.length; i++) {
            newArr[i] = {
                label: clazzData[i].gradeName,
                value: clazzData[i].gradeId,
                children: []
            };
            let clazzInfo = clazzData[i].clazzInfo;
            if (clazzInfo.length) {
                for (let j = 0; j < clazzInfo.length; j ++) {
                    newArr[i].children.push({label: clazzInfo[j].clazzName, value: clazzInfo[j].clazzId});
                }
            }
        }
        this.setState({pickerData: newArr});
    }

    //  处理宿舍的数据
    handleDormsData = (dormsData) => {
        let dormsDataStr = JSON.stringify(dormsData);
        //  id-->value   name-->label
        let dormsDataStrVal = dormsDataStr.replace(new RegExp(/id/g), "value");
        let dormsDataStrLabel = dormsDataStrVal.replace(new RegExp(/name/g), "label");
        let pickerData = JSON.parse(dormsDataStrLabel);
        this.setState({pickerData});
    }
    
    //  提交评价条件校验
    saveReportVerify = () => {
        window.LeKeBridge.sendMessage2Native("toast", "提交"); 
        if (!this.canSubmit) {
            return;
        }
        const {targetTypeData, evaDate} = this.state;
        const {shareStandardData, batchObjectArray} = this.props;
      
        const itemId = shareStandardData.id; 
        const {targetType, schoolId, id} = targetTypeData;  
        
        if (targetType === 3) {
            //  宿舍未曾关联班级，不让提交
            let hasNoClazz = batchObjectArray.findIndex((item) => {
                return item.actClazz === '[]';
            });
            if (hasNoClazz > -1) {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '没有关联班级，请先设置关联班级'}]);
                return;
            }
        }
        const {evaStdType} = shareStandardData;
        let content = JSON.stringify(batchObjectArray);
        
        let params = {targetType, itemId, schoolId, evaStdType, evaDate, content, typeId: id};
        this.saveReportAjax(params);
    }

    //  提交请求
    saveReportAjax = (params) => {
        let url = '/auth/global/evaluation/eva/app/saveRecord.htm';
        this.canSubmit = false;
        axios('post', url, {...params}, 'form')
            .then((res) => {
                if (res.success) {
                    this.canSubmit = true;
                    this.setState({showSubmitSuccessModal: true});
                    this.getLastRecord().then((historyData) => {
                        let initContent = true;
                        this.updateBatchHistory(historyData, initContent);
                    });
                } else {
                    this.canSubmit = true;
                    // window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': res.message}]);
                }
            });
    }

    handleEvaDate = () => {
        const {showCalendar, evaDate} = this.state;
        this.setState({showCalendar: !showCalendar}, () => {
            let curDate = Number(evaDate.split('-')[2]);
            if (curDate > 13) { // eslint-disable-line
                let a = document.getElementsByClassName("single-month")[1];
                a.scrollIntoView();
            }
        });
    }

    confirmDate = (startTime) => {
        let evaDate = moment(startTime).format('YYYY-MM-DD');
        let evaWeekDay = moment(startTime).format('ddd');
        this.props.updateStartTime(startTime);
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({showCalendar: false, evaDate, evaWeekDay, startTime});
    }

    hideCalendar = () => {
        this.setState({showCalendar: false});
    }

    //  返回主页
    gobackHome = () => {
        this.props.history.replace({pathname: '/evaluate'});
        this.setState({showSubmitSuccessModal: false});
    }

    //  继续评价
    continueEvaluate = () => {
        this.setState({showSubmitSuccessModal: false});
    }

    render() { 
        const {pickerData, pickerValue,
            pickerTitle, pickerCol, targetTypeData, pickerExtra, 
            evaDate, evaWeekDay, showCalendar, startTime, showSubmitSuccessModal} = this.state;
        const {batchObjectArray} = this.props;
        const {targetType} = targetTypeData;
        return (
            <div className={`${styles.publishContainer} publishContainer`}>
                <div className={styles.publishWrap}>
                    {/* 评价日期 */}
                    <div className={styles.evaDate} onClick={this.handleEvaDate}>
                        <span className={styles.evaDateTitle}>评价日期</span>
                        <span className={styles.to_select}>
                            <span className={styles.pleaseChoose}>
                                <span>{evaDate}</span> {evaWeekDay}
                                <i className="evaiconfont">&#xe684;</i>
                            </span>
                        </span>
                    </div>
                    {/* 2628000000  一个月 */}
                    <Calendar
                        type={'one'}
                        visible={showCalendar}
                        defaultValue={[startTime]}
                        defaultDate={new Date(new Date().getTime() -  2628000000)} // eslint-disable-line
                        infiniteOpt={true}
                        maxDate={new Date()}
                        onSelect = {(date) => {
                            this.confirmDate(date);
                        }}
                        renderHeader={() => <p className={styles.calendarHeader}>
                            <span className={styles.title}>日期选择</span>
                            <span className={styles.hide} onClick={this.hideCalendar}><i className="evaiconfont">&#xe6ea;</i></span>
                        </p>}
                    />

                    {/* 评价方案、 */}
                    <p className={styles.commonWrap}>
                        <span className={styles.title}>评价方案</span>
                        <span className={styles.val}>{targetTypeData.name}</span>
                    </p>
                
                    {/* 一级评价项目 */}
                    <FirstItem />

                    {/* 行为管理(二级三级项目) */}
                    <Behavior />
                    
                    {/* 评价对象 */}
                    <div className={`${styles.objection__wrap} pickerWrap`}>
                        {targetType === 1 ? 
                            <StudentObject evaDate={evaDate}/> : 
                            <div>
                                <Picker
                                    data={pickerData}
                                    title={pickerTitle}
                                    extra={pickerExtra}
                                    value={pickerValue}
                                    onOk = { (v) => {
                                        this.pickerSure(v);
                                    }}
                                    format = {() => {
                                        return '添加';
                                    }}
                                    cols={pickerCol}
                                >
                                    <List.Item arrow="horizontal">评价对象</List.Item>
                                </Picker>
                            </div>
                        }
                    </div>
                    {batchObjectArray.length ? <BatchObject history={this.props.history}/> : ''}
                
                    {batchObjectArray.length ? 
                        <p className={`${styles.handle__submit} ${styles.handle__submit_enable}`} onClick={this.saveReportVerify}>提交</p> : 
                        <p className={`${styles.handle__submit} ${styles.handle__submit_disabled}`}>
                       提交
                        </p>}
                    <Modal visible={showSubmitSuccessModal}
                        wrapClassName={'successModalWrap'}
                        transparent
                        maskClosable={false}
                        footer={[
                            {text: '返回主页', onPress: () => {
                                this.gobackHome();
                            }},
                            {text: '继续评价', onPress: () => {
                                this.continueEvaluate();
                            }}
                        ]}
                    >
                        <p className={styles.submitText}>提交成功！</p>
                    </Modal>
                    <div className={styles.bgcolor}></div>
                </div>
            </div>
        );
    }
}

const StudentObject = ({evaDate}) => {
    let str = () => {
        return (
            <span className={styles.pleaseChoose}>添加<i className="evaiconfont">&#xe684;</i></span>
        );
    };
    return (
        <Link to={{pathname: '/evaluate/objection', query: {evaDate: evaDate}}}>
            <p className={`fc ${styles.select_objection}`}>
                <span className={styles.select_objection_title}>评价对象</span>
                <span className={styles.to_select}>
                    {str()}
                </span>
            </p>
        </Link>
    );
};

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
        targetTypeData: state.targetTypeData,
        shareStandardData: state.shareStandardData,
        batchObjectArray: state.batchObjectArray,
        startTime: state.startTime
    }),
    {updateBatchObjectArray, updateStartTime}
)(Publish);

