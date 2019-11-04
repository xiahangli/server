import React from 'react';
import {PullToRefresh} from 'antd-mobile';
import BlankImg from '../../../components/BlankImg';
import axios from '../../../utils/axiosApi';
import AuditList from '../AuditList/auditList';
import styles from './toAudit.scss';
import loadingImg from '../../../assets/images/loading.gif';
import shadeImg from '../../../assets/images/shade.png';
import LoadingComponent from '../../../components/Loading';

import TopQueryParams from '../TopQueryParams/topQueryParams';
import EvaluationDetail from '../../EvaluationDetail/evaluationDetail';
export default class ToAudit extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            auditList: [],
            pageSize: 20,
            curPage: 1,
            allowHttp: false,
            totalPage: 0,
            showDetailPage: false,   //  保持列表状态不变，显示详情页面
            detailInfo: {},
            down: true,
            isShowLoadingComponent: true,
            typeSearchVal: [],
            typeList: [],   //  全部方案数据
            
            gradeAndClazzVal: [],
            gradeAndClazzList: [],  //  全部班级数据
            
            evaluatorVal: [null],
            evaluatorList: [],  //  全部评价人员数据
        };
    }
    
    componentDidMount () {
        this.handleCordova();
        this.getAuditList(1, true, true);
    }

    //  调用cordova处理标题和菜单
    handleCordova = () => {
        document.addEventListener('deviceready', () => {
            // window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'show1Title', ['待我审核']);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                {
                    groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                    groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                    id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                    order: 0, //二级子菜单（下拉菜单）显示顺序
                    count: 0, //未读数量显示
                    icon: "", //按钮图片
                    title: '审核记录' //按钮标题
                }
            ]]);

            if (this.props && this.props.location.query && this.props.location.query.isGohome) {
                window.LeTalkCorePlugin.customBack('custom');
            } else {
                window.LeTalkCorePlugin.customBack('');
            }
    
            window.clickMenu = () => {
                this.props.history.push({pathname: '/auditLogging'});
            };

            window.clickBack = () => {
                if (this.state.showDetailPage) {
                    window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['待我审核']);
                    window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                        {
                            groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                            groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                            id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                            order: 0, //二级子菜单（下拉菜单）显示顺序
                            count: 0, //未读数量显示
                            icon: "", //按钮图片
                            title: '审核记录' //按钮标题
                        }
                    ]]);
                    this.setState({showDetailPage: false});
                } else {
                    window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
                    window.LeTalkCorePlugin.customBack('');
                    this.props.history.replace({pathname: '/'});
                }
            };
        }, false); 
    }

    //  拿到未审核列表数据
    getAuditList = (curPage, isShowLoadingComponent, isScrollTop, updateCurPageData) => {
        this.setState({isShowLoadingComponent: isShowLoadingComponent}, () => {
            let {pageSize, typeSearchVal, gradeAndClazzVal, evaluatorVal} = this.state;
            let typeId = typeSearchVal[0];
            let itemId = typeSearchVal[1];
            let gradeId = gradeAndClazzVal[0];
            let clazzId = gradeAndClazzVal[1];
            let evaluatorId = evaluatorVal[0];
            let url = '/auth/global/evaluation/eva/app/getAuditRecords.htm';
            axios('get', url, {auditStatus: 1, curPage, pageSize, typeId, itemId, gradeId, clazzId, evaluatorId}).then((json) => {
                if (json.success) {
                    let auditListBefore = this.state.auditList;
                    if (curPage === 1) {
                        auditListBefore = [];
                    }
                    let auditList;
                    let nowData = json.data.dataList || [];
                    if (isScrollTop) {
                        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
                        if (auditListWrap) {
                            auditListWrap.scrollTop = 0;
                        }
                    }
                    if (updateCurPageData) {
                        if (curPage === 1) {
                            auditList = nowData;
                        } else {
                            auditList = this.mendLastRecord(auditListBefore, nowData);
                        }
                    } else {
                        auditList = auditListBefore.concat(nowData);
                    }
                    this.setState({auditList, allowHttp: true, totalPage: json.data.totalPage,
                        curPage: json.data.curPage}, () => {
                        if (isShowLoadingComponent) {
                            this.setState({isShowLoadingComponent: false});
                        }
                    });
                } 
            });
        });
    }
    
    //  滚动事件
    handleScroll = () => {                                                         
        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
        
        let scrollTop = auditListWrap.scrollTop;
        // //clientHeight可视区的高度 
        let clientHeight = auditListWrap.clientHeight;

        //变量scrollHeight是滚动条的总高度
        let scrollHeight = auditListWrap.scrollHeight;
       
        let bottomHeight = 100;

        //  上拉加载
        if (scrollTop + clientHeight + bottomHeight >= scrollHeight && this.state.allowHttp){
            this.setState({
                allowHttp: false
            });
            const {curPage, totalPage} = this.state;
            if (curPage !== totalPage) {
                this.getAuditList(curPage + 1, false, false);
            }
        }
    }
   
    //  修补最后一项纪录
    mendLastRecord = (auditListBefore, nowData) => {
        nowData.forEach((item) => {
            let id = item.id;
            let hasIndex = auditListBefore.findIndex((item1) => {
                return item1.id === id;
            });
            if (hasIndex <= -1) {
                auditListBefore.push(item);
            }
        });
        return auditListBefore;
    }

    //  得到详细信息
    getDetailInfo = (detailInfo) => {
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['']);
        window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
        this.setState({detailInfo});
        this.setState({showDetailPage: true});
    }

    //  隐藏详情页面
    hideDetailPage = () => {
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['待我审核']);
        window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
            {
                groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                order: 0, //二级子菜单（下拉菜单）显示顺序
                count: 0, //未读数量显示
                icon: "", //按钮图片
                title: '审核记录' //按钮标题
            }
        ]]);

        let {detailInfo, curPage, auditList} = this.state;
        let {recordId} = detailInfo;
        let curIndex = auditList.findIndex((item) => {
            return item.id === recordId;
        }); 
        auditList.splice(curIndex, 1);
        this.setState({auditList, showDetailPage: false});
        this.getAuditList(curPage, false, true, true);
    }

    refreshList = () => {
        this.getAuditList(1, false, true);
    }

    //  拿到评价方案的值，请求列表数据
    getTypeSearchVal = (val) => {
        this.setState({typeSearchVal: val}, () => {
            this.changeParamGetList();
        });
    }

    //  拿到年级班级的值，请求列表数据
    getGradeAndClazzVal = (val) => {
        this.setState({gradeAndClazzVal: val}, () => {
            this.changeParamGetList();
        });
    }

    //  拿到评价人员值，请求列表数据
    getEvaluatorVal = (val) => {
        this.setState({evaluatorVal: val}, () => {
            this.changeParamGetList();
        });
    }

    //  改变参数请求列表数据
    changeParamGetList = () => {
        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
        if (auditListWrap) {
            auditListWrap.style.overflow = 'scroll';
        }
        this.getAuditList(1, false, true);
    }

    render() {
        const {auditList, curPage, totalPage, showDetailPage, detailInfo, isShowLoadingComponent} = this.state;

        //下拉加载
        const dropLoading = 
            <div className={styles.loading}>
                {
                    curPage !== totalPage ? 
                        <span className={styles.loadMore}>
                            <img className={styles.loadingImg} src={loadingImg}/>
                            <span className={ styles.loadMoreText}>加载更多...</span>
                        </span> : <p>没有更多了</p>
                }
            </div>;
        
        const releaseNode = <p className={styles.refresh}><span className={styles.loadMore}>
            <img className={styles.loadingImg} src={loadingImg}/>
            <span className={ styles.loadMoreText}>正在刷新</span>
        </span></p>;

        return (
            <div>
                <TopQueryParams type="toAudit" 
                    getTypeSearchVal={this.getTypeSearchVal}
                    getGradeAndClazzVal={this.getGradeAndClazzVal}
                    getEvaluatorVal={this.getEvaluatorVal}
                />
                
                <div className={styles.shadeImg}>
                    <img src={shadeImg}/>
                </div>
                {auditList.length ?
                    <div id="auditListWrap" className={styles.toAuditWrap} 
                        onScroll={this.handleScroll}
                        onTouchMove={this.touchMove}
                        onTouchEnd = {this.touchEnd}
                    >
                        <PullToRefresh 
                            damping={60}
                            style={{height: '100%', overflow: 'auto'}}
                            direction={this.state.down ? 'down' : 'up'}
                            indicator={{release: releaseNode}}
                            onRefresh = {() => {
                                this.refreshList();
                            }}
                        >
                            <AuditList auditList={auditList} getDetailInfo={this.getDetailInfo} />
                            {dropLoading}
                        </PullToRefresh>
                    </div> : ''
                }
                {isShowLoadingComponent && <LoadingComponent />}
                {!auditList.length && !isShowLoadingComponent && <div className={styles.blankWrap}> <BlankImg /></div>}
                {showDetailPage && <EvaluationDetail detailInfo={detailInfo} notHttp={true} hideDetailPage={this.hideDetailPage} />}
            </div>
        );
    }
}