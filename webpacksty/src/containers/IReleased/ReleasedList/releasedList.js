import React from 'react';
import styles from './releasedList.scss';

export default class ReleasedList extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            releasedListData: [],
            activeRecordKey: ''
        };
    }
    
    componentDidMount () {
        if (this.props.releasedListData) {
            let firstItem = this.props.releasedListData[0];
            if (firstItem) {
                let activeRecordKey = `${firstItem.id}-${firstItem.targetType}`;
                this.setState({activeRecordKey});
                this.props.getDetailInfo(firstItem.id, firstItem.targetType);
            }
            this.setState({releasedListData: this.props.releasedListData});
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.releasedListData !== this.props.releasedListData) {
            let firstItem = this.props.releasedListData[0];
            if (firstItem) {
                let activeRecordKey = `${firstItem.id}-${firstItem.targetType}`;
                this.setState({activeRecordKey});
                this.props.getDetailInfo(firstItem.id, firstItem.targetType);
            }
            this.setState({releasedListData: this.props.releasedListData});
        }
    }

    openDetail = (recordId, targetType) => {
        this.setState({activeRecordKey: `${recordId}-${targetType}`});
        this.props.getDetailInfo(recordId, targetType);
    }

    render() {
        const {releasedListData, activeRecordKey} = this.state;
        return (
            <div className={styles.listWrap}>
                {releasedListData.map((item) => {
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
                            break;
                        case 4 :
                            auditName = '已作废';
                    }
                    return <div className={`${styles.oneRecord} ${activeRecordKey === `${item.id}-${item.targetType}` ? styles.oneRecordActive : ''} `} key={`${item.id}-${item.targetType}`} 
                        onClick={() => {
                            this.openDetail(item.id, item.targetType);
                        }} >
                        <div className={`${styles.topInfo} cf`}>
                            <div className={`${styles.leftInfo}`}>
                                <p className={styles.typeName}>{item.typeName}</p>
                                <p>
                                    {item.firstName && <span><span className={`${styles.itemName} f-ellipsis`}>{item.firstName}</span>/</span> }
                                    {item.secondName && <span><span className={`${styles.itemName} f-ellipsis`}>{item.secondName}</span>/</span>}
                                    <span className={`${styles.itemName} f-ellipsis`}>{item.thirdName}</span>
                                </p>
                            </div>
                            <div className={styles.rightInfo}>
                                <span className={`commonTag
                                ${item.auditStatus === 1 ? "toAudit" : item.auditStatus === 2 ? "passed" : item.auditStatus === 3 || item.auditStatus === 4 ? "cancelled" : '' }`}>
                                    {auditName}</span>
                                <p className={`${styles.score} ${item.score > 0 ? styles.highScore : item.score < 0 ? styles.lowScore : ''}`}>{item.score}</p>
                            </div>
                        </div>
                        <p className={styles.bottomInfo}>
                            <span className={styles.evaName}>{item.evalName}</span>
                            <span className={styles.evaTime}>{item.evaDate}<i className="evaiconfont">&#xe684;</i></span>
                        </p>
                    </div>;
                })}
            </div>
        );
    }
}