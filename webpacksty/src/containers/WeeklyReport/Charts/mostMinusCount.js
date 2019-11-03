import React from 'react';
import styles from '../weeklyReport.scss';
import BlankImg from '../../../components/BlankImg';
import loadImg from '../../../assets/images/load.gif';
const F2 = require('@antv/f2');
export default class MostPlusCount extends React.Component{

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
        let clientWidth = document.body.clientWidth - 40;
        let dataWidth = sourceData.length * 52; 
        let width = dataWidth < clientWidth ? clientWidth : dataWidth; 
        var chart = new F2.Chart({
            id: 'mostMinusCountChart',
            pixelRatio: window.devicePixelRatio,
            width: width
        });
        chart.tooltip({
            onShow: function onShow(ev) {
                var items = ev.items;
                items[0].name = null;
            },
            triggerOn: 'click'
        });

        chart.source(sourceData, {
            count: {
                // tickCount: 5,
                isRounding: true
            }
        });

        chart.axis('itemName', {
            label: (text) => {
                const cfg = {
                    textAlign: 'center'
                };
                cfg.text = text.length > 5 ? text.substring(0, 5) + '...' : text; 
                cfg.rotate = -Math.PI / 9;
                return cfg;
            }
        });

        chart.interval().position('itemName*count')
            .color('count', ['#ff9900']).size('26');
        chart.render();
    }

    render() {
        const {isLoading, sourceData} = this.props;
        return (
            <div className={`${styles.commonChart} ${styles.minusCount} noSelect`}>
                <div className={`cf ${styles.top}`}>
                    <span className={styles.chartTitle}>高频扣分项<span className={styles.unit}>（次）</span></span>
                </div>
                {sourceData && sourceData.length ? <div id="chartWrap">
                    <canvas id="mostMinusCountChart"></canvas>
                </div> : ''}
                {isLoading && <div className={styles.loading}><img src={loadImg}/></div>}
                {sourceData && !sourceData.length && !isLoading && <div className={styles.sBlankImg}><BlankImg content="暂无数据"/></div>}
            </div>
        );
    }
}