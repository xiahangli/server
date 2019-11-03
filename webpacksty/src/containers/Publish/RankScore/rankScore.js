import React, {Component} from 'react';
import styles from './rankScore.scss';

//  定量评价 这里是用户自己打分的页面
export default class ScoreInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            lastScore: 0,
            standardActiveIndex: null,
            rankScoreInfo: {}
        };
    }

    componentDidMount () {
        if (this.props.content) {
            let content = this.props.content;
            if (typeof content === 'string') {
                content = JSON.parse(content);
            }
            this.setState({lastScore: this.props.lastScore});
            this.activeStandard(this.props.lastScore, content);
        }
    }

    componentDidUpdate (prevProps) { 
        if (prevProps.lastScore !== this.props.lastScore) {
            this.setState({lastScore: this.props.lastScore});
        }

        if (prevProps.content !== this.props.content) {
            let content = this.props.content;
            if (typeof content === 'string') {
                content = JSON.parse(content);
            }
            this.activeStandard(this.props.lastScore, content);
        }
    }

    //  根据分数选中对应的段位
    activeStandard = (lastScore, standardData) => {
        for (let i = 0; i < standardData.length; i ++) {
            let {lowScore, topScore} = standardData[i];
            if (lastScore >= lowScore && lastScore <= topScore) {
                this.setState({standardActiveIndex: i});
                //  传递给父级
                this.props.getRankScoreInfo({lastScore: lastScore, scoreDesc: standardData[i].scoreDesc});
                break;
            } else {
                this.setState({standardActiveIndex: null});
            }
        }
    }

    //  点击评分模式
    handleStandard = (index, item, e) => {
        this.setState({lastScore: item.topScore, standardActiveIndex: index});
        let {rankScoreInfo} = this.state;
        rankScoreInfo.lastScore = item.topScore;
        rankScoreInfo.scoreDesc = item.scoreDesc;
        this.setState({rankScoreInfo});
        //  传递给父级
        this.props.getRankScoreInfo(rankScoreInfo);
    }
    

    render () {
        let {content} = this.props;
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }

        let {standardActiveIndex, lastScore} = this.state;
        lastScore = lastScore && Number(lastScore);

        return (
            <div className="sinput__wrap">
                {/* 得分 */}
                <div className={`${styles.score} cf`}>
                    <span className={styles.title}>当前评分</span>
                    <div className={styles.input__score}>
                        {lastScore}
                    </div>
                </div>
             
                {/* 评分模式 */}
                <div className={styles.standard__wrap}>
                    <p className={styles.title}>评价标准</p>
                    <div className={styles.standard}>
                        {content && content.map((item, index) => <div className={`${styles.standard__item} ${ standardActiveIndex !== null && standardActiveIndex === index ? styles.standard__itemactive : ''} cf`} 
                            key={index} 
                            onClick={(e) => {
                                this.handleStandard(index, item, e);
                            }}>
                            <span>{item.scoreDesc}</span>
                            <p className={styles.score__range}>
                                {item.lowScore === item.topScore ? '' : <span><span>{item.lowScore}</span>&nbsp;~&nbsp;</span>}
                                <span>{Number(item.topScore)}</span>
                            </p>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}


