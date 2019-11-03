import React from 'react';
import {Menu, DatePicker, PullToRefresh} from 'antd-mobile';
import moment from 'moment';
import ReleasedList from './ReleasedList/releasedList';
import axios from '../../utils/axiosApi';
import styles from './iReleased.scss';
import BlankImg from '../../components/BlankImg';
import loadingImg from '../../assets/images/loading.gif';
import shadeImg from '../../assets/images/shade.png';
import EvaluationDetail from '../EvaluationDetail/evaluationDetail';
import LoadingComponent from '../../components/Loading';

const statusData = [
    {'label': '全部状态', value: 0},
    {'label': '待审核', value: 1},
    {'label': '审核通过', value: 2},
    {'label': '已作废', value: 3},
];
export default class IReleased extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            typeList: [],
            typeSearchShow: false,
            typeSearchVal: [],
            typeSearchText: '全部类型',
            monthSearchShow: false,
            monthSearchVal: '',
            monthSearchText: '全部时间',
            maxTime: '',
            minTime: '',
            statusSearchShow: false,
            statusSearchVal: [0],
            statusSearchText: '全部状态',
            searchCurIndex: -1,  //  当前点击的是在第几个筛选项
            schoolId: '',
            releasedListData: [],
            pageSize: 20,
            curPage: 1,
            totalPage: 0,
            allowHttp: true,     // 当上拉加载操作过快的时候，会导致数据重复问题解决
            showDetailPage: false,   //  保持列表状态不变，显示详情页面
            detailInfo: {},
            down: true,
            isShowLoadingComponent: true
        };
    }

    componentDidMount () {
        document.addEventListener('deviceready', function() {
            window.LeTalkCorePlugin.customBack('custom');
        }, false);

        window.clickBack = () => {
            if (this.state.showDetailPage) {
                this.setState({showDetailPage: false});
                document.title = '我发布的';
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['我发布的']);
            } else {
                this.props.history.replace({pathname: '/'});
            }
        };
        
        let schoolId = sessionStorage.getItem('schoolId');
        this.setState({schoolId}, () => {
            this.getIReleased(1, false, true);
        });
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

    handleScroll = () => {
        let releasedWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
        
        let scrollTop = releasedWrap.scrollTop;
        // //clientHeight可视区的高度 
        let clientHeight = releasedWrap.clientHeight;

        //变量scrollHeight是滚动条的总高度
        let scrollHeight = releasedWrap.scrollHeight;
       
        let bottomHeight = 100;

        //  上拉加载
        if (scrollTop + clientHeight + bottomHeight >= scrollHeight && this.state.allowHttp){
            this.setState({
                allowHttp: false
            });
            const {curPage, totalPage} = this.state;
            if (curPage !== totalPage) {
                this.getIReleased(curPage + 1, false, false);
            }
        }
    }
    
    refreshList = () => {
        this.getIReleased(1, false, false);
    }

    //  拿到我发布的数据
    getIReleased = (curPage, isScrollToTop, isShowLoadingComponent, updateCurPageData) => {
        // updateCurPageData: 详情页删掉一条数据，再次回到列表页，重新请求最后一页的数据，把删除的数据补回来
        this.setState({isShowLoadingComponent: isShowLoadingComponent}, () => {
            let url = '/auth/global/evaluation/eva/app/getPublish.htm';
            let {schoolId, monthSearchVal, typeSearchVal, statusSearchVal, pageSize} = this.state;
            let typeId = typeSearchVal[0];
            let itemId = typeSearchVal[1];
            let params = {schoolId, typeId, itemId, pageSize, curPage};
            if (monthSearchVal) {
                let evaDate = moment(monthSearchVal).format('YYYY-MM');
                params.evaDate = evaDate;
            }

            let auditStatus = statusSearchVal[0];
            if (auditStatus) {
                params.auditStatus = auditStatus;
            }

            axios('get', url, params).then((json) => {
                if (json.success) {
                    let releasedListDataBefore = this.state.releasedListData;

                    if (curPage === 1) {
                        releasedListDataBefore = [];
                    }
                    if (isScrollToTop) {
                        let releasedWrap = document.getElementById("releasedWrap");
                        if (releasedWrap) {
                            releasedWrap.scrollTop = 0;
                        }
                    }
                    let nowData = json.data.dataList || [];
                    let releasedListData;
                    if (updateCurPageData) {
                        if (curPage === 1) {
                            releasedListData = nowData;
                        } else {
                            releasedListData = this.mendLastRecord(releasedListDataBefore, nowData);
                        }
                    } else {
                        releasedListData = releasedListDataBefore.concat(nowData);
                    }
                    this.setState({allowHttp: true, releasedListData, 
                        totalPage: json.data.totalPage, curPage: json.data.curPage}, () => {
                        if (isShowLoadingComponent) {
                            this.setState({isShowLoadingComponent: false});
                        }
                    });
                }
            });
        });
    }

    //  重新请求最后一页的数据，把删除的数据补回来
    mendLastRecord = (releasedListDataBefore, nowData) => {
        nowData.forEach((item) => {
            let id = item.id;
            let hasIndex = releasedListDataBefore.findIndex((item1) => {
                return item1.id === id;
            });
            if (hasIndex <= -1) {
                releasedListDataBefore.push(item);
            }
        });
        return releasedListDataBefore;
    }

    //  点击头部三个筛选条件
    showSearch = (index) => {
        if (index === '0') {
            if (this.state.typeSearchShow === true) {
                this.setState({typeSearchShow: false});
            } else {
                this.setState({typeSearchShow: true, monthSearchShow: false, statusSearchShow: false, searchCurIndex: 0});
            }
        } else if (index === '1') {
            if (this.state.monthSearchShow === true) {
                this.setState({monthSearchShow: false});
            } else {
                this.setState({monthSearchShow: true, typeSearchShow: false, statusSearchShow: false, searchCurIndex: 1}, () => {
                    document.getElementsByClassName("am-picker-popup-item am-picker-popup-header-left")[0].innerText = '清空';
                });
            }
        } else if (index === '2') {
            if (this.state.statusSearchShow) {
                this.setState({statusSearchShow: false});
            } else {
                this.setState({statusSearchShow: true, monthSearchShow: false, typeSearchShow: false, searchCurIndex: 2});
            }
        }
        let releasedWrap = document.getElementById("releasedWrap");
        if (releasedWrap) {
            releasedWrap.style.overflowY = 'hidden';
        }
    }
    
    //  改变类型
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
        this.setState({typeSearchShow: false, typeSearchText, typeSearchVal: val, releasedListData: []}, () => {
            this.getIReleased(1, true, true);
            let releasedWrap = document.getElementById("releasedWrap");
            if (releasedWrap) {
                releasedWrap.style.overflowY = 'scroll';
            }
        });
    }

    //  确定选择月份
    sureMonth = val => {
        let evaDate = moment(val).format('YYYY-MM');
        let year = evaDate.split('-')[0];
        let month = evaDate.split('-')[1];
        let monthSearchText = year + '年' + month + '月';
        this.setState({monthSearchShow: false, monthSearchText, monthSearchVal: val, releasedListData: []}, () => {
            this.getIReleased(1, true, true);
            let releasedWrap = document.getElementById("releasedWrap");
            if (releasedWrap) {
                releasedWrap.style.overflowY = 'scroll';
            }
        });
    }

    //  取消选择月份
    disMissMonth = () => {
        let releasedWrap = document.getElementById("releasedWrap");
        if (releasedWrap) {
            releasedWrap.style.overflowY = 'scroll';
        }
        this.setState({monthSearchShow: false, monthSearchText: '全部时间', monthSearchVal: '', releasedListData: []}, () => {
            this.getIReleased(1, true, true);
        });
    }

    //  改变状态
    changeStatus = (val) => {
        let val1 = val[0];
        let curItem = statusData.find((item) => {
            return item.value === val1;
        });
        this.setState({statusSearchShow: false, statusSearchVal: val, statusSearchText: curItem.label, releasedListData: []}, () => {
            this.getIReleased(1, true, true);
            let releasedWrap = document.getElementById("releasedWrap");
            if (releasedWrap) {
                releasedWrap.style.overflowY = 'hidden';
            }
        });
    }

    closeBg = () => {
        let releasedWrap = document.getElementById("releasedWrap");
        if (releasedWrap) {
            releasedWrap.style.overflowY = 'scroll';
        }
        this.setState({typeSearchShow: false, monthSearchShow: false, statusSearchShow: false});
    }

    getDetailInfo = (recordId, targetType) => {
        let url = '/auth/global/evaluation/eva/app/getEvaluateDetails.htm';
        axios('get', url, {recordId, targetType}).then((json) => {
            if (json.success) {
                let detailInfo = json.data;
                detailInfo.recordId = recordId;
                detailInfo.targetType = targetType;
                if (detailInfo.teachers) {
                    let teachers = detailInfo.teachers;
                    teachers = JSON.stringify(teachers);
                    localStorage.setItem('teachers', teachers);
                }
                this.setState({detailInfo});
                this.setState({showDetailPage: true});
            }
        });
    }

    //  隐藏掉详情页，根据详情页进行的操作，对列表进行操作
    hideDetailPage = (showDetailPage, auditStatusNow) => {
        //  1.  判断当前列表搜索的状态 
        // 待审核：重新请求当前页数据，删除数据，和原数组进行对比，找到不同的，推到原数组中 
        // 其他：根据recordId找到，更新状态
        let {statusSearchVal, releasedListData, detailInfo, curPage} = this.state;
        let {recordId} = detailInfo;
        let curIndex = releasedListData.findIndex((item) => {
            return item.id === recordId;
        });

        let auditStatus = statusSearchVal[0];
        if (auditStatus === 1) {
            releasedListData.splice(curIndex, 1);
            this.getIReleased(curPage, false, false, true);
        } else {
            //  根据id更新状态
            releasedListData[curIndex].auditStatus = auditStatusNow;
        }
        this.setState({releasedListData});
        this.setState({showDetailPage: showDetailPage});
    }
    
    render() {
        const {typeSearchShow, typeSearchText, typeSearchVal, 
            monthSearchShow, monthSearchText, monthSearchVal, releasedListData,
            statusSearchShow, statusSearchVal, statusSearchText, searchCurIndex, typeList, maxTime, minTime,
            curPage, totalPage, showDetailPage, detailInfo, isShowLoadingComponent} = this.state;
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
        
        const statusMenu = <Menu className={`${styles.commonMenu} oneColumnMenu commonMenu`}
            level={1} data={statusData} value={statusSearchVal} onChange={this.changeStatus} />;

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

        const releaseNode = <p className={styles.refresh}>
            <span className={styles.loadMore}>
                <img className={styles.loadingImg} src={loadingImg}/>
                <span className={ styles.refreshText}>正在刷新</span>
            </span>
        </p>;        

        return (
            <div className={styles.wrap}>
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
                        <span className={`titleVal f-ellipsis`}>{monthSearchText}</span>
                        <i className="evaiconfont">&#xe82f;</i>
                    </span>
                    <span className={`oneTitleWrap ${searchCurIndex === 2 ? 'curTitle' : ''}`} onClick={() => {
                        this.showSearch('2');
                    }}>
                        <span className={`titleVal f-ellipsis`}>{statusSearchText}</span>
                        <i className="evaiconfont">&#xe82f;</i>
                    </span>
                </div>
                <div className={styles.shadeImg}>
                    <img src={shadeImg} />
                </div>
                {typeSearchShow && typeMenu}
                {monthSearchShow && monthSearch}
                {statusSearchShow && statusMenu}
                {(typeSearchShow || statusSearchShow) && <div className={styles.bgShade} onClick={this.closeBg}></div> }
                {monthSearchShow && <div className={`${styles.bgShade} ${styles.monthSearchBg}`} onClick={() => {
                    this.setState({monthSearchShow: false});
                }}></div>}
                {releasedListData.length ?
                    <div id="releasedWrap" className={styles.releasedWrap} 
                        onScroll={this.handleScroll}
                        onTouchMove={this.touchMove}
                        onTouchEnd = {this.touchEnd}
                    >
                        <PullToRefresh
                            damping={60}
                            style={{height: '100%', overflow: 'auto'}}
                            direction={'down'}
                            indicator={{release: releaseNode}}
                            onRefresh={() => {
                                this.refreshList();
                            }}
                        >
                            <ReleasedList releasedListData={releasedListData} getDetailInfo={this.getDetailInfo} />
                            {dropLoading}
                        </PullToRefresh>
                    </div> : ''
                }
                {isShowLoadingComponent && <LoadingComponent />}
                {!releasedListData.length && !isShowLoadingComponent && <div className={styles.blank}><BlankImg /></div>}
                {showDetailPage && <EvaluationDetail iReleasedFlag={true} detailInfo={detailInfo} notHttp={true} hideDetailPage={this.hideDetailPage} />}
            </div>
        );
    }
}

