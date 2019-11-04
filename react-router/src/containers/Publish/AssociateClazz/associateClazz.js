import React from 'react';
import {connect} from 'react-redux';
import styles from './associateClazz.scss';

class AssociateClazz extends React.Component{
    render () {
        const {curBatchIndex} = this.props;
        let actClazz = this.props.batchObjectArray[curBatchIndex].actClazz;
        if (actClazz && typeof actClazz === 'string') {
            actClazz = JSON.parse(actClazz);
        }
        return (
            <div className={styles.associateClazz}>
                {(actClazz || []).length ? 
                    <div className={styles.content}>
                        {
                            actClazz.map((item) => <span key={item.clazzId} 
                                className={`${styles.oneItem} ${item.isChecked ? styles.curItem : ''}`}
                                // onClick={() => {
                                //     this.handleClazz(item);
                                // }}
                            >
                                {item.clazzName}</span>)
                        }
                    </div> : <p className={styles.emptyText}>当前宿舍没有关联班级</p>
                }
            </div>
        );
    }
}

export default connect(state => ({
    batchObjectArray: state.batchObjectArray
}))(AssociateClazz);