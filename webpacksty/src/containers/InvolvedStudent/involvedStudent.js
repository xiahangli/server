import React, {Component} from 'react';
import {connect} from 'react-redux';
import delPic from '../../assets/images/del.png';
import styles from './involvedStudent.scss';
import axios from '../../utils/axiosApi';
import {updateBatchObjectArray} from '../../store/actions';
import BlankImg from '../../components/BlankImg';
import initReactFastclick from 'react-fastclick';
import LoadingComponent from '../../components/Loading';
class Involved extends Component {
    constructor (props) {
        super(props);
        this.state = {
            checkedActors: [],
            isClearIconShow: false,         //  取消按钮是否显示
            searchPanelShow: false,  //  显示搜索面板
            searchKeyWords: '',      //  用户输入的搜索内容
            actorsListAll: [],         //  一进到页面，查询到的所有的涉事人列表集合
            actorsList: [],         //  根据条件查询到的所有的学生
            targetType: '',  //  类型
            showSureBtn: true,   //  解决键盘弹起的时候，底部按钮会被顶上去的问题，当键盘弹起，按钮隐藏
            isLoading: true //  页面正在加载中的标识  页面初次进来，不会默认请求数据
        };
    }

    componentDidMount () {
        this.isAndroidFn();
        initReactFastclick();
        if (this.isAndroid) {
            this.listenKeyBoard();
        }
        document.addEventListener('deviceready', function() {
            // window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'show1Title', ['关联学生']);
            window.LeTalkCorePlugin.customBack('custom');
        }, false);

        window.clickBack = () => {
            this.props.history.replace({pathname: '/evaluate/publish'});
        };

        let curBatchIndex = this.props.location.query.curBatchIndex;
        let checkedActors = this.props.batchObjectArray[curBatchIndex].actors;
        
        let targetType = this.props.firstItem.targetType;
        this.setState({targetType});

        if (checkedActors && typeof checkedActors === 'string') {
            checkedActors = JSON.parse(checkedActors);
        }
        if (checkedActors && checkedActors.length) {
            this.setState({checkedActors}, () => {
                this.goSearch();
            });
        } else {
            this.goSearch();
        }
    }

    //  判断是否是安卓手机
    isAndroidFn = () => {
        let UA = navigator.userAgent;
        let isAndroid = /android|adr/gi.test(UA), isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid;
        if (isIos) {
            this.isAndroid = false;
        } else {
            this.isAndroid = true;
        }
    }

    listenKeyBoard = () => {
        //获取原窗口的高度
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;

        window.onresize = () => {
            var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (resizeHeight - 0 < originalHeight - 0){
                //当软键盘弹起，在此处操作
                console.log('软键盘弹起');
                this.setState({showSureBtn: false});
            } else {
                //当软键盘收起，在此处操作
                this.setState({showSureBtn: true});
                console.log('软键盘收起');
            }
        };
    }

    inputChange = (e) => {
        let searchKeyWords = e.target.value;
        searchKeyWords = searchKeyWords.replace(/\s*/g, '');
        if (searchKeyWords) {
            this.setState({isClearIconShow: true, searchPanelShow: true});
        } else {
            this.setState({isClearIconShow: false, searchPanelShow: false});
            //  给出所有的数据
            this.filterList('findAll');
        }
        this.setState({searchKeyWords});
    }

    //  搜索框失去焦点
    inputBlur = () => {
        if (!this.isAndroid) {
            this.setState({showSureBtn: true});
        }
        this.setState({isClearIconShow: false});
    }

    //  搜索框聚焦
    inputFocus = () => {
        if (!this.isAndroid) {
            this.setState({showSureBtn: false});
        }
        if (this.state.searchKeyWords) {
            this.setState({isClearIconShow: true});
        }
    }

    handleStu = (studentId) => {
        let {actorsList, checkedActors} = this.state;
        let curActorIndex = actorsList.findIndex((item) => {
            return item.studentId === studentId;
        });
        let isChecked = actorsList[curActorIndex].isChecked;

        if (isChecked) {
            //  选中 --->不选中
            let delIndex = checkedActors.findIndex((item) => {
                return item.studentId === studentId;
            });
            checkedActors.splice(delIndex, 1);
        } else {
            //  不选中 --->选中
            checkedActors.push(actorsList[curActorIndex]);
        }
        actorsList[curActorIndex].isChecked = !isChecked;
        this.setState({actorsList, checkedActors});
    }

    clearKeyWords = () => {
        document.getElementById('inputId').blur();
        this.setState({searchKeyWords: '', searchPanelShow: false, isClearIconShow: false}, () => {
            this.filterList('findAll');
        });
    }

    //  首次加载到所有涉事人列表
    goSearch = () => {
        const {targetType, schoolId} = this.props.firstItem;
        let curBatchIndex = this.props.location.query.curBatchIndex;

        const {batchObjectArray} = this.props;
        
        let params = {};
        let url = '';

        if (targetType === 2) {
            //  班级对象
            url = '/auth/global/evaluation/eva/app/getInvolvedClazz.htm';
            const clazzId = batchObjectArray[curBatchIndex].clazzId;  
            params.clazzId = clazzId;
            params.schoolId = schoolId;
            params.content = '';
        } else if (targetType === 3) {
            //  宿舍对象
            url = '/auth/global/evaluation/eva/app/getInvolvedStudentForDorm.htm';
            const dormId = batchObjectArray[curBatchIndex].dormId;
            params.dormId = dormId;
        }

        axios('get', url, params).then((json) => {
            if (json.success) {
                //  已选的的学生，进行打钩处理
                let actorsList = json.data || [];
                let {checkedActors} = this.state;
                if (checkedActors.length && actorsList.length) {
                    actorsList = this.handleHasCheckedStu(actorsList);
                }
                this.setState({actorsList, actorsListAll: json.data || [], isLoading: false});
            } else {
                this.setState({actorsList: [], actorsListAll: []});
            }
        });
        this.setState({searchPanelShow: false});
    }

    // 根据用户的输入，过滤列表
    filterList = (findAll) => {
        //  findAll 如果用户删除所有的输入条件，就展示所有的学生列表
        const {actorsListAll} = this.state;
        let actorsList;
        if (findAll === 'findAll') {
            actorsList = actorsListAll;
        } else {
            actorsList = [];
        }
        if (findAll !== 'findAll') {
            const content = this.state.searchKeyWords;
            //  如果是数字，则根据学号过滤数组，否则，根据学生姓名过滤数组
            let notNumber = isNaN(content);
            if (notNumber) {
                //  根据学生姓名筛选数组
                actorsList = actorsListAll.filter((item) => {
                    return item.studentName.indexOf(content) !== -1;
                });
               
            } else {
                //  根据学号筛选数组
                actorsList = actorsListAll.filter((item) => {
                    return item.studentNo && item.studentNo.indexOf(content) !== -1;
                });
            }
        }
        let {checkedActors} = this.state;
        if (checkedActors.length && actorsList.length) {
            actorsList = this.handleHasCheckedStu(actorsList);
        }
        document.getElementById('inputId').blur();
        this.setState({actorsList, searchPanelShow: false});
    }

    //  已选的的学生，进行打钩处理
    handleHasCheckedStu = (actorsList) => {
        let {checkedActors} = this.state;
        actorsList.forEach((item) => {
            item.isChecked = false;
            let studentId = item.studentId;
            let hasIndex = checkedActors.findIndex((item1) => {
                return studentId === item1.studentId;
            });
            if (hasIndex > -1) {
                item.isChecked = true;
            }
        });
        return actorsList;
    }

    //  删除涉事人
    delActor = (studentId, index) => {
        let {actorsList, checkedActors} = this.state;
        checkedActors.splice(index, 1);
        let unCheckIndex = actorsList.findIndex((item) => {
            return item.studentId === studentId;
        });
        if (unCheckIndex > -1) {
            actorsList[unCheckIndex].isChecked = false;
            this.setState({actorsList});
        }
        this.setState({checkedActors});
    }

    choseConfirm = () => {
        const {checkedActors} = this.state;
        let curBatchIndex = this.props.location.query.curBatchIndex;
        let {batchObjectArray} = this.props;
        batchObjectArray[curBatchIndex].actors = JSON.stringify(checkedActors);
        this.props.updateBatchObjectArray(batchObjectArray);
        this.props.history.replace({pathname: '/evaluate/publish'});
    }

    render () {
        const {checkedActors, searchPanelShow, searchKeyWords, actorsList, isClearIconShow, 
            showSureBtn, isLoading} = this.state;
        const {batchObjectArray} = this.props;
        let curBatchIndex = this.props.location.query.curBatchIndex;

        const {targetType} = this.props.firstItem;
        let echoObj = '';
        if (targetType === 2) {
            echoObj = batchObjectArray[curBatchIndex].clazzName;
        } else if (targetType === 3) {
            echoObj = batchObjectArray[curBatchIndex].objectVal;
        }
        return (
            <div>
                <div className={`${styles.involvedWrap} ${showSureBtn ? '' : styles.hideSureBtnClass} ` }>
                    <div className={styles.searchWrap}>
                        <div className={styles.inputWrapper}>
                            <i className="evaiconfont searchIcon">&#xe735;</i>
                            <input type="text" className={styles.inputStyle}
                                placeholder="请输入学生姓名或学号"
                                onChange={this.inputChange}
                                value={searchKeyWords}
                                onBlur={this.inputBlur}
                                onFocus={this.inputFocus}
                                id="inputId"
                            />
                            {isClearIconShow && 
                            <span className="clearIcon" onClick={this.clearKeyWords}><i className="evaiconfont">&#xe81d;</i></span>
                            }
                        </div>
                    </div>
                    {searchPanelShow && 
                        <div className={styles.searchPanel}>
                            <div className={styles.hrLine}></div>
                            <div onClick={this.filterList} className={styles.keyBoxStyle}>搜索：<span className={styles.keywords}>{searchKeyWords}</span></div>
                        </div>
                    }
                    <div className={styles.hasChecked}>
                        <span className={styles.title}>已选择</span>
                        <div className={styles.checkedList}>
                            {
                                checkedActors.map((item, index) => {
                                    return <span className={styles.oneStu} key={item.studentId}>
                                        {item.studentName}&nbsp;&nbsp;{item.studentNo}
                                        <span className={styles.del} onClick={() => {
                                            this.delActor(item.studentId, index);
                                        }}>
                                            <img src={delPic}/>
                                        </span>
                                    </span>;
                                })  
                            }
                        </div>
                    </div>
                    <div className={styles.echoGrade}>{echoObj}</div>
                    <div className={styles.searchResultWrapper}>
                        {actorsList.map((item) => {
                            return <div key={item.studentId} className={styles.oneStuRecord} onClick={() => {
                                this.handleStu(item.studentId);
                            }}>
                                <span className={styles.leftIcon}>
                                    {item.isChecked ? <i className={`${styles.checkedIcon} evaiconfont`}>&#xe670;</i> : <i className="evaiconfont">&#xe753;</i>}
                                </span>
                                <div className={`${styles.stuInfo} cf`}>
                                    <span className={`${styles.name} f-ellipsis`}>{item.studentName}</span>
                                    <span className={styles.stuNo}>{item.studentNo}</span>
                                    <span className={styles.clazzName}>{item.clazzName}</span>
                                </div>
                            </div>;
                        })}
                    </div>
                    {actorsList.length && <div className={styles.btnFixed}>
                        {
                            checkedActors.length ? 
                                <div className={ styles.confirmBtnActive} 
                                    onClick={this.choseConfirm}>确定</div> : 
                                <div className={styles.confirmBtn}>确定</div>
                        }
                    </div>}
                    {!actorsList.length && !isLoading && <div className={styles.blankWrap}><BlankImg content={'查询无结果'} /></div>}
                    {isLoading && <LoadingComponent />}
                </div>
                <div className={styles.bgShade}></div>
            </div>
        );
    }
}

export default connect(
    state => ({
        firstItem: state.firstItem,
        batchObjectArray: state.batchObjectArray
    }),
    {updateBatchObjectArray}
)(Involved);