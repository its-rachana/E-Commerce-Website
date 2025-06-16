import {Menu, MenuItem, Navbar, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Popover2} from "@blueprintjs/popover2";
import React from "react";

const Header = () =>{
    const dropdownMenu = (
        <Menu>
            <MenuItem text="Profile" icon="user"/>
            <MenuItem text="Settings" icon="cog"/>
            <MenuItem text="Logout" icon="log-out"/>
        </Menu>
    );
    return(
        <Navbar>
            <NavbarGroup align="left">
                <NavbarHeading>
                    <div className={"row-cols-1"}>
                        <h4>Account</h4>
                        <h6>Rachana Angara</h6>
                    </div>
                </NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align="right">
                <Popover2
                    content={dropdownMenu}
                    placement="bottom-end"
                    popoverClassName="bp5-minimal"
                    interactionKind="click"
                >
                    <div
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "black",
                            outline: "none",
                            border: "none",
                            background: "transparent",
                            boxShadow: "none"
                        }}
                        tabIndex={0}
                        onFocus={(e) => e.currentTarget.blur()} // prevent focus styling
                    >
                        Menu

                    </div>
                </Popover2>
            </NavbarGroup>
        </Navbar>
    )
}

export default Header;
