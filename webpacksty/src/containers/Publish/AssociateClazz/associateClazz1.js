import React from 'react';
import {connect} from 'react-redux';
import axios from '../../../utils/axiosApi';
import styles from './associateClazz.scss';

// 这里是关联班级可以更改的文件
class AssociateClazz extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            clazzIds: [],
            clazzList: [],
            canChangeClazz: true
        };
    }

    componentDidMount () {
        
        const {targetObject} = this.props;
        if (targetObject.targetId || targetObject.targetId === 0) {
            this.getAssociateClazzs();
        }
    }

    componentDidUpdate (prevProps) {
        //  宿舍改变，则其关联的班级数据改变
        if (prevProps.targetObject !== this.props.targetObject) {
            this.getAssociateClazzs();
        }

        if (prevProps.historyData !== this.props.historyData) {
            //  历史得分记录改变，判断是否已评价过，评价过，则不可以再对关联班级进行操作
            if (this.props.historyData.clazzIds !== null) {
                let clazzIds = this.props.historyData.clazzIds;
                clazzIds = clazzIds.split(',');
                this.props.getClazzIds(clazzIds);
                this.setState({clazzIds, canChangeClazz: false}, () => {
                    this.activeHistoryClazz();
                });
            } else {
                this.initClazz();
                this.setState({canChangeClazz: true});
            }
        }
    }

    //  高亮历史评价的班级
    activeHistoryClazz = () => {
        let {clazzIds, clazzList} = this.state;
        clazzList.forEach((item) => {
            item.isChecked = false;
            for (let i = 0; i < clazzIds.length; i++) {
                if (String(clazzIds[i]) === String(item.id)) {
                    item.isChecked = true;
                }
            }
        });
        this.setState({clazzList});
    }

    //  得到选择的宿舍对象关联的班级
    getAssociateClazzs = () => {
        let {targetObject} = this.props;
        let dormId = targetObject.targetId;
        let url = `/auth/global/evaluation/eva/app/getAssociatedClazzsForDorm.htm`;
        axios('get', url, {dormId}).then((json) => {
            if (json.success) {
                let clazzList = json.data;
                this.setState({clazzList}, () => {
                    this.initClazz();
                }); 
            }
        });
    }

    //  初始化的班级数据
    initClazz = () => {
        let {clazzList} = this.state;
        let clazzIds = [];
        clazzList.forEach((item) => {
            clazzIds.push(item.id);
            item.isChecked = true;
        });
        this.setState({clazzIds, clazzList});
        this.props.getClazzIds(clazzIds);
    }

    //  选中或者取消关联班级
    handleClazz = (item) => {
        const {canChangeClazz} = this.state;
        if (!canChangeClazz){
            return;
        }
        let {clazzList, clazzIds} = this.state;
        let {id, isChecked} = item;
        let curIndex = clazzList.findIndex((clazz) => {
            return clazz.id === id;
        });
        //  选中 ->未选中  剔除数据
        if (isChecked) {
            if (this.state.clazzIds.length === 1) {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showToast', [{'content': '至少关联一个班级'}]);
                return;
            }
            let curIdIndex = clazzIds.findIndex((curId) => {
                return curId === id;
            });
            //  删除选中的额数据
            clazzIds.splice(curIdIndex, 1);
        } else {
            clazzIds.push(id);
        }
        clazzList[curIndex].isChecked = !isChecked;
        this.props.getClazzIds(clazzIds);
        this.setState({clazzList, clazzIds});
    }

    render() {
        const {clazzList} = this.state;
        return (
            <div className={styles.associateClazz}>
                {/* <p className={styles.title}>关联班级</p> */}
                {clazzList.length ? 
                    <div className={styles.content}>
                        {
                            clazzList.map((item) => <span key={item.id} 
                                className={`${styles.oneItem} ${item.isChecked ? styles.curItem : ''}`}
                                // onClick={() => {
                                //     this.handleClazz(item);
                                // }}
                            >
                                {item.name}</span>)
                        }
                    </div> : <p className={styles.emptyText}>当前宿舍没有关联班级</p>
                }
            </div>
        );
    }
}

export default connect(state => ({
    historyData: state.historyData,
    targetObject: state.targetObject
}))(AssociateClazz);