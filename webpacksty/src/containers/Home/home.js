import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateTargetTypeData, deleteFirstItem, deleteBehaviorData, 
    updateBatchObjectArray} from '../../store/actions';

import axios from '../../utils/axiosApi';

import BlankImg from '../../components/BlankImg';
import LoadingComponent from '../../components/Loading';

import styles from "./home.scss";

import imgDefault from "../../assets/images/indexDefault.png";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            showFlagData: '',   //  主页我发布的等入口是否展示数据
            unauditedNum: '',
            isShowLoadingComponent: true,  //  是否显示加载中
            blankText: ''
        }; 
    }
    
    componentDidMount () {
        document.addEventListener('deviceready', function() {
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showShadowView', [{'content': true}]);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
            window.LeTalkCorePlugin.customBack('');
        }, false);

        let url = '/auth/global/evaluation/eva/app/hasStudentAuth.htm';
        axios('get', url).then((json) => {
            if (json.data) {
                this.getTargets();
            } else {
                this.setState({blankText: '抱歉，您的账号没有评价权限', isShowLoadingComponent: false});
            }
        });
    }

    getTargets = () => {
        axios('get', '/auth/global/evaluation/eva/app/getTargets.htm')
            .then((json) => {
                if (json.success) {
                    let listData = json.data || [];
                    this.setState({listData}, () => {
                        if (listData.length) {
                            this.props.updateTargetTypeData(json.data[0]);
                        }
                        let schoolId = json.ticket;
                        sessionStorage.setItem('schoolId', schoolId);
                        this.getShowFlag(schoolId);
                    });
                }
            });
    }

    getShowFlag = (schoolId) => {
        let url = '/auth/global/evaluation/eva/app/getShowFlag.htm';
        axios('get', url, {schoolId}).then((json) => {
            if (json.success) {
                this.setState({showFlagData: json.data}, () => {
                    this.setState({isShowLoadingComponent: false});
                });
                sessionStorage.setItem('showFlagData', JSON.stringify(json.data));

                if (json.data.needAudit ) {
                    this.getUnauditedNum(schoolId);
                }
            } else {
                this.setState({isShowLoadingComponent: false});
            }
        }); 
    }

    getUnauditedNum = (schoolId) => {
        let url = '/auth/global/evaluation/eva/app/getUnauditedNum.htm';
        axios('get', url, {schoolId}).then((json) => {
            let unauditedNum = json.data;
            if (unauditedNum >= 99) {   
                unauditedNum = `99+`;
            }
            this.setState({unauditedNum});
        });
    }

    getTypeItem = (e, item) => {
        this.props.updateTargetTypeData(item);
        
        this.clearStatus();
    }

    //    把之前的状态清空 重头来过
    clearStatus = () => { 
        let nullObj = {};

        this.props.deleteFirstItem(nullObj);

        this.props.deleteBehaviorData(nullObj);

        this.props.updateBatchObjectArray([]);
    }

    render() {
        const {listData, unauditedNum, isShowLoadingComponent, showFlagData, blankText} = this.state;
        let hasPublish, needAudit, hasWeeklyReport, hasMyRecord;
        if (showFlagData) {
            hasPublish = showFlagData.hasPublish;
            needAudit = showFlagData.needAudit;
            hasWeeklyReport = showFlagData.hasWeeklyReport;
            hasMyRecord = showFlagData.hasMyRecord;
        }
        let isLekePad = sessionStorage.getItem('isLekePad');
        return (
            <div className={styles.container}>
                {listData.length ? <div className={styles.oneWrap}>
                    <div className={styles.titleWrap}>
                        <i className={"evaiconfont"}>&#xe63e;</i>
                        <span className={styles.title}>发布评价</span>
                    </div>
                    <ul className={`cf ${styles.toPublish}`}>
                        {
                            listData.map(item => {  
                                const {name, id, typeIcon} = item;
                                let Imgsrc = typeIcon ? typeIcon : imgDefault; 
                                return (
                                    <li 
                                        key={id}
                                        onClick={(e) => { 
                                            this.getTypeItem(e, item);
                                        }}
                                    >
                                        <Link to={`/evaluate/publish`} replace={true}>  
                                            <img src={Imgsrc} />  
                                            <p>{name}</p>   
                                        </Link> 
                                    </li>
                                );
                            })}
                    </ul></div> : ''}
                {hasPublish || needAudit || hasWeeklyReport || hasMyRecord ? 
                    <div className={styles.oneWrap}>
                        <div className={styles.titleWrap}>
                            <i className={'evaiconfont'}>&#xe63d;</i>
                            <span className={styles.title}>评价管理</span>
                        </div>
                        <ul className={`cf ${styles.toPublish}`}>
                            {hasPublish && 
                            <li>
                                <Link to={`${isLekePad ? '/hd/iReleased' : '/iReleased'}`} replace={true}>  
                                    <img src="https://static.leke.cn/images/mobile/letao/evaluation/publish.png" />  
                                    <p>我发布的</p>   
                                </Link> 
                            </li>}
                            {needAudit &&   
                            <li>
                                <Link to={{pathname: `${isLekePad ? '/hd/toAudit' : '/toAudit'}`, query: {isGohome: 1}}} replace={true} className={styles.linkInner}>  
                                    <img src="https://static.leke.cn/images/mobile/letao/evaluation/toAudit.png" />  
                                    <p>待我审核</p>  
                                    <span className={styles.num}>{`${unauditedNum}`}</span>
                                </Link> 
                            </li> }
                            {hasMyRecord && <li>
                                <Link to={'/hd/MyRecords'} replace={true}>
                                    <img src="https://static.leke.cn/images/mobile/letao/evaluation/aboutMe.png"/>
                                    <p>关于我的</p>
                                </Link>
                            </li>}
                        </ul></div> : ''}

                {hasWeeklyReport ? <div className={styles.oneWrap}>
                    <div className={styles.titleWrap}>
                        <div className={styles.title}>数据公示</div>
                    </div>
                    <ul className={`cf ${styles.toPublish}`}>
                        <li>
                            <Link to={`/weeklyReport`} replace={true}>  
                                <img src="https://static.leke.cn/images/mobile/letao/evaluation/weekly.png" />  
                                <p>周报分析</p>   
                            </Link> 
                        </li>
                    </ul>
                </div> : ''}
                {isShowLoadingComponent && <LoadingComponent />}
                {!isShowLoadingComponent && !listData.length && !showFlagData && <div className={styles.blankWrap}>
                    <BlankImg content={blankText} /></div>}
                <div className={styles.bgShade}></div> 
            </div> 
        );
    }
}

// 向外暴露连接组件的包装组件
export default connect(
    state => ({
    }),
    {updateTargetTypeData, deleteFirstItem, deleteBehaviorData, 
        updateBatchObjectArray}
)(Home);

