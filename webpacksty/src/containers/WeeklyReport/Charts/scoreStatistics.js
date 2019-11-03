import React from 'react';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const F2 = require('@antv/f2');
const filterArr = [
    {name: '得分', val: 0},
    {name: '加分', val: 1},
    {name: '扣分', val: 2},
];
export default class ScoreStatistics extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            curTabIndex: 0,
            countByScore: [],   //  根据得分统计
            countByAdd: [],     //  根据加分统计
            countBySubstract: [],    //  根据扣分统计
            allScoreAverage: 0,
            addScoreAverage: 0,
            substractAverage: 0
        };
        
    }  

    componentDidMount () {
        if (this.props.sourceData && this.props.sourceData.minusScores.length) {
            this.handleChartData(this.props.sourceData);
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.sourceData !== this.props.sourceData) {
            if (this.props.sourceData.minusScores.length) {
                this.handleChartData(this.props.sourceData);
                this.setState({curTabIndex: 0});
            }
        }
    }

    handleChartData = (sourceData) => {
        const {plusScores, minusScores} = sourceData;
        plusScores.forEach((item) => {
            let clazzOrGradeName = item.clazzOrGradeName;
            if (clazzOrGradeName.indexOf('(') !== -1) {
                let clazzOrGradeNameTem = clazzOrGradeName.split('(');
                item.clazzOrGradeName = '(' + clazzOrGradeNameTem[1];
            }
        });

        minusScores.forEach((item) => {
            let clazzOrGradeName = item.clazzOrGradeName;
            if (clazzOrGradeName.indexOf('(') !== -1) {
                let clazzOrGradeNameTem = clazzOrGradeName.split('(');
                item.clazzOrGradeName = '(' + clazzOrGradeNameTem[1];
            } 
        });

        let plusScoresStr = JSON.stringify(plusScores);
        let minusScoresStr = JSON.stringify(minusScores);
        let countByScore = this.getCountByScore(plusScoresStr, minusScoresStr).countByScore;
        let allScoreAverage = this.getCountByScore(plusScoresStr, minusScoresStr).averageScore;
        
        let countByAdd = this.getCountAdd(plusScoresStr).countByAdd;
        let addScoreAverage = this.getCountAdd(plusScoresStr).averageScore;

        let countBySubstract = this.getCountBySubstract(minusScoresStr).countBySubstract;
        let substractAverage = this.getCountBySubstract(minusScoresStr).averageScore;

        this.setState({countByScore, allScoreAverage, countByAdd, addScoreAverage, countBySubstract, substractAverage}, () => {
            this.renderChart(countByScore, allScoreAverage);
        });
    }

    //  获得得分的数组
    getCountByScore = (plusScoresStr, minusScoresStr) => {
        let countByScore = JSON.parse(plusScoresStr);
        let minusScores = JSON.parse(minusScoresStr);
        let totalScore = 0;
        countByScore.forEach((item) => {
            let curMinu = minusScores.find((minuItem) => {
                return minuItem.clazzOrGradeName === item.clazzOrGradeName;
            });
            item.score = Number(item.score) + curMinu.score;
            totalScore += item.score;
        });
        countByScore.sort(this.sortCount);
        let averageScore = 0;
        if (countByScore.length) {
            averageScore = (totalScore / countByScore.length).toFixed(1);
        }
        return {countByScore, averageScore};
    }

    //  加分排序
    getCountAdd = (plusScoresStr) => {
        let countByAdd = JSON.parse(plusScoresStr);
        countByAdd.sort(this.sortCount);
        let totalScore = 0;
        countByAdd.forEach((item) => {
            totalScore += item.score;
        });
        let averageScore = 0;
        if (countByAdd.length) {
            averageScore = (totalScore / countByAdd.length).toFixed(1);
        }
        return {countByAdd, averageScore};
    }

    //  减分排序
    getCountBySubstract = (minusScoresStr) => {
        let countBySubstract = JSON.parse(minusScoresStr);
        let totalScore = 0;
        countBySubstract.forEach((item) => {
            totalScore += item.score;
        });
        let averageScore = 0;
        if (countBySubstract.length) {
            averageScore = (totalScore / countBySubstract.length).toFixed(1);
        }
        countBySubstract.sort(this.sortCount);
        return {countBySubstract, averageScore};
    }

    sortCount = (a, b) => {
        return b.score - a.score;
    }

    changeTab = (val) => {
        const {curTabIndex} = this.state;
        if (curTabIndex !== val) {
            this.setState({curTabIndex: val});
            let sourceData;
            let averageScore;
            const {countByScore, countByAdd, countBySubstract, allScoreAverage, addScoreAverage, substractAverage} = this.state;
            if (val === 0) {
                sourceData = countByScore;
                averageScore = allScoreAverage;
            } else if (val === 1) {
                sourceData = countByAdd;
                averageScore = addScoreAverage;
            } else if (val === 2) {
                sourceData = countBySubstract;
                averageScore = substractAverage;
            }
            this.renderChart(sourceData, averageScore);
        }
    }

    renderChart = (sourceData, averageScore) => {
        let baseHeight = 220;
        let dataWidth = sourceData.length * 30; 
        let height = dataWidth < baseHeight ? baseHeight : dataWidth;
        var chart = new F2.Chart({
            id: 'scoreStatisticsChart',
            pixelRatio: window.devicePixelRatio,
            height: height
        });

        chart.source(sourceData);

        chart.coord({
            transposed: true
        });

        chart.axis('clazzOrGradeName', {
            label: (text) => {
                const cfg = {
                };
                cfg.text = text.length > 5 ? text.substring(0, 5) + '...' : text; 
                return cfg;
            }
        });

        chart.tooltip({
            onShow: function onShow(ev) {
                var items = ev.items;
                items[0].name = null;
                items[0].value = items[0].origin.score.toFixed(1);
            },
            triggerOn: 'click'
        });
        
        chart.interval().position('clazzOrGradeName*score').color('score', (cval) => {
            if (cval >= 0) {
                return '#c6e089';
            }
            return '#feb9bc';
        }).size('26');
        chart.render();
    }

    render() {
        const {curTabIndex} = this.state;
        const {isLoading, sourceData} = this.props;
        return (
            <div className={`${styles.commonChart} noSelect`}>
                <div className={`cf ${styles.top}`}>
                    <span className={styles.chartTitle}>分值统计<span className={styles.unit}>（分）</span></span>
                    {sourceData && sourceData.minusScores.length ? <div className={styles.commonPanel}>
                        {filterArr.map((item) => {
                            return <span className={`${curTabIndex === item.val ? styles.curTab : ''}`} key={item.val} onClick={() => {
                                this.changeTab(item.val);
                            }}>{item.name}</span>;
                        })}
                    </div> : ''}
                </div>
                {sourceData && sourceData.minusScores.length ? <div id="chartWrap">
                    <canvas id="scoreStatisticsChart"></canvas>
                </div> : ''}
                {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                {sourceData && !sourceData.minusScores.length && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
            </div>
        );
    }
}