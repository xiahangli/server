import React from 'react';
import constant from '../../../utils/constant';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const _ = require('lodash');
const F2 = require('@antv/f2');

const filterArr = [
    {name: '得分', val: 0},
    {name: '加分', val: 1},
    {name: '扣分', val: 2},
];
export default class WeeklyTrend extends React.Component{
    
    constructor (props) {
        super(props);
        this.state = {
            curTabIndex: 0,
            countByScore: [],
            countByAdd: [],
            countBySubstract: []
        };
        this.hasRenderFirst = false;
    }

    componentDidMount () {
        if (this.props.sourceData && this.props.sourceData.minusScores && this.props.sourceData.minusScores.length) {
            this.handleChartData(this.props.sourceData);
        } else {
            this.hasRenderFirst = false;
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.sourceData !== this.props.sourceData && this.props.sourceData && this.props.sourceData.minusScores && this.props.sourceData.minusScores.length) {
            this.handleChartData(this.props.sourceData);
            this.setState({curTabIndex: 0});
        } else {
            this.hasRenderFirst = false;
        }
    }

    //  初始化绘制图表
    renderFirst = (sourceData) => {
        let height = this.getCanvasHeight(sourceData);
        let {firstShowName, secondShowName} = this.getNames(sourceData);
        this.hasRenderFirst = true;
        var chart = new F2.Chart({
            id: 'weeklyTrendChart',
            pixelRatio: window.devicePixelRatio,
            height: height
        });

        chart.legend({
            position: 'bottom'
        });

        chart.tooltip({
            triggerOn: 'click',
            custom: true, // 自定义 tooltip 内容框
            showCrosshairs: true,
            onChange: function onChange(obj) {
                var legend = chart._attrs.legendController.legends.bottom[0];
                var tooltipItems = obj.items;
                var legendItems = legend.items;
                var map = {};
                legendItems.map(function(item) {    // eslint-disable-line
                    map[item.name] = _.clone(item);
                });
                tooltipItems.map(function(item) {   // eslint-disable-line
                    var name = item.name;
                    var value = item.value;
                    if (map[name]) {
                        map[name].value = value;
                    }
                });
                legend.setItems(_.values(map));
            },
            onHide: function onHide() {
                var legend = chart._attrs.legendController.legends.bottom && chart._attrs.legendController.legends.bottom[0];
                legend && legend.setItems(chart.getLegendItems().clazzOrGradeName);
            }
        });

        chart.source(sourceData, {
            score: {
                isRounding: true
            }
        });

        chart.filter('clazzOrGradeName', (a, b)=> a === firstShowName || a === secondShowName);

        chart.line().position('weekName*score').color('clazzOrGradeName', constant.generalColors);
        chart.point().position('weekName*score').color('clazzOrGradeName', constant.generalColors);
        
        chart.render();
        this.setState({chart});
    }

    handleChartData = (sourceData) => {
        const {plusScores, minusScores} = sourceData;
        let plusScoresStr = JSON.stringify(plusScores);
        let minusScoresStr = JSON.stringify(minusScores);
        let countByScore = this.getCountByScore(plusScoresStr, minusScoresStr);
        if (!this.hasRenderFirst) {
            document.getElementById('weeklyWrap').innerHTML = '';
            document.getElementById('weeklyWrap').innerHTML = '<canvas id="weeklyTrendChart"></canvas>';
            this.renderFirst(countByScore);
        } else {
            document.getElementById('weeklyWrap').innerHTML = '';
            document.getElementById('weeklyWrap').innerHTML = '<canvas id="weeklyTrendChart"></canvas>';
            this.renderChart(countByScore);
        }
        this.setState({countByScore, plusScores, minusScores});
    } 

    getCountByScore = (plusScoresStr, minusScoresStr) => {
        let countByScore = JSON.parse(plusScoresStr);
        let minusScores = JSON.parse(minusScoresStr);
        for (let i = 0; i < countByScore.length; i++) {
            countByScore[i].score = countByScore[i].score + minusScores[i].score;
        }
        return countByScore;
    }
    
    changeTab = (val) => {
        const {curTabIndex} = this.state;
        if (curTabIndex !== val) {
            this.setState({curTabIndex: val});
            let sourceData;
            const {countByScore, plusScores, minusScores} = this.state;
            if (val === 0) {
                sourceData = countByScore;
            } else if (val === 1) {
                sourceData = plusScores;
            } else if (val === 2) {
                sourceData = minusScores;
            }
            this.renderChart(sourceData);
        }
    }

    //  绘制折线图
    renderChart = (sourceData) => {
        let height = this.getCanvasHeight(sourceData);
        let {chart} = this.state;
        let {firstShowName, secondShowName} = this.getNames(sourceData);
        chart.filter('clazzOrGradeName', (a, b)=> a === firstShowName || a === secondShowName);
        let clientWidth = document.body.clientWidth - 40;
        chart.changeSize(clientWidth, height);
        chart.changeData(sourceData);
        this.setState({chart});
    }

    //  求动态高度
    getCanvasHeight = (sourceData) => {
        let clazzOrGradeCount = this.getClazzOrGradeCount(sourceData);
        let height;
        if (clazzOrGradeCount >= 0 && clazzOrGradeCount <= 3) {  
            height = 200;      
        } else if (clazzOrGradeCount >= 4 && clazzOrGradeCount <= 12) { 
            height = 300; 
        } else {
            height = 400;   
        } 
        return height;
    }

    //  求前两个图例的名称
    getNames = (sourceData) => {
        let firstShowName;
        let secondShowName;
        if (sourceData.length) {
            firstShowName = sourceData[0].clazzOrGradeName;
            for (let i = 0; i < sourceData.length; i++) {
                let item = sourceData[i].clazzOrGradeName;
                if (item !== firstShowName) {
                    secondShowName = item;
                    break;
                }
            }
        }
        return {firstShowName, secondShowName};
    }

    //  得到一共有几个年级或者班级，根据个数渲染图表的高度
    getClazzOrGradeCount = (sourceData) => {
        let temArr = [];
        sourceData.forEach((item) => {
            let clazzOrGradeName = item.clazzOrGradeName;
            let curIndex = temArr.findIndex((name) => {
                return name === clazzOrGradeName;
            });
            if (curIndex <= -1) {
                temArr.push(clazzOrGradeName);
            }
        });
        return temArr.length;
    }

    render() {
        const {curTabIndex} = this.state;
        const {isLoading, sourceData} = this.props;
        return (
            <div className={`${styles.commonChart} noSelect`}>
                <div className={`cf ${styles.top}`}>
                    <span className={styles.chartTitle}>本周趋势<span className={styles.unit}>（分）</span></span>
                    {sourceData && sourceData.minusScores.length ? <div className={styles.commonPanel}>
                        {filterArr.map((item) => {
                            return <span className={`${curTabIndex === item.val ? styles.curTab : ''}`} key={item.val} onClick={() => {
                                this.changeTab(item.val);
                            }}>{item.name}</span>;
                        })}
                    </div> : ''}
                </div>
                {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                {sourceData && sourceData.minusScores.length ? <div id="weeklyWrap"><canvas id="weeklyTrendChart"></canvas></div> : ''}
                {sourceData && !sourceData.minusScores.length && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
            </div>
        );
    }
}
