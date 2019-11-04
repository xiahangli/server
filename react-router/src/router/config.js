import {Home, EvaluationObject, InvolvedStudent, Publish, EvaluationDetail,
    IReleased, HdIReleased, ToAudit, HdToAudit, AuditLogging, HdAuditLogging, WeeklyReport, 
    HaveRead, HdMyRecords, Test} from '../router/index';
const routerConfig = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/evaluate',
        component: Home,
        exact: true
    },
    {
        path: '/evaluate/publish', 
        component: Publish,
        exact: true
    },
    {
        path: '/evaluate/involvedStudent',
        component: InvolvedStudent,
        exact: true
    },
    {
        path: '/evaluate/objection',
        component: EvaluationObject,
        exact: true
    },
    {
        path: '/evaluationDetail',
        component: EvaluationDetail,
        exact: true
    },
    {
        path: '/iReleased',
        component: IReleased,
        exact: true
    },
    {
        path: '/hd/iReleased',
        component: HdIReleased,
        exact: true
    },
    {
        path: '/toAudit',
        component: ToAudit,
        exact: true
    },
    {
        path: '/hd/toAudit',
        component: HdToAudit,
        exact: true
    },
    {
        path: '/auditLogging',
        component: AuditLogging,
        exact: true
    },
    {
        path: '/hd/auditLogging',
        component: HdAuditLogging,
        exact: true
    },
    {
        path: '/weeklyReport',
        component: WeeklyReport,
        exact: true
    },
    {
        path: '/haveRead',
        component: HaveRead,
        exact: true
    },
    {
        path: '/hd/MyRecords',
        component: HdMyRecords,
        exact: true
    },
    {
        path: '/test',
        component: Test,
        exact: true
    }
];
export {routerConfig};
