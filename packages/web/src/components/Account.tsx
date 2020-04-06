import { Box, Button, Layer, Text } from "grommet"
import { User, BusinessService } from "grommet-icons";
import React, { useState, useEffect } from "react";
import { Rotate } from "../utils/Rotate";

import { AccountEdit } from "./account/AccountEdit";
import { use3Box } from "../utils/use3Box";
import { useSpace } from "../utils/useSpace";

export const Account: React.FC = () => {
    // const size = React.useContext<string>(ResponsiveContext);
    const [show, setShow] = useState(false);
    const [space, setSpace] = useState();
    const { getSpace } = use3Box()
    const { getName } = useSpace(space)
    const [name, setName] = useState<string | undefined>();

    useEffect(() => {
        const doAsync = async () => {
            setSpace(await getSpace())
            setName(await getName())
        };
        doAsync();
    })

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
                        {space && name &&
                            <AccountEdit name={name} />
                        }
                        <Button label="close" onClick={() => setShow(false)} color="status-warning" hoverIndicator />
                    </Box>
                </Layer>
            }
        </Box>
    )
}