import React from 'react';
import styles from '../hdCommonList.scss';
import axios from '../../../utils/axiosApi';
import HdQueryParams from '../HdQueryParams/hdQueryParams';
import AuditList from '../AuditList/auditList';
import EvaluationDetail from '../../EvaluationDetail/evaluationDetail';

export default class HdToAudit extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            pageSize: 20,
            curPage: 1,
            auditList: [],
            detailInfo: {},
            showHdQueryParams: false
        };
    }

    componentDidMount () {
        this.getAuditList();
    }

    getAuditList = () => {
        let {pageSize, curPage} = this.state;
        let params = {pageSize, curPage, auditStatus: 1};
        let url = '/auth/global/evaluation/eva/app/getAuditRecords.htm';
        axios('get', url, params).then((json) => {
            if (json.success) {
                let auditListBefore = this.state.auditList;
                if (curPage === 1) {
                    auditListBefore = [];
                }
                let auditList;
                let nowData = json.data.dataList || [];
                auditList = auditListBefore.concat(nowData);
                this.setState({auditList, allowHttp: true, totalPage: json.data.totalPage, curPage: json.data.curPage});

            }
        });
    }

    //  得到详细信息
    getDetailInfo = (detailInfo) => {
        this.setState({detailInfo});
    }

    render() {
        const {auditList, detailInfo, showHdQueryParams} = this.state;
        
        return (
            <div className={`${styles.listWrap} cf`}>
                <span onClick={() => {
                    this.setState({showHdQueryParams: true});
                }}>模拟筛选按钮</span>
                <div className={styles.leftList}>
                    <AuditList auditList={auditList} getDetailInfo={this.getDetailInfo} />
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