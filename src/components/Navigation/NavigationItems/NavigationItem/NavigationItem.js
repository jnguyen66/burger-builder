import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom'

const navigationItem = (props) =>(
    <li className={classes.NavigationItem}>
        {/* Same way as navlink but with anchor tag
         <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>
          Same way as above but with navlink  */}
        <NavLink
          to={props.link}
          //link to the exact props passed by navgalinks to keep active class from being applied
          // all links
          exact={props.exact}
          // the active class that navlink defaults to will not be the same class
          // our unique one created by css modules, Therefore must use below to point
          // our created class in css
          activeClassName={classes.active}
          >{props.children}
        </NavLink>
    </li>
)

export default navigationItem;
