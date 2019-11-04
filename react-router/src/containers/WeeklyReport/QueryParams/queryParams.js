import React from 'react';
import {Menu} from 'antd-mobile';
import axios from '../../../utils/axiosApi';
import styles from './queryParams.scss';
const weeklyTypeData = [
    {label: '年级周报', value: '1'},
    {label: '班级周报', value: '2'}
];
export default class QueryParams extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            evaTypesData: [],   //  评价方案的数组
            curEvaTypeIndex: 0, //  默认选中第一个类型
            searchCurIndex: -1, 
            gradeAndClazzData: [],  //  全部年级班级数组
            gradeOrClazzVal: [],    //  选中的年级或者班级的值
            gradeOrClazzText: '',   //  选中的年级或者班级的文字回显
            weeksData: [],  //  周信息数组
            weekMenuShow: false,
            weekVal: [],
            weekText: '本周',
            weeklyTypeMenuShow: false,
            gradeOrClazzMenuShow: false,
            weeklyTypeVal: ['1'],   //  年级周报和班级周报下拉选择的值  1年级周报 2班级周报
            weeklyFlag: false,  //  获得展示周报标志位(true)展示  false:班主任权限
            showGradeReport: false,  //  是否展示年级周报
            allGradeIds: null, 
            allClazzIds: null
        };
        this.queryParams = {};
    }

    componentDidMount () {
        this.getWeeks();
        this.getWeeklyFlag();
    }

    getEvaTypes = () => {
        let url = '/auth/global/evaluation/eva/chart/getEvaTypes.htm';
        axios('get', url).then((json) => {
            if (json.success) {
                let evaTypesData = json.data;
                this.setState({evaTypesData});
                if (evaTypesData.length) {
                    let item = evaTypesData[0];
                    let {schoolId, id, evaStdType, targetType} = item;
                    this.queryParams = Object.assign(this.queryParams, {schoolId, typeId: id, evaStdType, targetType});
                    this.getGradeAndClazz(schoolId, id);
                } else {
                    //  没有评价项目有
                    this.sureSearch(true);
                }
            }
        }); 
    }

    //  获得展示周报标志位
    //  true:展示年级周报  false:班主任权限
    getWeeklyFlag = () => {
        let url = '/auth/global/evaluation/eva/chart/getWeeklyFlag.htm';
        axios('get', url).then((json) => {
            let weeklyType = '';
            if (json.success) {
                if (json.data) {
                    this.queryParams.weeklyType = '1';
                    weeklyType = '1';
                } else {
                    this.queryParams.weeklyType = '2';
                    weeklyType = '2';
                }
            } 
            this.setState({weeklyFlag: json.data, weeklyTypeVal: [weeklyType]}, () => {
                this.getEvaTypes();
            });
        });
    }

    //  得到周的数据
    getWeeks = () => {
        let url = '/auth/global/evaluation/eva/chart/getWeeks.htm';
        axios('get', url).then((json) => {
            this.handleWeeksData(json.data);
        });
    }

    //  处理周的数据为menu需要的格式
    handleWeeksData = (sourceData) => {
        let weeksData = [];
        for (let i = 0; i < sourceData.length; i++) {
            let item = sourceData[i];
            let text = `第${item.weekNo}周`;
            if (i === 0) {
                text = '本周';
            }
            let value = `${item.startDate}--${item.endDate}--${text}`;
            if (i === 0 ) {
                this.setState({weekVal: [value]});
                let startDate = item.startDate;
                let endDate = item.endDate;
                this.queryParams.startDate = startDate;
                this.queryParams.endDate = endDate;
            }
            let label = `${text} ${item.startDate} ~ ${item.endDate}`;
            let obj = {label, value};
            weeksData.push(obj);
        }
        this.setState({weeksData});
    }

    //  拿到年级和班级的数据
    getGradeAndClazz = (schoolId, typeId) => {
        let url = '/auth/global/evaluation/eva/chart/getGradeClazzs.htm';
        axios('get', url, {schoolId, typeId}).then((json) => {
            this.handleGradeAndClazzData(json.data);
        });
    }

    //  处理年级和班级的数据，每个班级选择最前面加上当前年级
    handleGradeAndClazzData = (gradeAndClazzData) => {
        const {weeklyFlag, weeklyTypeVal} = this.state;
        let allGradeIds = '';
        let allClazzIds = [];
        
        for (let i = 0; i < gradeAndClazzData.length; i++) {
            let item = gradeAndClazzData[i];
            let label = item.label;
            let value = '';
            let children = item.children;
            if (i === gradeAndClazzData.length - 1) {
                allGradeIds += item.value;
            } else {
                allGradeIds += item.value + ',';
            }
            if (children.length) {
                for (let j = 0; j < children.length; j++) {
                    let cItem = children[j];
                    if (j === children.length - 1) {
                        value += cItem.value;
                    } else {
                        value += cItem.value + ',';
                    }
                    allClazzIds.push(cItem.value);
                }
            } else {
                value = null;
            }
            let obj = {label, value};
            children.unshift(obj);
        }

        if (allClazzIds.length) {
            allClazzIds = allClazzIds.join(',');
        } else {
            allClazzIds = '';
        }
        
        let firstGrade = gradeAndClazzData[0];
        let gradeIds = firstGrade.value;
        let clazzIds = firstGrade.children[0].value;
        if (!weeklyFlag || weeklyTypeVal[0] === '2') {
            this.queryParams.gradeIds = gradeIds;
            if (!weeklyFlag) {
                this.queryParams.clazzIds = null;
            } else {
                this.queryParams.clazzIds = clazzIds;
            }
        } else {
            this.queryParams.gradeIds = allGradeIds || null;
            this.queryParams.clazzIds = allClazzIds || null;
        }
        let gradeOrClazzText = firstGrade.children[0].label;
        // 页面初始化选择数据  
        this.sureSearch();
        this.setState({allGradeIds, allClazzIds, gradeAndClazzData, gradeOrClazzText, gradeOrClazzVal: [gradeIds, clazzIds]});
    }

    //  改变评价方案
    changeEvaType = (val) => {
        this.setState({weekMenuShow: false, weeklyTypeMenuShow: false, gradeOrClazzMenuShow: false});
        let {curEvaTypeIndex, evaTypesData} = this.state;
        if (val !== curEvaTypeIndex) {
            this.setState({curEvaTypeIndex: val});
            let item = evaTypesData[val];
            let {id, evaStdType, targetType, schoolId} = item;
            this.queryParams = Object.assign(this.queryParams, {typeId: id, evaStdType, targetType});
            this.getGradeAndClazz(schoolId, id);
        }
    }

    //  点击筛选项
    showSearch = (index) => {
        this.setState({searchCurIndex: index});
        if (index === 0) {
            this.setState({weekMenuShow: true, weeklyTypeMenuShow: false, gradeOrClazzMenuShow: false});
        } else if (index === 1) {
            this.setState({weeklyTypeMenuShow: true, weekMenuShow: false, gradeOrClazzMenuShow: false});
        } else if (index === 2) {
            this.setState({gradeOrClazzMenuShow: true, weekMenuShow: false, weeklyTypeMenuShow: false});
        }
    }

    //  改变周报统计时间
    changeWeek = (val) => {
        let startDate = val[0].split('--')[0];
        let endDate = val[0].split('--')[1];
        let weekText = val[0].split('--')[2];
        this.setState({weekVal: val, weekMenuShow: false, weekText});
        this.queryParams.startDate = startDate;
        this.queryParams.endDate = endDate;
        this.sureSearch();
    }

    //  改变周报统计方式
    changeWeeklyTypeMenu = (val) => {
        const {allGradeIds, allClazzIds} = this.state;
        if (val[0] === '1') {
            this.queryParams.gradeIds = allGradeIds || null;
            this.queryParams.clazzIds = allClazzIds || null;
        } else {
            const {gradeOrClazzVal} = this.state;
            let gradeIds = gradeOrClazzVal[0];
            let clazzIds = gradeOrClazzVal[1];
            this.queryParams.gradeIds = gradeIds;
            this.queryParams.clazzIds = clazzIds;
        }
        this.setState({weeklyTypeVal: val});
        this.queryParams.weeklyType = val[0];
        this.setState({weeklyTypeMenuShow: false});
        this.sureSearch();
    }

    //  改变统计年级
    changeGradeOrClazz = (val) => {
        const {gradeAndClazzData, weeklyFlag} = this.state;
        let gradeIds = val[0];
        let clazzIds = val[1];
        this.queryParams.gradeIds = gradeIds;
        this.queryParams.clazzIds = clazzIds;
        console.log(typeof clazzIds, 'typeof clazzIds');
        
        //  需求：如果是班主任权限，选择年级的时候，需要查出所有的年级，不需要传递clazzIds
        if (!weeklyFlag) {
            if (typeof clazzIds === 'string') {
                this.queryParams.clazzIds = null;
            }
        } 

        this.sureSearch();
        
        let curGradeItem = gradeAndClazzData.find((item) => {
            return item.value === gradeIds;
        });
        let curClazzIndex = curGradeItem.children.findIndex((item) => {
            return item.value === clazzIds;
        });

        let gradeOrClazzText = curGradeItem.children[curClazzIndex].label;
        this.setState({gradeOrClazzVal: val, gradeOrClazzText, gradeOrClazzMenuShow: false});
    }

    closeBg = () => {
        this.setState({weeklyTypeMenuShow: false, gradeOrClazzMenuShow: false, weekMenuShow: false});
    }

    //  拿到所有的参数，查询数据
    sureSearch = (noEva) => {
        this.props.getQueryParams(this.queryParams, noEva); 
    }

    render() {
        const {evaTypesData, weeklyTypeMenuShow, gradeOrClazzMenuShow, 
            curEvaTypeIndex, weekMenuShow, weeksData, weekVal, weekText,
            weeklyTypeVal, weeklyFlag,
            gradeAndClazzData, gradeOrClazzVal, gradeOrClazzText} = this.state;
        const weekMenu = 
            <Menu className={`oneColumnMenu commonMenu ${styles.commonMenu} ${styles.weekMenu}`}
                data={weeksData}
                level={1}
                value={weekVal}
                onChange={this.changeWeek}
            />;
        
        const weeklyTypeMenu = 
            <Menu className={`oneColumnMenu commonMenu ${styles.commonMenu} ${styles.weeklyTypeMenu} weeklyTypeMenu`}
                data={weeklyTypeData}
                level={1}
                value={weeklyTypeVal}
                onChange={this.changeWeeklyTypeMenu}
            />;

        const gradeOrClazzMenu = 
            <Menu className={`twoColumnsMenu commonMenu ${styles.commonMenu} gradeMenu`}
                data={gradeAndClazzData}
                value={gradeOrClazzVal}
                onChange={this.changeGradeOrClazz}
            />;

        const {searchCurIndex} = this.state;
        return (
            <div className={styles.queryParams}>
                <div className={styles.targetTypeWrap}>
                    <div className={styles.targetType}>
                        {evaTypesData.map((item, index) => {
                            return <span key={item.id} className={`f-ellipsis ${curEvaTypeIndex === index ? styles.curType : ''}`}
                                onClick={() => {
                                    this.changeEvaType(index);
                                }}
                            >{item.name}</span>;
                        })}
                    </div>
                </div>
                <div className={`searchTitle`}>

                    {/* 时间筛选项 */}
                    <span className={`oneTitleWrap ${searchCurIndex === 0 ? 'curTitle' : ''}`} onClick={() => {
                        this.showSearch(0);
                    }}>
                        <span className={`titleVal f-ellipsis`}>{weekText}</span>
                        <i className={`evaiconfont styles.arrowUp`}>&#xe82f;</i>
                    </span>

                    {/* 年级周报筛选项 */}
                    {weeklyFlag ? 
                        <span className={`oneTitleWrap ${searchCurIndex === 1 ? 'curTitle' : ''}`} onClick={() => {
                            this.showSearch(1);
                        }}>
                            <span className={`titleVal f-ellipsis`}>{weeklyTypeVal[0] === '1' ? '年级周报' : '班级周报'}</span>
                            <i className="evaiconfont">&#xe82f;</i>
                        </span> : <span className={'oneTitleWrap'}><span className="titleVal f-ellipsis">班级周报</span></span>
                    }
                    
                    
                    {/* {weeklyTypeVal[0] === '1' ?
                        <span className={'oneTitleWrap'}><span className="titleVal f-ellipsis">{weeklyFlag ? '全部年级' : '全部班级'}</span></span> : 
                        <span className={`oneTitleWrap ${searchCurIndex === 2 ? 'curTitle' : ''}`} onClick={() => {
                            this.showSearch(2);
                        }}>
                            <span className={`titleVal f-ellipsis`}>{gradeOrClazzText}</span>
                            <i className="evaiconfont">&#xe82f;</i>
                        </span>} */}
                    
                    {/* 年级筛选项 */}
                    {weeklyTypeVal[0] === '1' && weeklyFlag ? <span className={'oneTitleWrap'}><span className="titleVal f-ellipsis">{'全部年级'}</span></span>
                        : <span className={`oneTitleWrap ${searchCurIndex === 2 ? 'curTitle' : ''}`} onClick={() => {
                            this.showSearch(2);
                        }}>
                            <span className={`titleVal f-ellipsis`}>{gradeOrClazzText}</span>
                            <i className="evaiconfont">&#xe82f;</i>
                        </span>}
                    
                </div>
                {(weeklyTypeMenuShow || gradeOrClazzMenuShow || weekMenuShow) && <div className={styles.bgShade} onClick={this.closeBg}></div> }
                {weekMenuShow && weekMenu}
                {weeklyTypeMenuShow && weeklyTypeMenu}
                {gradeOrClazzMenuShow && gradeOrClazzMenu}
            </div>
        );
    }
}