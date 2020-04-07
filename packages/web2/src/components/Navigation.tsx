import React from "react";
import { Heading, Box, ResponsiveContext, Button } from "grommet"
import { Account } from "./Account"
import { DarkTheme } from "../App";


export const Navigation: React.FC = () => {
    const size = React.useContext<string>(ResponsiveContext);
    const [darkTheme, setDarkTheme] = React.useContext(DarkTheme)
    return (
        <Box margin="small" direction="row" justify="between" align="center">
            <Box>
                {size === "small" || size === "medium" || size === "large" ?
                    <Heading size={size} level={1}>Flash Invoice</Heading>
                    :
                    <Heading level={1}>Flash Invoice</Heading>
                }
            </Box>
            <Box direction="row" gap="small" >
                <Account></Account>
                <Button size="small" label={darkTheme ? "Light" : "Dark"} onClick={() => setDarkTheme(!darkTheme)}></Button>
            </Box>
        </Box>
    )
}