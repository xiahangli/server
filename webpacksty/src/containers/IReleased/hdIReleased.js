import React from 'react';
// import {PullToRefresh} from 'antd-mobile';
// import moment from 'moment';
import axios from 'UTILS/axiosApi';
import ReleasedList from './ReleasedList/releasedList';
// import LoadingComponent from 'COMPONENTS/Loading';
import EvaluationDetail from '../EvaluationDetail/evaluationDetail';
import HdQueryParams from './hdQueryParams/hdQueryParams';

import styles from '../Audit/hdCommonList.scss';
export default class HdIReleased extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            pageSize: 20,
            curPage: 1,
            releasedListData: [],
            isShowLoadingComponent: true,
            showHdQueryParams: false,
            detailInfo: {}
        };
    }

    componentDidMount () {
        window.LeKeBridge.sendMessage2Native("updateAndroidTitle", '我发布的');
        window.LeKeBridge.sendMessage2Native("madeHeadIcon", [{title: '图标', id: 111, type: 'image', imageSrc: 'https://static.leke.cn/images/lemall/kuang2.png'}]);
        this.getIReleased();
    }

    changeShowHdQueryParams = () => {
        this.setState({showHdQueryParams: false});
    }

    getQueryParams = (params) => {
        this.getIReleased(params);
        this.setState({showHdQueryParams: false});
    }

    getIReleased = (conditionParams) => {
        let schoolId = sessionStorage.getItem('schoolId');
        let {pageSize, curPage} = this.state;
        let params = {...conditionParams, pageSize, curPage, schoolId};
        let url = '/auth/global/evaluation/eva/app/getPublish.htm';
        axios('get', url, params).then((json) => {
            if (json.success) {
                let releasedListDataBefore = this.state.releasedListData;

                if (curPage === 1) {
                    releasedListDataBefore = [];
                }
                let nowData = json.data.dataList || [];
                let releasedListData = releasedListDataBefore.concat(nowData);
                this.setState({allowHttp: true, releasedListData, curPage: json.data.curPage, totalPage: json.data.totalPage}, () => {
                });
            }
        });
    }

    getDetailInfo = (recordId, targetType) => {
        let url = '/auth/global/evaluation/eva/app/getEvaluateDetails.htm';
        axios('get', url, {recordId, targetType}).then((json) => {
            if (json.success) {
                let detailInfo = json.data;
                detailInfo.recordId = recordId;
                detailInfo.targetType = targetType;
                this.setState({detailInfo});
            }
        });
    }

    render() {
        let {releasedListData, showHdQueryParams, detailInfo} = this.state;
        return (
            <div className={`${styles.listWrap} cf`}>
                <span onClick={() => {
                    this.setState({showHdQueryParams: true});
                }}>模拟筛选按钮</span>
                <div className={styles.leftList}>
                    <ReleasedList releasedListData={releasedListData} getDetailInfo={this.getDetailInfo} />
                </div>
                <div className={styles.rightDetail}>
                    <EvaluationDetail iReleasedFlag={true} detailInfo={detailInfo} notHttp={true} />
                </div>
                {showHdQueryParams && <HdQueryParams 
                    getQueryParams={this.getQueryParams} 
                    showStatus={true}
                    changeShowHdQueryParams={this.changeShowHdQueryParams}/> }
            </div>
        );
    }
}
