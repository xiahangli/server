import React, {Component} from 'react';
import FrameText from '../../../components/FrameText';
import styles from './matterScore.scss';

//  定性评价打分
export default class MatterScore extends Component {
    constructor (props) {
        super(props);
        this.state = {
            lastScore: 0,       //  真实的分数 可以小于0
            score: 0,       //  用户此次操作的分数差
            scoreDescArray: [],  //  用户选中的所有的扣分项的集合 前端自己拿来操作的
            scoreDesc: "",        //  传递给后端的扣分描述
            matterScoreInfo: {},     //  按事项评分，用户操作的所有的数据详细信息
            content: [],    //  按事项评分，评分展示项
        };
    }

    componentDidMount () {
        if (this.props.content) {
            let content = this.props.content;
            if (typeof content === 'string') {
                content = JSON.parse(content);
                this.setState({content});
            } else {
                this.setState({content});
            }
        }
        if (this.props.lastScore) {
            this.setState({lastScore: this.props.lastScore});
        }
        if (this.props.score) {
            this.setState({score: this.props.score});
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.content !== this.props.content) {
            let content = this.props.content;
            if (typeof content === 'string') {
                content = JSON.parse(content);
                this.setState({content});
            } else {
                this.setState({content});
            }
        }

        if (prevProps.lastScore !== this.props.lastScore) {
            this.setState({lastScore: this.props.lastScore});
        }
        if (prevProps.score !== this.props.score) {
            this.setState({score: this.props.score});
        }
    }

    //  点击评分模式
    handleStandard = (index, item, e) => {
        //  1.样式的改变
        let {lastScore, scoreDescArray, matterScoreInfo, scoreDesc, content, score} = this.state;
        
        let isActive = item.isActive;
        
        for (let i = 0; i < content.length; i++) {
            if (i === index) {
                content[i].isActive = !isActive;
                break;
            }
        }
        
        //  2.数据的改变 (操作score, 把用户选中的数据推到一个数组中)
        if (isActive) {
            //  选中-->不选中  剔除数据 分数加上选中的分数
            lastScore = lastScore - Number(item.score); 
            score = score - Number(item.score);
            lastScore = Number(lastScore && lastScore.toFixed(1)); 
            scoreDescArray = scoreDescArray.filter((item1) => {
                return item1.scoreDesc !== item.scoreDesc;
            });
        } else {
            //  不选中-->选中  添加数据 分数减去选中的分数
            lastScore = lastScore + Number(item.score);
            score = score + Number(item.score);
            lastScore = Number(lastScore && lastScore.toFixed(1));
            scoreDescArray.push({score: item.score, scoreDesc: item.scoreDesc});
        }

        scoreDesc = this.handleScoreDesc(scoreDescArray);
        matterScoreInfo.scoreDesc = scoreDesc;
        matterScoreInfo.lastScore = lastScore;
        matterScoreInfo.score = score;
        this.setState({lastScore, score, scoreDescArray, scoreDesc, content});
        this.props.getMatterScoreInfo(matterScoreInfo);
        this.props.getMatterContent(content);
    }
    
    //  把用户选中的数据，处理成后端要的格式
    handleScoreDesc = (scoreDescArray) => {
        let newScoreDesc = [];
        scoreDescArray.forEach((item) => {
            newScoreDesc.push(`${item.scoreDesc},${item.score}`);
        });
        let scoreDesc = newScoreDesc.join(";");
        return scoreDesc;
    }

    render () {
        let {lastScore, content} = this.state;
        let {lastScoreDesc} = this.props;
        if (lastScoreDesc && typeof lastScoreDesc === 'string') {
            lastScoreDesc = lastScoreDesc.split(';');
        }
        return (
            <div className={styles.sselect__wrap}>
                <p className={styles.score}>
                    <span className={styles.score__title}>当前评分&nbsp;</span>
                    <span className={styles.score__val}>{lastScore && lastScore.toFixed(1)}</span>
                </p>

                {/* 评分模式 */}
                <div className={styles.standard__wrap}>
                    <p className={styles.standard__title}>评价标准</p>
                    <div className={styles.standard}>
                        {content && content.map((item, index) => <span className={`${styles.standard__item} ${item.isActive === true ? styles.standard__item_active : ''}`} 
                            key={index}>  
                            <span className={styles.standard__item_name}
                                onClick={(e) => {
                                    this.handleStandard(index, item, e);
                                }}>{item.scoreDesc}</span> 
                            <span className={styles.standard__item_score}>{item.score}</span>
                        </span>)}
                    </div>
                </div>

                {/* 今日已评价 */}
                <div>
                    {lastScoreDesc && 
                    <div className={styles.have__evaluation_wrap}>
                        <p className={styles.title}>今日已评价</p>
                        {
                            lastScoreDesc.map((item, index) => {
                                let scoreDesc = '';
                                let score = '';
                                if (item) {
                                    scoreDesc = item.split(',')[0];
                                    score = item.split(',')[1];
                                }
                                return (
                                    <span key={index}>
                                        {item && <span className={styles.have__evaluation_item} >
                                            <FrameText text={`${scoreDesc} ${score ? score : ''}`} borderColor="#dbdbdb"/>
                                        </span>}
                                    </span>
                                );
                            })
                        }
                    </div>
                    }
                </div>
            </div>
        );
    }
}


