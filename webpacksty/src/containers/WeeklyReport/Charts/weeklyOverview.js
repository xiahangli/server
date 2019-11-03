import React from 'react';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const F2 = require('@antv/f2');

export default class WeeklyOverview extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            scoreObj: []
        };
    }

    componentDidMount () {
        if (this.props.sourceData) {
            this.handleChartData(this.props.sourceData);
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.sourceData !== this.props.sourceData && this.props.sourceData) {
            this.handleChartData(this.props.sourceData);
        }
    }
    
    //  数据处理为绘制图表的格式
    handleChartData = (sourceData) => {
        let data = [];
        const {minusCount,
            minusScore,
            plusCount,
            plusScore} = sourceData || {};
        const totalCount = minusCount + plusCount;
        const totalScore = (plusScore + minusScore).toFixed(1);
        let objPlus = {name: '加分次数', count: plusCount, percent: `${(plusCount / totalCount * 100).toFixed(1) }%`, a: '1'};   
        let objSubtract = {name: '扣分次数', count: minusCount, percent: `${(minusCount / totalCount * 100).toFixed(1)}%`, a: '1'}; 
        let scoreObj = [];
        if (sourceData) {
            scoreObj = [{name: '本周总分', score: totalScore}, {name: '本周加分', score: plusScore.toFixed(1)}, {name: '本周扣分', score: minusScore.toFixed(1)}];
        }
        data.push(objPlus);
        data.push(objSubtract);
        this.renderChart(data, sourceData);
        this.setState({scoreObj, totalCount});
    }

    renderChart = (data, sourceData) => {
        const chart = new F2.Chart({
            title: 'chart',
            id: 'chart',
            pixelRatio: window.devicePixelRatio,
        });
        if (!sourceData) {
            chart.clear();
            return;
        }

        chart.legend({
            position: 'right',
            itemFormatter: function itemFormatter(val) {
                if (val === '本周评价次数') {
                    return val + '  ' + (countMap['加分次数'] + countMap['扣分次数']);
                } 
                return val + '  ' + countMap[val] + ' (' + percentMap[val] + ')';
            },
            clickable: false,
            custom: true,
            items: [{
                name: '本周评价次数'
            }, {
                name: '加分次数',
                marker: 'circle',
                fill: '#69d1a4'
            }, {
                name: '扣分次数',
                marker: 'circle',
                fill: '#ff9900'
            }]
        });


        var percentMap = {};
        data.forEach(function (obj) {
            percentMap[obj.name] = obj.percent;
        });

        var countMap = {};
        data.forEach(function (obj) {
            countMap[obj.name] = obj.count;
        });


        chart.tooltip(false);

        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.65,
            radius: 1
        });

        chart.axis(false);
        chart.interval().position('a*count').color('name', ['#69d1a4', '#ff9900']).adjust('stack');
        chart.source(data);
        chart.render();
    }

    render() {
        const {scoreObj} = this.state;
        const {isLoading, sourceData} = this.props;
        return (
            <div className={`${styles.weeklyReport} noSelect`}>
                <p className={styles.chartTitle}>本周概况</p>
                {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                {!sourceData && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
                {sourceData ? <div><canvas id="chart"></canvas>
                    {scoreObj.length ? <ul className={styles.totalScore}>
                        {scoreObj.map((item) => {
                            return <li key={item.name}>
                                <p>{item.score > 0 ? `+${item.score}` : `${item.score}`}</p>
                                <span>{item.name}</span>
                            </li>;
                        })}
                    </ul> : ''}</div> : ''}
            </div> 
        );
    }
}