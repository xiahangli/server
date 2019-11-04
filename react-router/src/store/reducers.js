import {combineReducers} from 'redux';
import {
    UPDATETARGETTYPEDATA,
    UPDATEFIRSTITEM, 
    DELETEFIRSTITEM,
    UPDATEBEHAVIORDATA, DELETEBEHAVIORDATA,
    UPDATESTANDARDDATA,
    UPDATEBATCHOBJECTARRAY,
    UPDATESTARTTIME
} from './action-types';

//  行为管理数据的初始值
const B_INITIAL_STATE = {};

//  评价方案的数据
function targetTypeData(state = B_INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATETARGETTYPEDATA:
            return {
                state,
                // ...action.targetTypeData
            };
        default:
            return state;
    }
}

//  一级菜单栏的信息获取
function firstItem(state = B_INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATEFIRSTITEM: 
            return {
                ...state,
                ...action.firstItem
            };
        case DELETEFIRSTITEM:
            return {};
        default:
            return state; 
    }
}

//  行为习惯管理的数据
function behaviorData(state = B_INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATEBEHAVIORDATA:
            return {
                ...state,
                ...action.behaviorData,
            };
        case DELETEBEHAVIORDATA:
            return {};
        default:
            return state;
    }
}

//  更新评分模式和初始分的数据
function shareStandardData(state = B_INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATESTANDARDDATA:
            return {
                ...state,
                ...action.shareStandardData
            };
        default: 
            return state;
    }
}

//  批量评价对象
function batchObjectArray (state = [], action) {
    switch (action.type) {
        default : return state;
        case UPDATEBATCHOBJECTARRAY:
            return [...action.batchObjectArray];
    }
}

// {objectVal, lastScore, remarkPicture, remarkText, remarkVideo, scoreDesc, studentRel, targetId}

function startTime (state = new Date(), action) {
    switch (action.type) {
        default: return state;
        case UPDATESTARTTIME:
            return action.startTime;
    }
}

export default combineReducers({
    targetTypeData, firstItem, behaviorData,
    shareStandardData, batchObjectArray, startTime
});