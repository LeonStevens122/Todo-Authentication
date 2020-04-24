import React from 'react';
// 
import "./NavButton.scss";

// export navbutton component

const NavButton = props => (
    <Link href={props.path}>
        <div
            className={`NavButton ${
                props.router.pathname === props.path ? "active" : ""
                }`}
        >
            <div className="Icon">{props.icon}</div>
            <span className="Label">{props.label}</span>
        </div>
    </Link>
);

export default NavButton;