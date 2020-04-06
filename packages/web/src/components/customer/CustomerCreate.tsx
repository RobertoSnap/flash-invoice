import React, { useState } from 'react';
import { Box, Button, Text, TextInput, Grid } from "grommet"
import { Save } from "grommet-icons";
import { use3Box } from '../../utils/use3Box';
import { useWeb3 } from '../../utils/useWeb3';

interface Props { }

export interface CreateCustomerForm {
    name?: string
    email?: string
    orgNumber?: number
    address1?: string
    postcode?: number
    city?: string
}
export const CustomerCreate: React.FC<Props> = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { getSpace } = use3Box()
    const { getWeb3, getAddress } = useWeb3()

    const [form, setForm] = useState<CreateCustomerForm>({});

    const setTestValues = () => {
        setForm({
            "name": "Testcompany LTD",
            "email": "test@test.com",
            "orgNumber": 999555444,
            "address1": "Test road 1",
            "postcode": 1551,
            "city": "Oslo",
        })
    }

    const onSubmit = async () => {
        setIsSubmitting(true)
        const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const space = await getSpace()
        const web3 = await getWeb3()
        const address = await getAddress(web3)
        console.log(address, randomId);

        const thread = await space.joinThread('customerList', {
            firstModerator: address,
            members: true
        })
        console.log(thread);
        setIsSubmitting(false)
    }

    return (
        <>

            <Box gap="small">
                <Text size="large">Create customer</Text>

                <Box border="top"></Box>
                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small" >
                        <Text alignSelf="center">Name</Text>
                        <TextInput
                            value={form.name}
                            name="name"
                        />
                    </Grid>
                </Box>

                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small">
                        <Text alignSelf="center">Email</Text>
                        <TextInput
                            value={form.email}
                            name="email"
                        />
                    </Grid>
                </Box>

                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small" >
                        <Text alignSelf="center">Org. number</Text>
                        <TextInput
                            value={form.orgNumber}
                            name="orgNumber"
                            type={"number"}
                        />
                    </Grid>
                </Box>



                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small">
                        <Text alignSelf="center">Address1</Text>
                        <TextInput
                            value={form.address1}
                            name="address1"
                        />
                    </Grid>
                </Box>

                <Box>
                    <Grid columns={['xsmall', 'xsmall', "flex"]} gap="small">
                        <Text alignSelf="center">Postcode</Text>
                        <TextInput
                            value={form.postcode}
                            name="postcode"
                            type={"number"}

                        />
                        <TextInput
                            value={form.city}
                            name="city"
                        />
                    </Grid>
                </Box>

                <Button
                    icon={<Save />}
                    label="Create"
                    type="submit"
                    disabled={isSubmitting}
                    color="status-ok"
                    hoverIndicator
                    onClick={() => onSubmit()}
                />
            </Box>
            {process.env.NODE_ENV === "development" &&
                <Button label="Set test values" onClick={() => setTestValues()} size="small" margin={{ top: "small" }}></Button>
            }
        </>
    )

}