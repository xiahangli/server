import React from 'react';
import {Modal} from 'antd-mobile';
import Stepper from '../../../components/Stepper/stepper';
import Remark from '../Remark/remark';
import RankScore from '../RankScore/rankScore';
import MatterScore from '../MatterScore/matterScore';

import {updateBatchObjectArray} from '../../../store/actions';

import {connect} from 'react-redux';

import styles from './batchObject.scss';
class BatchObject extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            contentModalVisible: false,
            matterScoreInfo: {},      //  按事项评分，用户操作的所有的数据详细信息(每个对象一个)
            matterContent: [],               //   按事项评分，用户操作过的content (每个对象有自己的content)
            rankScoreInfo: {},          //  按等级评分，用户操作的数据详细信息
            batchCurIndex: 0,   //  操作的当前批量对象的下标
            delModalVisible: false
        };
    }

    showDelModal = (batchCurIndex) => {
        this.setState({delModalVisible: true, batchCurIndex});
    }

    closeDelModal = () => {
        this.setState({delModalVisible: false});
    }


    sureDelObj = (batchObjectArray, index) => {
        let a = batchObjectArray.slice(0, index);
        let b = batchObjectArray.slice(index + 1);
        this.props.updateBatchObjectArray([...a, ...b]);
        this.setState({delModalVisible: false, batchCurIndex: 0});
    }

    onChange = (val, batchObjectArray, index) => {
        batchObjectArray[index].lastScore = val;
        batchObjectArray[index].score = val - batchObjectArray[index].initScore;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    showRemark = (batchObjectArray, index) => {
        batchObjectArray[index].isShowRemark = true;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    hideRemark = (batchObjectArray, index) => {
        batchObjectArray[index].isShowRemark = false;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    showContentModalFn = (batchCurIndex) => {
        this.setState({contentModalVisible: true, batchCurIndex});
    }

    closeContentModal = () => {
        this.setState({contentModalVisible: false});
    }

    //  弹窗点击了确定操作，更新当前批量对象数据
    onSure = (batchObjectArray, evaStdType) => {
        const {batchCurIndex} = this.state;
        this.setState({contentModalVisible: false});
        if (evaStdType === 1) {
            const {rankScoreInfo} = this.state;
            if (JSON.stringify(rankScoreInfo) === '{}') {
                return;
            }
            batchObjectArray[batchCurIndex].lastScore = rankScoreInfo.lastScore;
            batchObjectArray[batchCurIndex].scoreDesc = rankScoreInfo.scoreDesc;
            batchObjectArray[batchCurIndex].score = rankScoreInfo.lastScore - batchObjectArray[batchCurIndex].initScore;
        } else if (evaStdType === 2) {
            //  按事项评分
            const {matterScoreInfo, matterContent} = this.state;
            if (JSON.stringify(matterScoreInfo) === '{}' || !matterContent.length) {
                return;
            }
            batchObjectArray[batchCurIndex].lastScore = matterScoreInfo.lastScore;
            batchObjectArray[batchCurIndex].scoreDesc = matterScoreInfo.scoreDesc;
            batchObjectArray[batchCurIndex].matterContent = matterContent;

            batchObjectArray[batchCurIndex].score = matterScoreInfo.score;
        }
        this.setState({matterScoreInfo: {}, matterContent: []});
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    getMatterScoreInfo = (matterScoreInfo) => {
        this.setState({matterScoreInfo});
    }

    getMatterContent = (matterContent) => {
        this.setState({matterContent});
    }

    getRankScoreInfo = (rankScoreInfo) => {
        this.setState({rankScoreInfo});
    }

    render() {
        const {targetTypeData, batchObjectArray, shareStandardData} = this.props;
        const {batchCurIndex, contentModalVisible, delModalVisible} = this.state;
        let {targetType} = targetTypeData; 
        let objectTitle = '';
        if (targetType === 1) {
            objectTitle = '学生';
        } else if (targetType === 2) {
            objectTitle = '班级';
        } else if (targetType === 3) {  // eslint-disable-line
            objectTitle = '宿舍';
        }
        const {evaStdType} = shareStandardData;


        return (
            <div className={styles.batchObject}>
                <div className={`${styles.batchTitle} cf`}>
                    <span className={`${styles.objectType} ${styles.objectOneLine}`}>{objectTitle}</span>
                    <span className={styles.nowScore}>当前评分</span>
                    <span className={styles.remarkText}>备注</span>
                </div>

                {batchObjectArray.map((item, index) => {
                    if (typeof item.lastScore === 'string') {
                        item.lastScore = Number(item.lastScore);
                    }
                    return (
                        <div key={item.targetId} className={`${styles.oneBatchContent} cf`}>
                            <div className={styles.batchContentWrap}>
                                <div className={`${styles.batchContent}`}>
                                    <span className={styles.delHand} onClick={() => {
                                        this.showDelModal(index);
                                    }}>
                                        <i className="evaiconfont">&#xe65e;</i>
                                    </span>
                                    {targetType === 1 ? 
                                        <div className={`${styles.objectType} ${styles.stuType}`}>
                                            <span className={styles.stuName}>{item.studentName}</span><p className={styles.gradeName}>{item.clazzName}</p></div> : 
                                        <span className={`${styles.objectType} ${styles.objectOneLine}`}>{item.objectVal}</span>}
                                    <div className={styles.nowScore}>
                                        {evaStdType === 3 ?    
                                            <div className={styles.scoreRank}>
                                                <Stepper 
                                                    operationSize={'0.54rem'} inputSize={'0.88rem'} inputFont={'0.32rem'}
                                                    iconfontSize={'.21rem'}
                                                    value={item.lastScore}
                                                    onChange = {(val) => {
                                                        this.onChange(val, batchObjectArray, index);
                                                    }}
                                                    max = {item.max}
                                                    min = {item.min}
                                                />
                                            </div> : 
                                            <span className={styles.score__val}>{item.lastScore && item.lastScore.toFixed(1)}</span>
                                        }
                                        {evaStdType === 3 ?  
                                            '' : 
                                            <span className={styles.edit} onClick={() => {
                                                this.showContentModalFn(index);
                                            }}>
                                                <i className="evaiconfont">&#xe636;</i>
                                            </span>}
                                    </div>
                                   
                                    
                                    {item.isShowRemark ? 
                                        <span className={`${styles.remarkText}`} onClick={() => {
                                            this.hideRemark(batchObjectArray, index);
                                        }}>
                                        收起
                                        </span>
                                        :  
                                        <span className={`${styles.remarkText}`} 
                                            onClick={() => {
                                                this.showRemark(batchObjectArray, index);
                                            }}>展开</span> 
                                    }
                                </div>
                            </div>
                            {item.isShowRemark && <Remark history={this.props.history} curBatchIndex = {index} />}
                        </div>
                    );
                })}
                <Modal
                    visible={contentModalVisible}
                    transparent
                    maskClosable={false}
                    footer={[
                        {text: '取消', onPress: () => {
                            this.closeContentModal(); 
                        }}, 
                        {text: '确定', onPress: () => {
                            this.onSure(batchObjectArray, evaStdType);
                        }}
                    ]}
                    wrapClassName={'contentModalWrap'}
                >
                    <div style={{height: '6.35rem', overflow: 'scroll'}}>
                        {evaStdType === 2 ? 
                            <MatterScore lastScore={contentModalVisible && batchObjectArray[batchCurIndex].lastScore} 
                                getMatterScoreInfo={this.getMatterScoreInfo} 
                                getMatterContent = {this.getMatterContent}
                                content = {contentModalVisible && batchObjectArray[batchCurIndex].matterContent} 
                                lastScoreDesc = {contentModalVisible && batchObjectArray[batchCurIndex].lastScoreDesc}
                                score = {contentModalVisible && batchObjectArray[batchCurIndex].score}
                            />
                            : <RankScore 
                                lastScore={batchObjectArray[batchCurIndex].lastScore || 0} 
                                max = {batchObjectArray[batchCurIndex].max || 0}
                                min = {batchObjectArray[batchCurIndex].min || 0}
                                getRankScoreInfo = {this.getRankScoreInfo}
                                content = {contentModalVisible && batchObjectArray[batchCurIndex].rankContent}
                            />
                        }
                    </div>
                </Modal>
                <Modal
                    wrapClassName={'delObjModalWrap'}
                    visible={delModalVisible}
                    transparent
                    maskClosable={false}
                    footer={[
                        {text: '取消', onPress: () => {
                            this.closeDelModal(); 
                        }}, 
                        {text: '确定', onPress: () => {
                            this.sureDelObj(batchObjectArray, batchCurIndex);
                        }}
                    ]}
                >
                    <p className={styles.delText}>确定删除该条评价对象吗？</p>
                </Modal>
            </div>
        );
    }
}
export default connect(
    state => (
        {targetTypeData: state.targetTypeData, batchObjectArray: state.batchObjectArray, shareStandardData: state.shareStandardData}),
    {updateBatchObjectArray}
)(BatchObject);
