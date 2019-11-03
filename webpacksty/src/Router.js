import React from 'react';
import Jsdemo from './jsdemo';
import Jsdemob from './jsdemob';
import Jsdemoc from './jsdemoc';
import Nav from './nav';
import {BrowserRouter as Router , Route} from 'react-router-dom';
const BasicRoute = () => (
    <Router>
        <div>
        <Nav/>
            <Route exact path="/" component={Jsdemo} />
            <Route  path="/Jsdemob" component={Jsdemob} />
            <Route  path="/Jsdemoc" component={Jsdemoc} />
        </div>
    </Router>
);
// const BasicRoute = () => (
//     <HashRouter>
//         <div>
//             <Nav/>
//如果我们希望一次只渲染一个路径组件，
// 可以使用 <switch> 标签。它按顺序检查每个路径的匹配并在找到第一个匹配后停止
//             <Switch>
//                 <Route exact path="/" component={Jsdemo} />
//                 <Route  path="/Jsdemob" component={Jsdemob} />
//                 <Route  path="/Jsdemoc" component={Jsdemoc} />
//             </Switch>
//         </div>
//     </HashRouter>
// );

export default BasicRoute;