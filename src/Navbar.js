import React from "react";
import { Link } from "react-router-dom";

export default function MyNavbar() {

    return (
        <div className="navbar-outer-div">
            <div style={{ display: "inline-flex" }}>
                <div style={{ display: "flex", alignItems: "center", marginLeft: "10px", fontSize: "18px" }}>
                    <Link to="/" >
                        <span style={{ margin: "0px 15px 0px 0px", color: "#fff" }}>Home</span>
                    </Link>
                    <span> | </span>
                    <Link to="/income_model" >
                        <span style={{ margin: "0px 15px 0px 15px", color: "#fff" }}>Income Classification</span>
                    </Link>
                    <span> | </span>
                    <Link to="/sarthak" >
                        <span style={{ margin: "0px 15px 0px 15px", color: "#fff" }}>Sarthak</span>
                    </Link>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: "25px", margin: "0px 20px", fontStyle: "italic", cursor: "pointer" }}>
                    DS SCE
                </div>
            </div>
        </div>
    );
}