import React, {Component} from 'react';
import FrameText from '../../../components/FrameText';
import styles from './behavior.scss';

import axios from '../../../components/axiosApi';
import {connect} from 'react-redux';
import {updateBehaviorData, updateStandardData} from '../../../store/actions';


//  这里是行为习惯管理模块
class Behavior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondActiveIndex: 0,
            secondId: '',
            thirdActiveIndex: 0,
            thirdItemList: [],
            behaviorData: {},
            firstItem: {},
            secondItemList: []
        };
    }

    getBehaviorItemData = () => {
        let secondId = "";
        let thirdActiveIndex = 0;
        let secondActiveIndex = 0;
        let behaviorData = this.props.behaviorData; 

        //  学生对象页面跳转回来，保留之前状态
        if (JSON.stringify(behaviorData) !== '{}' ) {
            if (behaviorData.thirdActiveIndex) {
                thirdActiveIndex = behaviorData.thirdActiveIndex;
            }
            if (behaviorData.secondActiveIndex) {
                secondActiveIndex = behaviorData.secondActiveIndex;
            } 
            secondId = behaviorData.secondId;
        }
        this.setState({secondActiveIndex, thirdActiveIndex});

        //  一级不是可评价项，请求二级菜单
        if (this.props.firstItem.initScore === null) {
            this.getSecondItemList(secondId, thirdActiveIndex);
        }
    }

    componentDidMount () {
        if (this.props.firstItem) {
            this.setState({firstItem: this.props.firstItem}, () => {
                this.getBehaviorItemData();
            });
        }
    }

    componentDidUpdate (prevProps) {
        let prefirstItem = JSON.stringify(prevProps.firstItem);
        let nowprefirstItem = JSON.stringify(this.props.firstItem);
        if (prefirstItem !== nowprefirstItem) {
            let firstItem = this.props.firstItem;
            this.setState({firstItem}, () => {
                this.getBehaviorItemData();
            });
        }
    }


    //  拿到二级行为的数据
    getSecondItemList = (preSecondId, thirdActiveIndex) => {
        let {id} = this.state.firstItem;
        let secondId = "";
        //  根据一级id获得二级列表项
        let secondUrl = "/auth/global/evaluation/eva/app/getSecondItem.htm";
        axios('get', secondUrl, {"itemId": id})
            .then((json) => {
                if (json.success) {
                    let data = json.data;
                    this.setState({secondItemList: data});
                    secondId = preSecondId ? preSecondId : data[0].id;

                    let {secondActiveIndex} = this.state;
                    //  二级不可评价 请求三级数据
                    if (json.data[secondActiveIndex].initScore === null) {
                        this.getThirdItem(secondId, thirdActiveIndex);
                    } else {
                        let shareStandardData = data[this.state.secondActiveIndex];
                        this.props.updateStandardData(shareStandardData);
                    }
                }
            });
    }

    //  点击二级行为习惯管理
    handleSecondItem = (secondActiveIndex, secondItem) => {
        let secondId = secondItem.id;
        this.setState({secondActiveIndex, secondId, thirdActiveIndex: 0});
        let {behaviorData} = this.state;
        behaviorData.secondActiveIndex = secondActiveIndex;
        behaviorData.secondId = secondId;
        this.props.updateBehaviorData(behaviorData);
        
        if (secondItem.initScore === null) {
            //  二级行为不可评价 请求三级
            this.getThirdItem(secondId, 0);
        } else {
            //  更新shareStandardItem
            let shareStandardData = secondItem;
            this.props.updateStandardData(shareStandardData);
        }
    }

     //  请求三级行为管理数据
     getThirdItem = (secondId, thirdActiveIndex) => {
         let thirdUrl = '/auth/global/evaluation/eva/app/getThirdItem.htm';
         axios('get', thirdUrl, {itemId: secondId})
             .then((json) => {
                 if (json.success) {
                     this.setState({thirdItemList: json.data});
                     this.updateThirdItem(json.data, thirdActiveIndex);
                    
                     if (json.data.length) {
                         let shareStandardData = json.data[thirdActiveIndex];
                         this.props.updateStandardData(shareStandardData);
                     }
                 }
             });
     }

    //  点击三级行为管理
    handleThirdItem = (thirdActiveIndex, item, e) => {
        let {behaviorData} = this.state;
        behaviorData.thirdItemDetail = item;
        behaviorData.thirdActiveIndex = thirdActiveIndex;
        this.props.updateBehaviorData(behaviorData);
        
        let shareStandardData = item;
        this.props.updateStandardData(shareStandardData);
        
        this.setState({thirdActiveIndex, behaviorData});

    }

    //  三级行为默认选中的处理
    updateThirdItem = (data, thirdActiveIndex) => {
        let thirdItemDetail = data[thirdActiveIndex];
        let {behaviorData} = this.state;
        behaviorData.thirdItemDetail = thirdItemDetail;
        behaviorData.thirdActiveIndex = thirdActiveIndex;
        this.props.updateBehaviorData(behaviorData);
        this.setState({behaviorData});
    }

    render () {
        const {secondActiveIndex, thirdItemList, thirdActiveIndex, secondItemList} = this.state;
        const {firstItem} = this.props;
        const firstInitScore = firstItem.initScore;
        const secondItemInitScore = secondItemList.length && secondItemList[secondActiveIndex].initScore;

        return (
            <div className={styles.behavior__wrap}>
                {firstInitScore === null && 
                <div className={styles.behavior__firstwrap}>
                    <div className={styles.behavior__first}>
                        {
                            secondItemList && secondItemList.map((item, index) => {
                                let {id, name} = item;
                                return (
                                    <span key={id} 
                                        onClick={(e) => {
                                            this.handleSecondItem(index, item, e);
                                        }}
                                        className={index === secondActiveIndex ? styles.secondActive : ''}
                                    >{name}</span>
                                );
                            })
                        }
                    </div>
                </div>
                }

                {/* 一级二级都不可评价才显示 */}
                {firstInitScore === null && secondItemInitScore === null && 
                    <div className={styles.behavior__second}>
                        {thirdItemList && thirdItemList.map((item, index) => {
                            let {id, name} = item;
                            return (
                                <span key={id} 
                                    className={styles.behavior__second_title}
                                    onClick={(e) => {
                                        this.handleThirdItem(index, item, e); 
                                    }}
                                >   
                                    <span className={"frameTextWrap"}>
                                        <FrameText text={name} 
                                            customClassName = {thirdActiveIndex === index ? 'frameTextActive' : 'frameText'}
                                            borderColor={thirdActiveIndex === index ? '#39b881' : ''}
                                            textColor={thirdActiveIndex === index ? '#39b881' : ''}
                                        />
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
        targetTypeData: state.targetTypeData,
        behaviorData: state.behaviorData, 
        firstItem: state.firstItem, 
        targetObject: state.targetObject,
        shareStandardData: state.shareStandardData
    }),
    {updateBehaviorData, updateStandardData}
)(Behavior);