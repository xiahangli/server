import React from 'react';
import {NavLink} from 'react-router-dom';
const NavBar = () =>(
    <div>
        <div>
            <NavLink exact to='/'>Jsdemoa</NavLink>
            <NavLink to='/Jsdemob'>Jsdemob</NavLink>
            <NavLink to='/Jsdemoc'>Jsdemoc</NavLink>
        </div>
    </div>
)
export default NavBar;