import React from 'react';
import axios from '../../../utils/axiosApi';
import styles from './auditList.scss';
export default class AuditList extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            activeRecordkey: ''
        };
    }

    componentDidMount () {
        // auditList
        if (this.props.auditList && this.props.auditList.length) {
            let firstItem = this.props.auditList[0];
            let activeRecordKey = `${firstItem.id}-${firstItem.targetType}`;
            this.setState({activeRecordKey});
            this.openDetail(firstItem.id, firstItem.targetType);
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.auditList !== this.props.auditList) {
            if (this.props.auditList.length) {
                let firstItem = this.props.auditList[0];
                let activeRecordKey = `${firstItem.id}-${firstItem.targetType}`;
                this.setState({activeRecordKey});
                this.openDetail(firstItem.id, firstItem.targetType);
            }
        }
    }

    openDetail = (recordId, targetType) => {
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
                this.props.getDetailInfo(detailInfo);
            }
        });
    }
    
    render() {
        const {auditList, isLogging} = this.props;
        const {activeRecordKey} = this.state;
        return (
            <div className={styles.auditList}>
                {(auditList || []).map((item) => {
                    let auditName = '';
                    switch (item.auditStatus) {
                        default:auditName = '待审核';
                            break;
                        case 1:
                            auditName = '待审核';
                            break;
                        case 2:
                            auditName = '审核通过';
                            break;
                        case 3:    
                            auditName = '已作废';
                    }
                    
                    return <div className={`${styles.oneRecord} ${activeRecordKey === `${item.id}-${item.targetType}` ? styles.oneRecordActive : ''} `} 
                        key={`${item.id}-${item.targetType}`} onClick={() => {
                            this.openDetail(item.id, item.targetType);
                        }} >
                        <p className={styles.detail}>{item.content}</p>
                        <p className={styles.timeLine}> 
                            <span className={styles.time}>{!isLogging ? '截止时间：' : '审核时间：'}{!isLogging ? item.deadline : item.auditTime}</span>
                            <span className={`${styles.status} 
                                ${item.auditStatus === 1 ? styles.toAudit : item.auditStatus === 2 ? styles.passed : item.auditStatus === 3 ? styles.cancelled : '' }  `}> {/*eslint-disable-line*/}
                                {auditName}<i className="evaiconfont">&#xe684;</i>
                            </span>
                        </p>
                    </div>;
                })}
                <div className={styles.bgShade}></div>
            </div>
        );
    }
}