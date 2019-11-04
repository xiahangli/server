import React from 'react';
import styles from './auditLogging.scss';
import axios from '../../../utils/axiosApi';
import {connect} from 'react-redux';
import {PullToRefresh} from 'antd-mobile';
import AuditList from '../AuditList/auditList';
import loadingImg from '../../../assets/images/loading.gif';
import BlankImg from '../../../components/BlankImg';
import shadeImg from '../../../assets/images/shade.png';
import EvaluationDetail from '../../EvaluationDetail/evaluationDetail';
import LoadingComponent from '../../../components/Loading';

import TopQueryParams from '../TopQueryParams/topQueryParams';

class AuditLogging extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
           
            auditList: [],
            curPage: 1,
            pageSize: 20,
            totalPage: 0,
            allowHttp: true,
            showDetailPage: false,   //  保持列表状态不变，显示详情页面
            detailInfo: {},
            down: true,
            isShowLoadingComponent: true,
            
            auditStatus: [0],
            typeSearchVal: [],
            
            gradeAndClazzVal: [],
        };
    }

    componentDidMount () {
        this.handleCordova();
        this.getAuditList(1, true);
    }

    //  处理cordova相关
    handleCordova = () => {
        document.addEventListener('deviceready', function() {
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
            window.LeTalkCorePlugin.customBack('custom');
        }, false);

        window.clickBack = () => {
            if (this.state.showDetailPage) {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['审核记录']);
                this.setState({showDetailPage: false});
            } else {
                window.LeTalkCorePlugin.customBack('');
                this.props.history.push({pathname: '/toAudit', query: {isGohome: 1}});
            }
        };
    }

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
                this.getAuditList(curPage + 1, false);
            }
        }
    }

    //  获得列表数据
    getAuditList = (curPage, isShowLoadingComponent, isScrollTop) => {
        this.setState({isShowLoadingComponent: isShowLoadingComponent}, () => {
            let {pageSize, typeSearchVal, auditStatus, gradeAndClazzVal} = this.state;

            let typeId = typeSearchVal[0];
            let itemId = typeSearchVal[1];
            let gradeId = gradeAndClazzVal[0];
            let clazzId = gradeAndClazzVal[1];
            let auditStatusVal = auditStatus[0];
            if (auditStatus[0] === 0) {
                auditStatusVal = '2,3';
            } 

            let url = '/auth/global/evaluation/eva/app/getAuditRecords.htm';
            axios('get', url, {auditStatus: auditStatusVal, curPage, pageSize, typeId, itemId, gradeId, clazzId}).then((json) => {
                if (json.success) {
                    let auditListBefore = this.state.auditList;
                    if (curPage === 1) {
                        auditListBefore = [];
                    }
                    let nowData = json.data.dataList || [];
                    let auditList = auditListBefore.concat(nowData);
                    if (isScrollTop) {
                        let auditListWrap = document.getElementsByClassName("am-pull-to-refresh")[0];
                        if (auditListWrap) {
                            auditListWrap.scrollTop = 0;
                        }
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
    
    getDetailInfo = (detailInfo) => {
        this.setState({detailInfo});
        this.setState({showDetailPage: true});
    }

    refreshList = () => {
        this.getAuditList(1, false);
    }

    //  拿到方案的值，请求列表
    getTypeSearchVal = val => {
        this.setState({typeSearchVal: val}, () => {
            this.changeParamGetList();
        });
    }


    //  改变年级的值，请求列表
    getGradeAndClazzVal = val => {
        this.setState({gradeAndClazzVal: val}, () => {
            this.changeParamGetList();
        });
    }

    //  拿到状态的值，请求列表
    getAuditStatus = val => {
        this.setState({auditStatus: val}, () => {
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
         let {auditList, curPage, totalPage, showDetailPage, detailInfo, isShowLoadingComponent} = this.state;
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
                 <TopQueryParams 
                     type="auditLogging"
                     getTypeSearchVal={this.getTypeSearchVal}
                     getGradeAndClazzVal={this.getGradeAndClazzVal}
                     getAuditStatus={this.getAuditStatus}
                 />
                
                 <div className={styles.shadeImg}><img src={shadeImg} /></div>
                
                 {auditList.length ? 
                     <div id="auditListWrap" className={styles.auditList} 
                         onScroll={this.handleScroll}
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
                             <AuditList auditList={auditList} getDetailInfo={this.getDetailInfo} isLogging={true} />
                             {dropLoading}
                         </PullToRefresh>
                     </div> : ''
                 }
                 {isShowLoadingComponent && <LoadingComponent /> }
                 {!isShowLoadingComponent && !auditList.length && <div className={styles.blankWrap}><BlankImg /></div>}
                 <div className={styles.bgShade}></div>
                 {showDetailPage && <EvaluationDetail detailInfo={detailInfo} notHttp={true} />}
             </div>
         );
     }
}

export default connect(state => ({
    targetTypeData: state.targetTypeData,
}),)(AuditLogging);