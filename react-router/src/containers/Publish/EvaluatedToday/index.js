
import React, {Component} from 'react';
import FrameText from '../../../components/FrameText';
import styles from './index.scss';

import {connect} from 'react-redux';
class EvaluatedToday extends Component {
    render () {
        const {historyData} = this.props; 
        let standardDataHistory = '';
        if (historyData) {
            standardDataHistory = historyData.itemQualitativeDTOS;
        }
        return (
            <div>
                {standardDataHistory && 
                    <div className={styles.have__evaluation_wrap}>
                        <p className={styles.title}>今日已评价</p>
                        {
                            standardDataHistory.map((item, index) => {
                                return (
                                    <span className={styles.have__evaluation_item} key={index}>
                                        <FrameText text={`${item.scoreDesc} ${item.score}`} borderColor="#dbdbdb"/>
                                    </span>
                                );
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

export default connect(state=> ({
    historyData: state.historyData
}))(EvaluatedToday);

