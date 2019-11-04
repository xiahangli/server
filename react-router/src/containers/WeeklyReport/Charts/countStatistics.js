import React from 'react';
import {Picker} from 'antd-mobile';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const F2 = require('@antv/f2');
const pickerData = [
    {label: '合计次数', value: '合计次数'},
    {label: '加分次数', value: '加分次数'},
    {label: '扣分次数', value: '扣分次数'}
];
export default class CountStatistics extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            countByAll: [], //  合计次数排序
            countByAdd: [], //  按照加分次数排序
            countBySubtract: [],    //  按照减分次数排序
            pickerVal: ['合计次数'],
            pickerVisible: false
        };
    }

    componentDidMount () {
        if (this.props.sourceData) {
            if (this.props.sourceData.minusCounts.length) {
                this.handleChartData(this.props.sourceData);
            }
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.sourceData !== this.props.sourceData) {
            if (this.props.sourceData.minusCounts.length) {
                this.handleChartData(this.props.sourceData);
                this.setState({pickerVal: ['合计次数']});
            }
        }
    }

    handleChartData = (sourceData) => {
        //  根据加分次数排序
        const {minusCounts, plusCounts} = sourceData;
        
        minusCounts.forEach((item) => {
            let clazzOrGradeName = item.clazzOrGradeName;
            if (clazzOrGradeName.indexOf('(') !== -1) {
                let clazzOrGradeNameTem = clazzOrGradeName.split('(');
                item.clazzOrGradeName = '(' + clazzOrGradeNameTem[1];
            }
        });
        plusCounts.forEach((item) => {
            let clazzOrGradeName = item.clazzOrGradeName;
            if (clazzOrGradeName.indexOf('(') !== -1) {
                let clazzOrGradeNameTem = clazzOrGradeName.split('(');
                item.clazzOrGradeName = '(' + clazzOrGradeNameTem[1];
            } 
        });

        const minusCountsStr = JSON.stringify(minusCounts);
        const plusCountsStr = JSON.stringify(plusCounts);

        let countByAll = this.handleCountByAllData(minusCountsStr, plusCountsStr);
        let countByAdd = this.handleCountByAddData(minusCountsStr, plusCountsStr);
        let countBySubtract = this.handleCountBySubtractData(minusCountsStr, plusCountsStr);

        minusCounts.sort(this.sortCount);
        this.setState({countByAll, countByAdd, countBySubtract}, () => {
            this.renderChart(countByAll);
        });
    }

    sortCount = (a, b) => {
        return b.count - a.count;
    }

    //  按照合计排序，进行数据的处理
    handleCountByAllData = (minusCountsStr, plusCountsStr) => {
        const minusCounts = JSON.parse(minusCountsStr);
        const plusCounts = JSON.parse(plusCountsStr); 
        
        minusCounts.forEach((minusItem) => {
            let {clazzOrGradeName} = minusItem;

            let curItem = plusCounts.find((plusItem) => {
                return clazzOrGradeName === plusItem.clazzOrGradeName;
            });
            minusItem.allCount = minusItem.count + curItem.count;
        });
        minusCounts.sort(function (a, b) {
            return b.allCount - a.allCount;
        });

        let allCount = minusCounts.concat(plusCounts);
        return allCount;
    }

    //  按照加分排序， 进行数据的处理
    handleCountByAddData = (minusCountsStr, plusCountsStr) => {
        const minusCounts = JSON.parse(minusCountsStr);
        const plusCounts = JSON.parse(plusCountsStr); 
        plusCounts.sort(this.sortCount);
        let countByAdd = plusCounts.concat(minusCounts);
        return countByAdd;
    }

    //  按照减分排序，进行数据的处理
    handleCountBySubtractData = (minusCountsStr, plusCountsStr) => {
        const minusCounts = JSON.parse(minusCountsStr);
        const plusCounts = JSON.parse(plusCountsStr); 
        minusCounts.sort(this.sortCount);
        let countBySubtract = minusCounts.concat(plusCounts);
        return countBySubtract;
    }

    renderChart = (sourceData) => {
        let baseHeight = 220;
        let dataWidth = sourceData.length * 30; 
        let height = dataWidth < baseHeight ? baseHeight : dataWidth; 
        var chart = new F2.Chart({
            id: 'countStatisticChart',
            pixelRatio: window.devicePixelRatio,
            height: height
        });

        chart.legend({
            position: 'bottom',
            clickable: false
        });

        chart.tooltip({
            triggerOn: 'click'
        });

        chart.coord({
            transposed: true
        });

        let config = {};

        let isConfig = sourceData.findIndex((item) => {
            return item.count > 2;
        });

        if (isConfig) {
            config = {
                count: {
                    tickCount: 2,
                    isRounding: true
                }
            };
        }

        chart.source(sourceData, config);
       

        chart.axis('clazzOrGradeName', {
            label: (text) => {
                const cfg = {
                };
                cfg.text = text.length > 5 ? text.substring(0, 5) + '...' : text; 
                return cfg;
            }
        });

        chart.interval().position('clazzOrGradeName*count')
            .color('typeName', typeName => {
                if (typeName === '扣分') {
                    return '#ff9900';
                } 
                return '#69d1a4';
            } ).adjust('stack')
            .size('26');    //  也可以是回调函数
        
        chart.render();
    }

    pickerSure = (val) => {
        let {pickerVal} = this.state;
        if (val !== pickerVal) {
            const {countByAll, countByAdd, countBySubtract} = this.state;
            this.setState({pickerVal: val});
            if (val[0] === '合计次数') {
                this.renderChart(countByAll);
            } else if (val[0] === '加分次数') { 
                this.renderChart(countByAdd);
            } else if (val[0] === '扣分次数') {
                this.renderChart(countBySubtract);
            }
        }
    }

    render() {
        const {pickerVal, pickerVisible} = this.state;
        const {isLoading, sourceData} = this.props;
        return (
            <div className={`${styles.countStatistics} noSelect`}>
                <div className={styles.top} id="top">
                    <span className={styles.chartTitle}>次数统计<span className={styles.unit}>（次）</span></span>
                    {sourceData && sourceData.minusCounts.length ? <div className={styles.filter}>
                        <span>排序</span>
                        <Picker
                            data = { pickerData }
                            value= { pickerVal }
                            cols = { 1 }
                            title = '排序'
                            onOk = { this.pickerSure }
                            visible = {pickerVisible}
                            onVisibleChange={(bool) => bool ? this.setState({pickerVisible: true}) : this.setState({pickerVisible: false})}
                        >
                            <span className={styles.countType}>{ pickerVal[0] }<i className="evaiconfont">&#xe82f;</i></span>
                        </Picker>
                    </div> : ''}
                </div>
                {sourceData && sourceData.minusCounts.length ? <div id="chartWrap">
                    <canvas id="countStatisticChart"></canvas>
                </div> : ''}
                {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                {sourceData && !sourceData.minusCounts.length && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
            </div>
        );
    }
}
