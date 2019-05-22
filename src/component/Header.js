import React from "react";

// import css
import "./Header.scss";

// import images
import mainLogo from "../images/logo-dragon.png";

class Header extends React.Component {
    render() {
        return (
            <div className="component-header">
                <div className="header-container">
                    <div className="header-logo">
                        <img className="logo" src={mainLogo} alt="Dragon Logo" />
                    </div>
                    <h1 className="header-title">
                        Radiative Capture Calculator
                    </h1>
                </div>
            </div>
        );
    }
}
export default Header;