import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {routerConfig} from 'ROUTER/config';
// import commonFn from 'UTILS/commonFn';
import 'UTILS/zhcn_moment';
import "./sass/index.scss";

class Main extends Component {
    componentDidMount() {
        document.cookie = "ticket=VFdwQlBRPT07SlNRc0l5VXNKQ0VzOzIwMjA=;";
        // let _d = commonFn.getCookie('_d');
        // let isLekePad = _d && _d.indexOf('hd') !== -1;
        let isLekePad = true;
        sessionStorage.setItem('isLekePad', isLekePad);
        
        let title = isLekePad ? 'noTitle' : 'hideTitle';
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/evaluate') {
            title = '智慧评价';
        }
        let realTitle; 
        if (title === '智慧评价') {
            realTitle = '智慧评价';
        } else {
            realTitle = '';
        }
        document.title = title;
        if (isLekePad) {
            window.LeKeBridge.sendMessage2Native("updateAndroidTitle", realTitle + 789);
        } else {
            document.addEventListener('deviceready', function() {
                window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', [realTitle]);
            }, false);
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            let title = "";
            switch (this.props.location.pathname) {
                case "/":
                    title = '智慧评价';
                    break;
                case "/evaluate":
                    title = "智慧评价";
                    break;
                case "/evaluate/publish":
                    title = "发布评价";
                    break;
                case "/evaluate/involvedStudent":
                    title = "关联学生";
                    break;
                case "/evaluate/objection":
                    title = "选择评价对象";
                    break;
                case "/iReleased":
                    title = "我发布的";
                    break;
                case "/hd/iReleased":
                    title = "我发布的";
                    break;
                case "/toAudit":
                    title = "待我审核";
                    break;
                case "/auditLogging":
                    title = "审核记录";
                    break;
                case "/weeklyReport":
                    title = "周报分析";
                    break;
                case "/hd/MyRecords":
                    title = "关于我的";
                    break;
                default:
                    title = ""; 
                    break;
            }
            let isLekePad = sessionStorage.getItem('isLekePad');
            document.title = title;
            if (isLekePad) {
                console.log('isLekePad');
                window.LeKeBridge.sendMessage2Native("updateAndroidTitle", title + 123);
            } else {
                document.addEventListener('deviceready', function() {
                    window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', [title]);
                }, false);
            }
        }
    }

    render() {
        return (
            <Switch> 
                {
                    routerConfig.map((item, index)=>{
                        const {path, component, exact} = item;
                        return (
                            <Route
                                key={index}
                                path={path}
                                component={component}
                                exact={exact} 
                            />
                        );
                    })
                }
            </Switch>
        );
    }
}

export default withRouter(Main);
