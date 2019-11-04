import React from 'react';

import axios from '../../utils/axiosApi';
import commonFn from '../../utils/commonFn';
import {Modal} from 'antd-mobile';

import BlankImg from '../../components/BlankImg';
import playImg from '../../assets/images/play.png';
import videoDefault from '../../assets/images/videoDefault.png';
import styles from './evaluationDetail.scss';
import LoadingComponent from '../../components/Loading';
export default class EvaluationDetail extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            detailInfo: null,
            cancelModalVisible: false,
            recordId: '',
            targetType: '',
            failedModalVisible: false,
            failedText: '操作失败，本条记录已审核。'
        };
    }

    componentDidMount () {
        document.addEventListener('deviceready', function() {
            document.title = "hideTitle";
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['']);
        }, false);
        if (this.props.notHttp) {
            this.handleDetailInfo(this.props.detailInfo, true);
            this.setState({isLoading: false});
        } else {
            this.setState({isLoading: true}, () => {
                this.getParams();
            });
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.notHttp) {
            if (prevProps.detailInfo !== this.props.detailInfo) {
                this.handleDetailInfo(this.props.detailInfo, true);
            }
        }
    }

    getParams = () => {
        let recordId = commonFn.getQueryParams('recordId'); 
        let targetType = commonFn.getQueryParams('targetType');
        this.setState({recordId, targetType}, () => {
            this.getDetailInfo();
        });
    }

    getDetailInfo () {
        let {recordId, targetType} = this.state;
        let url = '/auth/global/evaluation/eva/app/getEvaluateDetails.htm';
        axios('get', url, {recordId, targetType}).then((json) => {
            if (json.success) {
                this.setState({isLoading: false});
                if (json.data) {
                    this.handleDetailInfo(json.data);
                }
            }
        });
    }

    handleDetailInfo = (detailInfo, notHttp) => {
        if (detailInfo.scoreDesc) {
            detailInfo.scoreDesc = detailInfo.scoreDesc.split(";");
        }
        if (detailInfo.remarkPicture) {
            detailInfo.remarkPicture = detailInfo.remarkPicture.split(";");
        }
        if (detailInfo.remarkVideo) {
            detailInfo.remarkVideo = JSON.parse(detailInfo.remarkVideo);
        }
        if (detailInfo.teachers) {
            let teachers = detailInfo.teachers;
            let teachersParams = JSON.stringify(teachers);
            localStorage.setItem('teachers', teachersParams);
        }
        if (notHttp) {
            let recordId = detailInfo.recordId;
            let targetType = detailInfo.targetType;
            this.setState({recordId, targetType});
        }
        this.setState({detailInfo});
    }

    // 显示图片
    showPhoto = (imgSrc)=>{
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'openPicture', [{'path': imgSrc}]);
    }

    // 显示视频
    showVideo = (videoPath)=>{
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'openVideo', [{'path': videoPath}]);
    }


    updateAuditStatus = (auditStatus) => {
        if (auditStatus === 3) {    
            this.setState({cancelModalVisible: true});
            return;
        }
        this.sureUpdate(auditStatus);
    }

    sureUpdate = (auditStatus) => {
        let url = '/auth/global/evaluation/eva/app/updateAuditStatus.htm';
        let {targetType, recordId, detailInfo} = this.state;
        let {evaStdType} = detailInfo;
        axios('post', url, {targetType, auditStatus, id: recordId, evaStdType}, 'form').then((json) => {
            if (json.success) {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '操作成功'}]);
                this.props.hideDetailPage(false, auditStatus);
            } else {
                this.setState({failedText: json.message}, () => {
                    this.setState({failedModalVisible: true});
                });
            }
        }); 
    }

    closeCancelModal = () => {
        this.setState({cancelModalVisible: false});
    }

    sureCancel = (auditStatus) => {
        this.setState({cancelModalVisible: false});
        this.sureUpdate(auditStatus);
    }

    failedIKnow = () => {
        this.setState({failedModalVisible: false});
        this.props.hideDetailPage(false, 3);  
    }

    render() {
        const {detailInfo, cancelModalVisible, failedModalVisible, failedText, isLoading} = this.state;
        let {createrName, createdOn, typeName, evalName, itemName, initScore, scoreDesc,
            score, remarkText, remarkPicture, remarkVideo, clazzName, actors, 
            auditStatus, auditorName, auditTime, evaDate, teachers} = detailInfo || {};
        if (actors && typeof actors === 'string') {
            actors = JSON.parse(actors);
        }
        let auditName = '';
        let isLekePad = sessionStorage.getItem('isLekePad');

        switch (auditStatus) {
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
            case 4:
                auditName = '已作废';
        }
        
        const {iReleasedFlag, notHttp} = this.props;
        return (
            <div className={styles.evaluationDetail}>
                {isLoading && <LoadingComponent />}
                {!isLoading && !detailInfo ? 
                    <div style={{paddingTop: '3rem'}}><BlankImg content={'暂无数据'}/></div> : 
                    <div className={styles.eva}>
                        <p className={`${styles.topInfo} cf`}>
                            <span className={styles.info}>评价详情</span>
                            <span className={`commonTag
                                ${auditStatus === 1 ? "toAudit" : auditStatus === 2 ? "passed" : auditStatus === 3 || auditStatus === 4 ? "cancelled" : '' }`}> 
                                {auditName}</span>
                            {isLekePad ? '' : <span>{teachers && teachers.length ? <a href={`http://webapp.leke.cn/evaluation-app/index.html?haveRead&_newtab=1`} className={styles.haveReadNum} 
                            >{teachers && teachers.length}人已读<i className={'evaiconfont'}>&#xe684;</i></a>
                                : <span className={styles.haveReadNum}>{teachers && teachers.length}人已读<i className={'evaiconfont'}>&#xe684;</i></span>
                            }</span>}
                        </p>
                        <p className={styles.time}>
                            <span>{createrName}</span>
                            <span>{createdOn}</span>
                        </p>
                        <p className={styles.oneItem}>
                            <span className={styles.title}>评价方案</span>：
                            <span className={styles.val}>{typeName}</span>
                        </p>
                        <p className={styles.oneItem}>
                            <span className={styles.title}>评价日期</span>：
                            <span className={styles.val}>{evaDate}</span>
                        </p>
                        <p className={styles.oneItem}>
                            <span className={styles.title}>评价对象</span>：
                            <span className={`${styles.val}`}>{evalName}<span className={styles.clazzName}>{clazzName}</span></span>
                        </p>
                        {actors && <div className={styles.oneItem}>
                            <span className={styles.title}>关联学生</span>：
                            <p className={styles.val}>
                                {actors.map((item, index) => {
                                    return (
                                        <span key={index} className={`${styles.val1}`}>{`${item.studentName} ${index + 1 === actors.length ? '' : '、'}`}</span>
                                    );
                                })}
                            </p>
                        </div>
                        }
                        <p className={styles.oneItem}>
                            <span className={styles.title}>评价项目</span>：
                            <span className={`${styles.val} ${styles.valItem}`}>{itemName}</span>
                        </p>
                        <p className={styles.oneItem}>
                            <span className={styles.title}>初始分</span>：
                            <span className={styles.val}>{initScore}</span>
                        </p>
                        <p className={styles.oneItem}>
                            <span className={styles.title}>本次评分</span>：
                            <span className={styles.val}>{score}</span>
                        </p>
                        <p className={styles.desc}>
                            {(scoreDesc || []).map((item, index) => <span key={index} className={styles.oneDesc}>{item}</span>)}
                        </p>
                        {remarkText && 
                        <p className={styles.remarkText}>
                            {remarkText}
                        </p>
                        }
                    {(remarkPicture && remarkPicture.length || remarkVideo) && // eslint-disable-line
                        <div className={styles.mediaWrap}>
                            {(remarkPicture || []).map((item) => <span key={item} className={`${styles.oneMedia} ${styles.imgMedia}`}>
                                <img src={item} onClick={()=>this.showPhoto(item)}/>
                            </span>)}
                            {remarkVideo &&
                                <span className={`${styles.oneMedia} ${styles.videoMedia}`} onClick={()=>this.showVideo(remarkVideo.videoPath)} >
                                    <img className={styles.videoImg} src={remarkVideo.thumbnailPath || videoDefault}/>
                                    <img className={styles.playImg} src={playImg}/>
                                </span>
                            }
                        </div>
                        }
                        {auditStatus !== 1 && <p className={`${styles.auditInfo} cf`}>
                            <span>审核人：<span className={styles.teacher}>{auditorName}</span></span>
                            <span className={styles.evaTime}>{auditTime}</span>
                        </p>}
                        
                        {auditStatus === 1 && !iReleasedFlag && notHttp && <p className={`${styles.operation} ${styles.pass}`} onClick={() => {
                            this.updateAuditStatus(2);
                        }}>审核通过</p>}
                        {auditStatus === 1 && !iReleasedFlag && notHttp && <p className={`${styles.operation} ${styles.cancel}`} onClick={() => {
                            this.updateAuditStatus(3); 
                        }}>作废</p>}
                    </div>
                }
                <Modal
                    visible={cancelModalVisible}
                    transparent
                    maskClosable={false}
                    className={"cancelModal"}
                    footer={[
                        {text: '取消', onPress: () => {
                            this.closeCancelModal(); 
                        }}, 
                        {text: '作废', onPress: () => {
                            this.sureCancel(3); 
                        }}
                    ]}
                >
                    <p className={styles.delText}>本条记录即将作废，您确定继续操作吗？</p>
                </Modal>
                <Modal
                    visible={failedModalVisible}
                    transparent
                    maskClosable={false}
                    className={"cancelModal"}
                    footer={[
                        {text: '我知道了', onPress: () => {
                            this.failedIKnow();
                        }}
                    ]}
                >
                    <p className={styles.delText}>{failedText}</p>
                </Modal>
            </div>
        );
    }
}