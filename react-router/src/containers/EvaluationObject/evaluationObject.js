import React, {Component} from "react";
// import styles from "./evaluationObject.scss";
// import axios from '../../utils/axiosApi';
// import BlankImg from '../../components/BlankImg';
import {connect} from 'react-redux';
// import {List, Picker} from 'antd-mobile';
import {updateBatchObjectArray} from '../../store/actions';
// import initReactFastclick from 'react-fastclick';
// import LoadingComponent from '../../components/Loading';

const throteTime = 30;
class EvaluationObject extends Component {
    constructor(props) {
        super(props)
        this.state =  {
            value: '',       //  用户输入的搜索内容
            isClearIconShow: false,         //  取消按钮是否显示
            searchPanelShow: false,           //   搜索面板是否显示
            currentRadioChosenObject: {}, // 当前选中的对象的基本信息
            checkedStudent: [],     //  用户选中的学生数组
            curPage: 1,     // 页码（默认初始化为1）
            pageSize: 20,
            totalPage: 0,   // 总页码
            allStsData: [],
            initPage: true,
            allowHttp: true,    //  当上拉加载操作过快的时候，会导致数据重复问题解决
            pickerData: [],
            pickerValue: [],
            pickerTitle: "班级",
            blankText: "查询无结果",
            isLoading: false, //  页面正在加载中的标识  页面初次进来，不会默认请求数据
            showSureBtn: true,   //  解决键盘弹起的时候，底部按钮会被顶上去的问题，当键盘弹起，按钮隐藏
        }
    }
    // state = {
    //     value: '',       //  用户输入的搜索内容
    //     isClearIconShow: false,         //  取消按钮是否显示
    //     searchPanelShow: false,           //   搜索面板是否显示
    //     currentRadioChosenObject: {}, // 当前选中的对象的基本信息
    //     checkedStudent: [],     //  用户选中的学生数组
    //     curPage: 1,     // 页码（默认初始化为1）
    //     pageSize: 20,
    //     totalPage: 0,   // 总页码
    //     allStsData: [],
    //     initPage: true,
    //     allowHttp: true,    //  当上拉加载操作过快的时候，会导致数据重复问题解决
    //     pickerData: [],
    //     pickerValue: [],
    //     pickerTitle: "班级",
    //     blankText: "查询无结果",
    //     isLoading: false, //  页面正在加载中的标识  页面初次进来，不会默认请求数据
    //     showSureBtn: true,   //  解决键盘弹起的时候，底部按钮会被顶上去的问题，当键盘弹起，按钮隐藏
    // };
    //
    // componentDidMount() {
    //     this.isAndroidFn();
    //     initReactFastclick();
    //     if (this.isAndroid) {
    //         this.listenKeyBoard();
    //     }
    //     document.addEventListener('deviceready', function() {
    //         // window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'show1Title', ['选择评价对象']);
    //         window.LeTalkCorePlugin.customBack('custom');
    //     }, false);
    //
    //     window.clickBack = () => {
    //         this.props.history.replace({pathname: '/evaluate/publish'});
    //     };
    //
    //     this.getClazzData();
    //     let {batchObjectArray} = this.props;
    //     if (batchObjectArray.length) {
    //         let checkedStudent = [];
    //         batchObjectArray.forEach((item) => {
    //             checkedStudent.push(item);
    //         });
    //         this.setState({checkedStudent});
    //     }
    //
    // }
    //
    // //  判断是否是安卓手机
    // isAndroidFn = () => {
    //     let UA = navigator.userAgent;
    //     let isAndroid = /android|adr/gi.test(UA), isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid;
    //     if (isIos) {
    //         this.isAndroid = false;
    //     } else {
    //         this.isAndroid = true;
    //     }
    // }
    //
    // listenKeyBoard = () => {
    //     //获取原窗口的高度
    //     var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //
    //     window.onresize = () => {
    //         var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //         if (resizeHeight - 0 < originalHeight - 0){
    //             //当软键盘弹起，在此处操作
    //             this.setState({showSureBtn: false});
    //         } else {
    //             //当软键盘收起，在此处操作
    //             this.setState({showSureBtn: true});
    //         }
    //     };
    // }
    //
    //
    // //  拿到班级和年级数据
    // getClazzData = () => {
    //     let url = '/auth/global/evaluation/eva/app/getClazzEvaluate.htm';
    //     let {id} = this.props.targetTypeData;
    //     let typeId = id;
    //
    //     let schoolId = sessionStorage.getItem('schoolId');
    //
    //     axios('get', url, {schoolId, typeId})
    //         .then((json) => {
    //             if (json.success) {
    //                 if (json.data) {
    //                     this.handleClazzData(json.data);
    //                 }
    //             }
    //         });
    // }
    //
    // //  处理班级年级数据
    // handleClazzData = (data) => {
    //     let gradeAndClazzStr = JSON.stringify(data);
    //     let gradeDataValStr = gradeAndClazzStr.replace(new RegExp(/gradeId/g), "value");
    //     let gradeDataLabelStr = gradeDataValStr.replace(new RegExp(/gradeName/g), "label");
    //     let clazzData = gradeDataLabelStr.replace(new RegExp(/clazzInfo/g), "children");
    //     let clazzDataValStr = clazzData.replace(new RegExp(/clazzId/g), "value");
    //     let clazzDataLabelStr = clazzDataValStr.replace(new RegExp(/clazzName/g), "label");
    //     let pickerData = JSON.parse(clazzDataLabelStr);
    //     let all = {label: "全部", value: 'allGrades', children: [{label: "全部", value: "allClazz"}]};
    //     pickerData.push(all);
    //     this.setState({pickerData});
    // }
    //
    // //  选择班级
    // pickerSure = (pickerValue) => {
    //     if (pickerValue[1] !== 'allClazz') {
    //         this.setState({blankText: '当前班级查询无结果'});
    //     } else {
    //         this.setState({blankText: '查询无结果'});
    //     }
    //
    //     this.setState({pickerValue, allStsData: [], isLoading: true}, () => {
    //         this.getData();
    //     });
    // }
    //
    // throttle = (method, time) => {
    //     let cd = false;
    //     return function () {
    //         if (cd) {
    //             return;
    //         }
    //         let ctx = this;
    //         let args = arguments;
    //
    //         method.apply(ctx, args);
    //         cd = true;
    //         setTimeout( () => {
    //             cd = false;
    //         }, time);
    //     };
    // }
    //
    // //上拉到容器底部加载更多数据
    // handleScroll=()=>{
    //     let searchResultWrapper = document.getElementById("searchResultWrapper");
    //     let scrollTop = searchResultWrapper.scrollTop;
    //     //clientHeight可视区的高度
    //     let clientHeight = searchResultWrapper.clientHeight;
    //
    //     //变量scrollHeight是滚动条的总高度
    //     let scrollHeight = searchResultWrapper.scrollHeight;
    //
    //     let bottomHeight = 100;
    //     //滚动条到底部的条件
    //     if (scrollTop + clientHeight + bottomHeight >= scrollHeight && this.state.allowHttp){
    //         this.setState({
    //             allowHttp: false
    //         });
    //         const {curPage, totalPage} = this.state;
    //         if (curPage !== totalPage) {
    //             this.getData(curPage + 1);
    //         }
    //     }
    // }
    //
    // throttleScorll = this.throttle(this.handleScroll, throteTime)
    //
    // goSearch = () => {
    //     //  取消Input焦点
    //     this.setState({allStsData: []}, () => {
    //         this.setState({searchPanelShow: false});
    //     });
    //     document.getElementById('inputId').blur();
    //     // 在此处进行接口请求，获得符合条件的消息列表
    //     this.setState({isLoading: true}, () => {
    //         this.getData();
    //     });
    // };
    //
    // //  请求列表数据
    // getData = (paramCurPage) => {
    //     let curPage = paramCurPage ? paramCurPage : 1;
    //     let {pageSize, pickerValue} = this.state;
    //     let schoolId = sessionStorage.getItem('schoolId');
    //     let {id} = this.props.targetTypeData;
    //     let typeId = id;
    //
    //     let clazzId = "";
    //     let gradeId = "";
    //     if (pickerValue.length && pickerValue[1] !== 'allClazz') {
    //         clazzId = pickerValue[1];
    //     }
    //     if (pickerValue.length) {
    //         if (pickerValue[0] !== 'allGrades') {
    //             gradeId = pickerValue[0];
    //         }
    //         if (pickerValue[1] !== 'allClazz') {
    //             clazzId = pickerValue[1];
    //         }
    //     }
    //
    //     axios('get', '/auth/global/evaluation/eva/app/getStudentEvaluate.htm', {
    //         content: this.state.value,
    //         schoolId: schoolId,
    //         curPage: curPage,
    //         pageSize: pageSize,
    //         typeId,
    //         gradeId,
    //         clazzId
    //     })
    //         .then((json) => {
    //             if (json.success) {
    //                 this.setState({
    //                     allowHttp: true,
    //                     isLoading: false
    //                 });
    //                 if (json.data == null){
    //                     this.setState({allStsData: [], initPage: false});
    //                 } else {
    //                     let {allStsData, checkedStudent} = this.state;
    //                     let nowData = json.data.dataList;
    //                     nowData.forEach((item) => {
    //                         let hasIndex = checkedStudent.findIndex((curBatch) => {
    //                             return item.studentId === curBatch.studentId;
    //                         });
    //                         if (hasIndex > -1) {
    //                             item.isChecked = true;
    //                         } else {
    //                             item.isChecked = false;
    //                         }
    //                     });
    //
    //                     let newAllStsData = allStsData.concat(nowData);
    //                     newAllStsData.length && this.setState(
    //                         {
    //                             curPage: json.data.curPage,
    //                             totalPage: json.data.totalPage,
    //                             allStsData: newAllStsData,
    //                             initPage: false
    //                         },
    //                         () => {
    //                             //  数据请求成功后，回到顶部
    //                             if (this.state.allStsData.length && json.data.curPage === 1) {
    //                                 let searchResultWrapper = document.getElementById("searchResultWrapper");
    //                                 searchResultWrapper.scrollTop = 0;
    //                             }
    //                         }
    //                     );
    //                 }
    //             }
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }
    //
    // inputChange = (e) => {
    //     let value = e.target.value;
    //     value = value.replace(/\s*/g, '');
    //     if (value) {
    //         this.setState({isClearIconShow: true, searchPanelShow: true});
    //     } else {
    //         this.setState({isClearIconShow: false, searchPanelShow: false});
    //     }
    //     this.setState({value}, () => {
    //         if (!value) {
    //             this.setState({isLoading: true}, () => {
    //                 this.getData();
    //             });
    //         }
    //     });
    // }
    //
    // //  搜索框失去焦点
    // inputBlur = () => {
    //     if (!this.isAndroid) {
    //         this.setState({showSureBtn: true});
    //     }
    //     this.setState({isClearIconShow: false});
    // }
    //
    // //  搜索框聚焦
    // inputFocus = () => {
    //     if (!this.isAndroid) {
    //         this.setState({showSureBtn: false});
    //     }
    //     if (this.state.value) {
    //         this.setState({isClearIconShow: true});
    //     }
    // }
    //
    // // 点击“关闭”图标，清除输入框内容和搜索关键词面板内容
    // clear = () => {
    //     this.setState({value: '', searchPanelShow: false, isClearIconShow: false, isLoading: true}, () => {
    //         this.getData();
    //     });
    // };
    //
    // //  操作学生对象选中与否
    // handleStudent = (index) =>{
    //     let {allStsData, checkedStudent} = this.state;
    //     let isChecked = allStsData[index].isChecked;
    //
    //     allStsData[index].isChecked = !isChecked;
    //     //  剔除数据
    //     if (isChecked) {
    //         let delId = allStsData[index].studentId;
    //         let delIndex = checkedStudent.findIndex((item) => {
    //             return item.studentId === delId;
    //         });
    //         checkedStudent.splice(delIndex, 1);
    //     } else {
    //         //  添加数据
    //         checkedStudent.push(allStsData[index]);
    //     }
    //     this.setState({allStsData, checkedStudent});
    // }
    //
    // //  点击确定按钮
    // choseConfirm = () => {
    //     // 这就是要传给发布评价页面的学生对象信息
    //     this.props.history.replace({pathname: '/evaluate/publish'});
    //
    //     let {checkedStudent} = this.state;
    //     let targetIds = [];
    //     checkedStudent.forEach((item) => {
    //         item.targetId = item.studentId;
    //         targetIds.push(item.studentId);
    //     });
    //     targetIds = targetIds.join(',');
    //
    //     let {shareStandardData} = this.props;
    //     let {initScore, content, evaStdType, maxValue, minValue} = shareStandardData;
    //
    //     //  按事项评分
    //     if (evaStdType === 2) {
    //         checkedStudent.forEach((item) => {
    //             item.matterContent = content;
    //             item.initScore = initScore;
    //             item.lastScore = initScore;
    //             item.score = 0;
    //             item.scoreDesc = '';
    //         });
    //     } else if (evaStdType === 1) {
    //         checkedStudent.forEach((item) => {
    //             item.rankContent = content;
    //             item.initScore = initScore;
    //             item.lastScore = initScore;
    //             item.max = maxValue;
    //             item.min = minValue;
    //             item.score = 0;
    //             let scoreDesc = this.getScoreDesc(item.lastScore, content);
    //             item.scoreDesc = scoreDesc;
    //         });
    //     } else if (evaStdType === 3) {
    //         checkedStudent.forEach((item) => {
    //             item.max = 100;
    //             item.min = -100;
    //             item.initScore = initScore;
    //             item.lastScore = initScore;
    //             item.score = 0;
    //         });
    //     }
    //
    //     this.getLastRecord(targetIds).then((historyData) => {
    //         if (historyData.length) {
    //             historyData.forEach((item) => {
    //                 for (let i = 0; i < checkedStudent.length; i++) {
    //                     if (checkedStudent[i].studentId === item.targetId) {
    //                         checkedStudent[i] = Object.assign(
    //                             checkedStudent[i],
    //                             {...item}
    //                         );
    //                         if (evaStdType === 1) {
    //                             let scoreDesc = this.getScoreDesc(checkedStudent[i].lastScore, content);
    //                             checkedStudent[i].scoreDesc = scoreDesc;
    //                         }
    //
    //                         if (evaStdType === 2) {
    //                             checkedStudent[i].score = 0;
    //                             checkedStudent[i].scoreDesc = '';
    //                         } else {
    //                             checkedStudent[i].score = item.lastScore - checkedStudent[i].initScore;
    //                         }
    //                         break;
    //                     }
    //                 }
    //             });
    //             this.props.updateBatchObjectArray(checkedStudent);
    //         } else {
    //             this.props.updateBatchObjectArray(checkedStudent);
    //         }
    //     });
    // }
    //
    // getScoreDesc = (score, content) => {
    //     let nowContent = content;
    //     nowContent = JSON.parse(content);
    //     for (let i = 0; i < nowContent.length; i ++) {
    //         let {lowScore, topScore} = nowContent[i];
    //         if (score >= lowScore && score <= topScore) {
    //             return nowContent[i].scoreDesc;
    //         }
    //     }
    //     return nowContent[0].scoreDesc;
    // }
    //
    // //  更新上次记录
    // getLastRecord = (targetIds) => {
    //     let url = '/auth/global/evaluation/eva/app/getLastRecord.htm';
    //     let {shareStandardData, targetTypeData} = this.props;
    //     let evaDate = this.props.location.query.evaDate;
    //     let {targetType} = targetTypeData;
    //     let itemId = shareStandardData.id;
    //     let schoolId = sessionStorage.getItem('schoolId');
    //
    //     return new Promise((resolve) => {
    //         axios('get', url, {itemId, targetType, targetIds, schoolId, evaDate})
    //             .then((json) => {
    //                 if (json.success) {
    //                     resolve(json.data);
    //                 } else {
    //                     resolve([]);
    //                 }
    //             });
    //     });
    // }
    //
    // render() {
    //     const {allStsData, pickerData, pickerValue, curPage, totalPage, value, initPage, blankText, pickerExtra,
    //         checkedStudent, isLoading, isClearIconShow, searchPanelShow, showSureBtn} = this.state;
    //
    //     // 搜索按钮控件
    //     const searchCon = searchPanelShow ?
    //         <div className={styles.keyBoxStyleWrapper}>
    //             <div onClick={this.goSearch} className={styles.keyBoxStyle}>搜索：<span className={styles.keywords}>{this.state.value}</span></div>
    //         </div>
    //         : "";
    //
    //     // 取消按钮控件
    //     const cancelBtn = isClearIconShow ?
    //         <span onClick={this.clear} className="clearIcon"><i className="evaiconfont" >&#xe81d;</i></span>
    //         : "";
    //
    //     //下拉加载
    //     const dropLoading =
    //         <div className={styles.loading}>
    //             {
    //                 curPage !== totalPage ?
    //                     <span className={styles.loadMore}>
    //                         <img className={styles.loadingImg} src="https://static.leke.cn/images/common/loader.gif"/>
    //                         <span className={ styles.loadMoreText}>加载更多...</span>
    //                     </span> : <p>没有更多了</p>
    //             }
    //         </div>;
    //
    //     // 初次查询结果面板(list有值)
    //     const searchResult = allStsData.length ?
    //         <div id="searchResultWrapper" onScroll={this.throttleScorll}
    //             className={`${styles.searchResultWrapper} ${value ? '' : styles.searchResultWrapperTop}`}>
    //             <div className={styles.searchResultScroll}>
    //                 {
    //                     allStsData.map((item, index) => {
    //                         return (
    //                             <div className={styles.primeResultItemWrapper} key={index}
    //                                 onClick={() => {
    //                                     this.handleStudent(index);
    //                                 }}>
    //                                 {/* checkbox*/}
    //                                 {item.isChecked ? <i className={`evaiconfont ${styles.checked}`}>&#xe670;</i> : <i className="evaiconfont">&#xe753;</i>}
    //                                 <div className={`${styles.infoContainer}`}>
    //                                     <div className={styles.leftInfo}>
    //                                         <span className={`${styles.names} f-ellipsis`}>{item.studentName}</span>
    //                                         <span className={`${styles.stuNo} f-ellipsis`}>{item.studentNo}</span>
    //                                         <span className={`${styles.clazzNames} f-ellipsis`}>{item.clazzName}</span>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         );
    //                     })
    //                 }
    //             </div>
    //             {dropLoading}
    //         </div>
    //         : <div className={`${styles.blankWrap} ${value ? '' : styles.searchResultWrapperTop}`}><BlankImg content={blankText}/></div>;
    //
    //     const searchBtn =
    //         <div className={styles.btnFixed}>
    //             {
    //                 checkedStudent.length ?
    //                     <div className={ styles.confirmBtnActive}
    //                         onClick={this.choseConfirm}>确定</div> :
    //                     <div className={styles.confirmBtn}>确定</div>
    //             }
    //         </div>;
    //     return (
    //         <div>
    //             <div className={`${styles.studenObjtWrap} ${showSureBtn ? '' : styles.hideSureBtnClass}`}>
    //                 <div className={styles.searchTopWrapper}>
    //                     <div className={styles.inputBigWrap}>
    //                         <div className={styles.inputWrapper}>
    //                             <i className="evaiconfont searchIcon">&#xe735;</i>
    //                             <input type="text" className={styles.inputStyle}
    //                                 placeholder="请输入学生姓名或学号"
    //                                 onChange={this.inputChange.bind(this)}
    //                                 onBlur={this.inputBlur}
    //                                 autoFocus={searchPanelShow}
    //                                 onFocus={this.inputFocus}
    //                                 value={value}
    //                                 id="inputId"
    //                             />
    //                             {cancelBtn}
    //                         </div>
    //                     </div>
    //                     <div className={`${styles.selectClazz} selectClazz`}>
    //                         <Picker
    //                             data={pickerData}
    //                             title="班级"
    //                             extra={pickerExtra}
    //                             value={pickerValue}
    //                             format={(labels) => {
    //                                 if (labels[0] === '全部') {
    //                                     return '请选择';
    //                                 }
    //                                 return labels.join(',');
    //                             }}
    //                             onOk = { (v) => {
    //                                 this.pickerSure(v);
    //                             }}
    //                             cols={2}
    //                         >
    //                             <List.Item arrow="horizontal">选择班级</List.Item>
    //                         </Picker>
    //                     </div>
    //                     {value ? <div className={styles.resultTitle}>查询结果</div> : ""}
    //                     {searchCon }
    //                 </div>
    //                 {initPage ? "" : !isLoading && searchResult}
    //                 {allStsData.length && showSureBtn ? searchBtn : ""}
    //                 {isLoading && <LoadingComponent />}
    //             </div>
    //             <div className={styles.bg__shade}></div>
    //         </div>
    //     );
    // }
} 

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
        targetTypeData: state.targetTypeData,
        // firstItem: state.firstItem, 
        shareStandardData: state.shareStandardData,
        batchObjectArray: state.batchObjectArray
    }),
    {updateBatchObjectArray}
)(EvaluationObject);

