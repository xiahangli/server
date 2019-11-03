// import React from 'react';
import Loadable from "react-loadable";
import Loading from '../components/Loading/index1.jsx';
const timeout = 1000;
//文件按需加载批处理
// export const Home=Loading;

export const Home = new Loadable({
    loader: () => import("../containers/Home/home"),
    loading: Loading,
    timeout: timeout
});
export const InvolvedStudent = new Loadable({
    loader: () => import("../containers/InvolvedStudent/involvedStudent"),
    loading: Loading,
    timeout: timeout
}); 
export const Publish = new Loadable({
    loader: () => import("../containers/Publish/publish"),
    loading: Loading,
    timeout: timeout
});
export const EvaluationObject = new Loadable({
    loader: () => import("../containers/EvaluationObject/evaluationObject"),
    loading: Loading,
    timeout: timeout
});

export const EvaluationDetail = new Loadable({
    loader: () => import("../containers/EvaluationDetail/evaluationDetail"),
    loading: Loading,
    timeout: timeout
});

export const IReleased = new Loadable({
    loader: () => import("../containers/IReleased/iReleased"),
    loading: Loading,
    timeout: timeout
});

export const HdIReleased = new Loadable({
    loader: () => import("../containers/IReleased/hdIReleased"),
    loading: Loading,
    timeout: timeout
});

export const ToAudit = new Loadable({
    loader: () => import("../containers/Audit/ToAudit/toAudit"),
    loading: Loading,
    timeout: timeout
});

export const HdToAudit = new Loadable({
    loader: () => import("../containers/Audit/ToAudit/hdToAudit"),
    loading: Loading,
    timeout: timeout
});

export const AuditLogging = new Loadable({
    loader: () => import("../containers/Audit/AuditLogging/auditLogging"),
    loading: Loading,
    timeout: timeout
});

export const HdAuditLogging = new Loadable({
    loader: () => import("../containers/Audit/AuditLogging/hdAuditLogging"),
    loading: Loading,
    timeout: timeout
});

export const WeeklyReport = new Loadable({
    loader: () => import("../containers/WeeklyReport/weeklyReport"),
    loading: Loading,
    timeout: timeout
});

export const HaveRead = new Loadable({
    loader: () => import("../containers/EvaluationDetail/haveRead"),
    loading: Loading,
    timeout: timeout
});

export const HdMyRecords = new Loadable({
    loader: () => import("../containers/HdMyRecords/hdMyRecords"),
    loading: Loading,
    timeout: timeout
});

export const Test = new Loadable({
    loader: () => import("../containers/Test/test"),
    loading: Loading,
    timeout: timeout
});
