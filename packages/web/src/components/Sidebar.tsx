import React from 'react';
import { Nav, Button, ThemeContext } from "grommet"
import { Home, Sign, Document, Cluster, Tools } from "grommet-icons"
import {
    Link
} from "react-router-dom";


const navItem = (path: string, label: string, icon: JSX.Element) => (
    <Link to={path} >
        <Button icon={icon} label={label} plain hoverIndicator fill="horizontal" color="brand" size="large" style={{ padding: "5px" }} />
    </Link>
)

export const Sidebar: React.FC = () => {
    return (
        <ThemeContext.Extend value={{ global: { colors: { doc: '#ff99cc' } } }}>

            <Nav direction="column" pad="small" align="start">
                {navItem("/", "Home", <Home />)}
                {navItem("/customers", "Customers", <Sign />)}
                {navItem("/invoice", "Invoice", <Document />)}
                {navItem("/XXpage", "XXpage", <Cluster />)}
                {navItem("/XXpage", "XXpage", <Tools />)}

            </Nav>
        </ThemeContext.Extend>
    )
}