import React from 'react';
import constant from '../../../utils/constant';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const F2 = require('@antv/f2');
const _ = require('lodash');
export default class ScoreDistribution extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount () {
        if (this.props.sourceData && this.props.sourceData.length) {
            this.renderChart(this.props.sourceData);
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.sourceData !== this.props.sourceData && this.props.sourceData.length) {
            this.renderChart(this.props.sourceData);
        }
    }

    renderChart = (sourceData) => {
        document.getElementById('scoreWrap').innerHTML = '';
        document.getElementById('scoreWrap').innerHTML = '<canvas id="scoreDistributionChart"></canvas>';
        let clazzOrGradeCount = this.getClazzOrGradeCount(sourceData);
        let height;
        if (clazzOrGradeCount >= 0 && clazzOrGradeCount <= 3) {   
            height = 240;       
        } else if (clazzOrGradeCount >= 4 && clazzOrGradeCount <= 12) { 
            height = 440; 
        } else {
            height = 540;   
        }   
        var chart = new F2.Chart({
            id: 'scoreDistributionChart',
            pixelRatio: window.devicePixelRatio,
            height: height
        });
        
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
        
        chart.filter('clazzOrGradeName', (a, b)=> a === firstShowName || a === secondShowName);
        
        chart.coord('polar');
        
        chart.source(sourceData, {
            isRounding: true
        });

        chart.legend({
            position: 'bottom'
        });
        
        chart.tooltip({
            triggerOn: 'click',
            custom: true, // 自定义 tooltip 内容框
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
         
        chart.axis('itemName', {
            label: (text) => {
                const cfg = {
                };
                cfg.text = text.length > 5 ? text.substring(0, 5) + '...' : text; 
                return cfg;
            }
        });

        chart.line().position('itemName*score').color('clazzOrGradeName', constant.generalColors);
        chart.point().position('itemName*score').color('clazzOrGradeName', constant.generalColors).style({
            stroke: '#fff',
            lineWidth: 1
        });
        chart.render();
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
         const {isLoading, sourceData} = this.props;
         return (
             <div className={`${styles.commonChart} noSelect`}>
                 <div className={styles.top}>
                     <span className={styles.chartTitle}>得分分布<span className={styles.unit}>（分）</span></span>
                 </div>
                 {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                 {sourceData && sourceData.length ? <div id="scoreWrap"><canvas id="scoreDistributionChart"></canvas></div> : ''}
                 {sourceData && !sourceData.length && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
             </div>
         );
     }
}