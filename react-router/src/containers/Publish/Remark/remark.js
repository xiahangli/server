import React, {Component} from 'react';
import {TextareaItem} from 'antd-mobile';
import videoDefault from '../../../assets/images/videoDefault.png';
import play from '../../../assets/images/play.png';

import AssociateClazz from '../AssociateClazz/associateClazz';
import HandleInvolved from '../HandleInvolved/handleInvolved';
import constant from '../../../utils/constant';

import {connect} from 'react-redux';
import {updateBatchObjectArray} from '../../../store/actions';

import styles from './remark.scss';

class Remark extends Component {

    //  备注文字
    handleRemarkText = (remarkText1, curBatchIndex ) => {
        let {batchObjectArray} = this.props;
        //  过滤掉头像
        let remarkText = remarkText1.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        batchObjectArray[curBatchIndex].remarkText = remarkText;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    //  添加照片
    addPhoto = (curBatchIndex) => {
        let {batchObjectArray} = this.props;
        let remarkPicture = batchObjectArray[curBatchIndex].remarkPicture;
        if (remarkPicture) {
            remarkPicture = remarkPicture.split(';');
        } else {
            remarkPicture = [];
        }

        window.takePicture = (info)=>{
            if (info.path) {
                remarkPicture.push(info.path); 
            } else {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '图片上传失败'}]);
            }
            remarkPicture = remarkPicture.join(";");
            batchObjectArray[curBatchIndex].remarkPicture = remarkPicture;
            this.props.updateBatchObjectArray(batchObjectArray);
        }; 
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'takePicture', []);
    }

    // 显示图片
    showPhoto = (imgSrc)=>{
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'openPicture', [{'path': imgSrc}]);
    }

    // 删除图片
    delPic = (index, curBatchIndex) => {
        let {batchObjectArray} = this.props;
        let remarkPicture = batchObjectArray[curBatchIndex].remarkPicture;
        remarkPicture = remarkPicture.split(';');
        remarkPicture.splice(index, 1);
        remarkPicture = remarkPicture.join(';');
        batchObjectArray[curBatchIndex].remarkPicture = remarkPicture;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    //  添加视频
    addVideo = (curBatchIndex) => {
        let {batchObjectArray} = this.props;
        window.takeVideo = (info) =>{
            if (info.videoPath) {
                batchObjectArray[curBatchIndex].remarkVideo = JSON.stringify(info);
                this.props.updateBatchObjectArray(batchObjectArray);
            } else {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '视频上传失败'}]);
            }
        };
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'takeVideo', []);
    }

    // 显示视频
    showVideo = (curBatchIndex)=>{
        let {batchObjectArray} = this.props;
        let remarkVideo = batchObjectArray[curBatchIndex].remarkVideo;
        remarkVideo = JSON.parse(remarkVideo);
        window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'openVideo', [{'path': remarkVideo.videoPath}]);
    }

    // 删除视频
    delVideo = (curBatchIndex) => {
        let {batchObjectArray} = this.props;
        batchObjectArray[curBatchIndex].remarkVideo = null;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    render () {
        const {targetTypeData, curBatchIndex, batchObjectArray} = this.props;
        let remarkPicture = batchObjectArray[curBatchIndex].remarkPicture;
        if (remarkPicture) {
            remarkPicture = remarkPicture && remarkPicture.split(';');
        } else {
            remarkPicture = [];
        }
        let remarkVideo = batchObjectArray[curBatchIndex].remarkVideo;
        if (remarkVideo && typeof remarkVideo === 'string') {
            remarkVideo = JSON.parse(remarkVideo);
        }
        const placeholder = '请输入备注内容，不超过200字。';
        const cameraInitTxt = remarkPicture.length >= 1 ? `图片${remarkPicture.length}/5` : '添加图片';
        const videoInitTxt = '添加视频';
        const targetType = targetTypeData && targetTypeData.targetType;
        let pictureNum = 5;

        const lastModifyName = batchObjectArray[curBatchIndex].lastModifyName;
        const lastModifyOn = batchObjectArray[curBatchIndex].lastModifyOn;
        
        return (
            <div className={`${styles.remark__wrap} remark__wrap`}>
                <p className={styles.title}>备注<span>&nbsp;(选填)</span></p>
                {/* 备注文字 */}
                <div className={`${styles.text__wrap} textWrap`}>
                    <TextareaItem 
                        placeholder={placeholder}
                        count={200}
                        autoHeight={true}
                        value={batchObjectArray[curBatchIndex].remarkText}
                        defaultValue={batchObjectArray[curBatchIndex].remarkText}
                        onChange={(val) => {
                            this.handleRemarkText(val, curBatchIndex);
                        }}
                    />
                </div>
                
                {/* 图片和视频的上传 */}
                <div className={`${styles.upload_container} cf`}>
                    {/* 图片 */}
                    {remarkPicture.map((item, index) => {
                        return (
                            <div className={styles.upload_img_wrapper} key={item}>
                                <div className={styles.close_wrapper} onClick={() => {
                                    this.delPic(index, curBatchIndex);
                                }}>
                                    <i className="evaiconfont evaClose">&#xe6ea;</i>
                                </div>
                                <img className={styles.upload_img} src={item} onClick={()=>this.showPhoto(item)} />
                            </div>
                        );
                    })}
                    {
                        remarkPicture.length >= pictureNum ? '' : <div className={styles.add_default} onClick={() => {
                            this.addPhoto(curBatchIndex);
                        }}>  
                            <i className="evaiconfont">&#xe61a;</i>
                            <div className={styles.txt}>{cameraInitTxt}</div> 
                        </div>
                    }
                </div>

                <div className={`${styles.upload_container} cf`}>
                    {/* 视频 */}
                    { remarkVideo ? 
                        <div className={styles.upload_img_wrapper}>
                            <div className={styles.close_wrapper} onClick={() => {
                                this.delVideo(curBatchIndex);
                            }}>
                                <i className="evaiconfont evaClose">&#xe6ea;</i>
                            </div>
                            <div className={styles.videoImg} onClick={()=>this.showVideo(curBatchIndex)}>
                                <span><img src={play}/></span>
                                <img className={styles.upload_img} src={remarkVideo && remarkVideo.thumbnailPath ? remarkVideo.thumbnailPath : videoDefault} />
                            </div>
                        </div> 
                        : 
                        <div className={`${styles.add_default} ${styles.iconVideo}`} onClick={() => {
                            this.addVideo(curBatchIndex);
                        }}>
                            <i className={`evaiconfont`}>&#xe619;</i>
                            <div className={styles.txt}>{videoInitTxt}</div>
                        </div> 
                    }
                </div>
                {targetType !== 1 && 
                    <div className={styles.association}>
                        {(targetType === 2 || targetType === constant.dormType) && <p className={styles.associationTitle}>关联学生<span>(选填)</span></p>}
                        {(targetType === 2 || targetType === constant.dormType) && <HandleInvolved history={this.props.history} curBatchIndex={curBatchIndex} />}
                        {targetType === constant.dormType && <p className={styles.associationTitle}>关联班级</p>}
                        {targetType === constant.dormType && <AssociateClazz curBatchIndex={curBatchIndex} />} 
                    </div>
                }
                {lastModifyName && 
                <p className={styles.history__time}>
                上一次：{lastModifyName} 于 {lastModifyOn} 提交
                </p>}
            </div>
        );
    }
}

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
        targetTypeData: state.targetTypeData,
        batchObjectArray: state.batchObjectArray
    }),
    {updateBatchObjectArray}
)(Remark);

