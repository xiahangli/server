// import React from 'react';
import Loadable from "react-loadable";
import Loading from 'COMPONENTS/Loading/index1.jsx';
const timeout = 1000;
//文件按需加载批处理
// export const Home=Loading;

export const Home = new Loadable({
    loader: () => import("CONTAINERS/Home/home"),
    loading: Loading,
    timeout: timeout
});
export const InvolvedStudent = new Loadable({
    loader: () => import("CONTAINERS/InvolvedStudent/involvedStudent"),
    loading: Loading,
    timeout: timeout
}); 
export const Publish = new Loadable({
    loader: () => import("CONTAINERS/Publish/publish"),
    loading: Loading,
    timeout: timeout
});
export const EvaluationObject = new Loadable({
    loader: () => import("CONTAINERS/EvaluationObject/evaluationObject"),
    loading: Loading,
    timeout: timeout
});

export const EvaluationDetail = new Loadable({
    loader: () => import("CONTAINERS/EvaluationDetail/evaluationDetail"),
    loading: Loading,
    timeout: timeout
});

export const IReleased = new Loadable({
    loader: () => import("CONTAINERS/IReleased/iReleased"),
    loading: Loading,
    timeout: timeout
});

export const HdIReleased = new Loadable({
    loader: () => import("CONTAINERS/IReleased/hdIReleased"),
    loading: Loading,
    timeout: timeout
});

export const ToAudit = new Loadable({
    loader: () => import("CONTAINERS/Audit/ToAudit/toAudit"),
    loading: Loading,
    timeout: timeout
});

export const HdToAudit = new Loadable({
    loader: () => import("CONTAINERS/Audit/ToAudit/hdToAudit"),
    loading: Loading,
    timeout: timeout
});

export const AuditLogging = new Loadable({
    loader: () => import("CONTAINERS/Audit/AuditLogging/auditLogging"),
    loading: Loading,
    timeout: timeout
});

export const HdAuditLogging = new Loadable({
    loader: () => import("CONTAINERS/Audit/AuditLogging/hdAuditLogging"),
    loading: Loading,
    timeout: timeout
});

export const WeeklyReport = new Loadable({
    loader: () => import("CONTAINERS/WeeklyReport/weeklyReport"),
    loading: Loading,
    timeout: timeout
});

export const HaveRead = new Loadable({
    loader: () => import("CONTAINERS/EvaluationDetail/haveRead"),
    loading: Loading,
    timeout: timeout
});

export const HdMyRecords = new Loadable({
    loader: () => import("CONTAINERS/HdMyRecords/hdMyRecords"),
    loading: Loading,
    timeout: timeout
});

export const Test = new Loadable({
    loader: () => import("CONTAINERS/Test/test"),
    loading: Loading,
    timeout: timeout
});
