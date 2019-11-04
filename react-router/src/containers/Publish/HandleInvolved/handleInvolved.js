import React from 'react';
import styles from './handleInvolved.scss';
import delPic from '../../../assets/images/del.png';
import {connect} from 'react-redux';
import {updateBatchObjectArray} from '../../../assets/actions';
class HandleInvolved extends React.Component{

    addStu = (curBatchIndex) => {
        this.props.history.replace({pathname: '/evaluate/involvedStudent', query: {curBatchIndex: curBatchIndex}});
    }

    delOneStu = (batchObjectArray, curBatchIndex, studentId) => {
        let actors = batchObjectArray[curBatchIndex].actors;
        if (typeof actors === 'string') {
            actors = JSON.parse(actors);
        }
        let delIndex = actors.findIndex((item) => {
            return item.studentId === studentId;
        });
        actors.splice(delIndex, 1);
        actors = JSON.stringify(actors);
        batchObjectArray[curBatchIndex].actors = actors;
        this.props.updateBatchObjectArray(batchObjectArray);
    }

    render() {
        let {curBatchIndex, batchObjectArray} = this.props;
        let actors = batchObjectArray[curBatchIndex].actors;
        if (actors && typeof actors === 'string') {
            actors = JSON.parse(actors);
        }
        return (
            <div>
                {actors && actors.map((item) => {
                    return <span className={styles.oneStu} key={item.studentId}>
                        {item.studentName}&nbsp;&nbsp;{item.studentNo}
                        <span className={styles.del} onClick={() => {
                            this.delOneStu(batchObjectArray, curBatchIndex, item.studentId);
                        }}>
                            <img src={delPic}/>
                        </span>
                    </span>;
                })}
                
                <span className={styles.addStu} onClick={() => {
                    this.addStu(curBatchIndex);
                }} >
                    <i className="evaiconfont">&#xe61b;</i>
                </span>
            </div>
        );
    }
}

export default connect(
    state => ({batchObjectArray: state.batchObjectArray}),
    {updateBatchObjectArray}
)(HandleInvolved);