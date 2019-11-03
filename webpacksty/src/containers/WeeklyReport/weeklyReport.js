import React from 'react';
import QueryParams from './QueryParams/queryParams.js';
import WeeklyOverview from './Charts/weeklyOverview';
import CountStatistics from './Charts/countStatistics';
import ScoreStatistics from './Charts/scoreStatistics';
import ScoreDistribution from './Charts/scoreDistribution';
import WeeklyTrend from './Charts/weeklyTrend';
import MostPlusCount from './Charts/mostPlusCount';
import MostMinusCount from './Charts/mostMinusCount';
import axios from '../../utils/axiosApi';
import shadeImg from '../../utils/images/shade.png';
import BlankImg from '../../utils/BlankImg';

import styles from './weeklyReport.scss';

export default class WeeklyReport extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            weeklyData: null,   //  本周概况数据
            weeklyIsLoading: true,   
            countStatisticsData: null,   //  次数统计数据
            countStatisticsIsLoading: true,   
            scoreStatisticsData: null,   //  分值统计数据
            scoreStatisticsIsLoading: true,   
            scoreDistributionData: null,     //  得分分布数据
            scoreDistributionIsLoading: true,     
            weeklyTrendData: null,           //  本周趋势数据
            weeklyTrendIsLoading: true,           
            mostPlusCountData: null,             //  高频加分项数据
            mostPlusCountIsLoading: true,            
            mostMinusCountData: null,          //    高频扣分项数据
            mostMinusCountIsLoading: true,         
            isShowBlank: false
        };
    }

    componentDidMount () {
        document.addEventListener('deviceready', function() {
            window.LeTalkCorePlugin.customBack('custom');
        }, false);

        window.clickBack = () => {
            this.props.history.replace({pathname: '/evaluate'});
        };
    }

    getQueryParams = (queryParams, noEva) => {
        if (noEva) {
            this.setState({noEva});
        } else {
            this.setState({weeklyIsLoading: true}, () => {
                this.getChartData(queryParams);
            });
        }
    }

    //  请求图表的数据
    getChartData = (queryParams) => {
        //  本周概况
        const weeklyUrl = '/auth/global/evaluation/eva/chart/getWeeklyOverview.htm';
        axios('get', weeklyUrl, queryParams).then((json) => {
            if (json.success) {
                let weeklyData = json.data;
                if (json.data) {
                    const {plusCount, minusCount, minusScore, plusScore} = json.data;
                    if (plusCount === 0 && minusCount === 0 && minusScore === 0 && plusScore === 0) {
                        weeklyData = null;
                    } 
                } 
                this.setState({weeklyData, weeklyIsLoading: false});
            }
        });

        let singleClazz = queryParams.clazzIds && typeof queryParams.clazzIds !== 'string'; 
        this.setState({singleClazz});
        if (singleClazz) {
            this.setState({countStatisticsIsLoading: false, scoreStatisticsIsLoading: false});
            //  次数统计
        } else {
            const countStatisticUrl = '/auth/global/evaluation/eva/chart/getCountStatistics.htm';
            axios('get', countStatisticUrl, queryParams).then((json) => {
                this.setState({countStatisticsData: json.data, countStatisticsIsLoading: false});
            });
    
            //  分值统计
            const scoreStatisticUrl = '/auth/global/evaluation/eva/chart/getScoreStatistics.htm';
            axios('get', scoreStatisticUrl, queryParams).then((json) => {
                this.setState({scoreStatisticsData: json.data, scoreStatisticsIsLoading: false});
            });
        }

        //  得分分布
        const scoreDistributionUrl = '/auth/global/evaluation/eva/chart/getScoreDistribution.htm';
        axios('get', scoreDistributionUrl, queryParams).then((json) => {
            this.setState({scoreDistributionData: json.data, scoreDistributionIsLoading: false});
        });

        //  本周趋势
        const weeklyTrendUrl = '/auth/global/evaluation/eva/chart/getWeeklyTrend.htm';
        axios('get', weeklyTrendUrl, queryParams).then((json) => {
            this.setState({weeklyTrendData: json.data, weeklyTrendIsLoading: false});
        });

        //  高频加分项
        const mostPlusCountUrl = '/auth/global/evaluation/eva/chart/getMostPlusCount.htm';
        axios('get', mostPlusCountUrl, queryParams).then((json) => {
            this.setState({mostPlusCountData: json.data, mostPlusCountIsLoading: false});

        });

        //  高频扣分项
        const mostMinusCountUrl = '/auth/global/evaluation/eva/chart/getMostMinusCount.htm';
        axios('get', mostMinusCountUrl, queryParams).then((json) => {
            this.setState({mostMinusCountData: json.data, mostMinusCountIsLoading: false});
        });
    }

    render() {
        const {weeklyData, weeklyIsLoading, countStatisticsData, countStatisticsIsLoading,
            scoreStatisticsData, scoreStatisticsIsLoading, scoreDistributionData, scoreDistributionIsLoading,
            weeklyTrendData, weeklyTrendIsLoading, mostPlusCountData, mostPlusCountIsLoading,
            mostMinusCountData, mostMinusCountIsLoading, singleClazz, noEva} = this.state;
        let loadingOver = !weeklyIsLoading && !countStatisticsIsLoading && !scoreStatisticsIsLoading && !mostMinusCountIsLoading && !mostPlusCountIsLoading;
        let bigDataNull = !weeklyData && !(countStatisticsData && countStatisticsData.plusCounts.length) && !(scoreStatisticsData && scoreStatisticsData.plusScores.length) && !(mostPlusCountData && mostPlusCountData.length) && !(mostMinusCountData && mostMinusCountData.length);
        let isShowBlank = loadingOver && bigDataNull;
        
        return (
            <div className={styles.wrap}>
                {noEva ? <div className={styles.blank}><BlankImg content={'暂无可用的评价方案'}/></div> : <div><QueryParams getQueryParams={this.getQueryParams} />
                    {!isShowBlank ? 
                        <div className={styles.chartWrap}>
                            <div className={styles.bgShade}>
                                <img src={shadeImg} />
                            </div>
                            <div className={styles.hrBlock}></div>
                            <WeeklyOverview sourceData={weeklyData} isLoading={weeklyIsLoading} />
                            {!singleClazz && <CountStatistics sourceData={countStatisticsData} isLoading={countStatisticsIsLoading} />}
                            {!singleClazz && <ScoreStatistics sourceData={scoreStatisticsData} isLoading={scoreStatisticsIsLoading} />}
                            <WeeklyTrend sourceData={weeklyTrendData} isLoading={weeklyTrendIsLoading}/>
                            <ScoreDistribution sourceData={scoreDistributionData} isLoading={scoreDistributionIsLoading} />
                            <MostPlusCount sourceData={mostPlusCountData} isLoading={mostPlusCountIsLoading}/>
                            <MostMinusCount sourceData={mostMinusCountData} isLoading={mostMinusCountIsLoading}/>
                            <div className={styles.noMore}><span>没有更多了</span></div>
                        </div> : <div className={styles.blank}><BlankImg/></div>}</div>}
            </div>
        );
    }
}
