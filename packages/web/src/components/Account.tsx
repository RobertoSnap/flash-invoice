import { Box, Button, ResponsiveContext, Anchor } from "grommet"
import { User } from "grommet-icons";
import React from "react";


export const Account: React.FC = () => {
    const size = React.useContext<string>(ResponsiveContext);
    return (
        <Box>
            {size === "small" || size === "medium" || size === "large" ?
                <Button label="Create account" size="small" ></Button>
                :
                <Anchor icon={<User />}></Anchor>
            }
        </Box>
    )
}