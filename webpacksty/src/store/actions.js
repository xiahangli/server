import { 
    UPDATETARGETTYPEDATA,
    UPDATEFIRSTITEM, 
    DELETEFIRSTITEM,
    UPDATEBEHAVIORDATA, DELETEBEHAVIORDATA,
    UPDATESTANDARDDATA,
    UPDATEBATCHOBJECTARRAY,
    UPDATESTARTTIME
} from './action-types';

//  更新一级菜单的数据
export const updateTargetTypeData = targetTypeData => ({type: UPDATETARGETTYPEDATA, targetTypeData}); 

//  更新一级菜单的数据
export const updateFirstItem = firstItem => ({type: UPDATEFIRSTITEM, firstItem}); 

//  清空一级菜单的数据
export const deleteFirstItem = firstItem => ({type: DELETEFIRSTITEM, firstItem}); 

//  更新行为管理数据
export const updateBehaviorData = behaviorData => ({type: UPDATEBEHAVIORDATA, behaviorData});

// 清空行为管理的数据  DELETEBEHAVIORDATA
export const deleteBehaviorData = behaviorData => ({type: DELETEBEHAVIORDATA, behaviorData});

//  更新评分模式和初始分的数据
export const updateStandardData = shareStandardData => ({type: UPDATESTANDARDDATA, shareStandardData});

//  更新批量评价数据
export const updateBatchObjectArray = batchObjectArray => ({type: UPDATEBATCHOBJECTARRAY, batchObjectArray});

//  更新时间
export const updateStartTime = startTime => ({type: UPDATESTARTTIME, startTime});
