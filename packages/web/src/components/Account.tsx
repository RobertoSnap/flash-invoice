import { Box, Button, Layer, Text } from "grommet"
import { User, BusinessService } from "grommet-icons";
import React, { useState, useContext } from "react";
import { Rotate } from "../utils/Rotate";

import { AccountEdit } from "./account/AccountEdit";
import { SpaceContext } from "../App";

export const Account: React.FC = () => {
    // const size = React.useContext<string>(ResponsiveContext);
    const [space, name] = useContext(SpaceContext)
    const [show, setShow] = useState(false);

    return (
        <Box>
            {name ?
                <Button icon={<User />} label={"Connected as " + name} size="small" reverse onClick={() => setShow(true)} ></Button>
                :
                <Button label="Connect" size="small" onClick={() => setShow(true)}></Button>
            }
            {show &&
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                    modal

                >
                    <Box margin="large" pad="large" gap="small">
                        {!space &&
                            <Box align="center" gap="small">
                                <Text>Fetching your account...</Text>
                                <Rotate>
                                    <BusinessService size="large" ></BusinessService>
                                </Rotate>
                            </Box>
                        }
                        {space &&
                            <AccountEdit />
                        }
                        <Button label="close" onClick={() => setShow(false)} color="status-warning" hoverIndicator />
                    </Box>
                </Layer>
            }
        </Box>
    )
}