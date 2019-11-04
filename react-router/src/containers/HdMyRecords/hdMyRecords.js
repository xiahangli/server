import React from 'react';
import axios from '../../utils/axiosApi';
import HdQueryParams from '../IReleased/hdQueryParams/hdQueryParams';
import ReleasedList from '../IReleased/ReleasedList/releasedList';
import EvaluationDetail from '../EvaluationDetail/evaluationDetail';
import styles from '../Audit/hdCommonList.scss';
export default class HdMyRecords extends React.Component{
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
        this.getMyRecords();
    }

    changeShowHdQueryParams = () => {
        this.setState({showHdQueryParams: false});
    }

    getQueryParams = (params) => {
        this.getMyRecords(params);
        this.setState({showHdQueryParams: false});
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

    getMyRecords = (conditionParams) => {
        let schoolId = sessionStorage.getItem('schoolId');
        let {pageSize, curPage} = this.state;
        let params = {schoolId, curPage, pageSize, ...conditionParams};
        let url = '/auth/global/evaluation/eva/app/getMyRecords.htm';
        axios('get', url, params).then((json) => {
            if (json.success) {
                let releasedListDataBefore = this.state.releasedListData;
                if (curPage === 1) {
                    releasedListDataBefore = [];
                }
                let nowData = json.data.dataList || [];
                let releasedListData = releasedListDataBefore.concat(nowData);
                this.setState({allowHttp: true, releasedListData, 
                    curPage: json.data.curPage, totalPage: json.data.totalPage});
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
                {showHdQueryParams && <HdQueryParams getQueryParams={this.getQueryParams} changeShowHdQueryParams={this.changeShowHdQueryParams} hideStatus={true}/> }
            </div>
        );
    }
}