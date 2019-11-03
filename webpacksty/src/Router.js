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
//             <Switch>
//                 <Route exact path="/" component={Jsdemo} />
//                 <Route  path="/Jsdemob" component={Jsdemob} />
//                 <Route  path="/Jsdemoc" component={Jsdemoc} />
//             </Switch>
//         </div>
//     </HashRouter>
// );

export default BasicRoute;