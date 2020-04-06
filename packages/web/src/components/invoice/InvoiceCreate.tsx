import React, { useState } from 'react';
import { Box, Button, Text, TextInput, Grid, Select } from "grommet"
import { Save } from "grommet-icons";
import { use3Box } from '../../utils/use3Box';
import { useWeb3 } from '../../utils/useWeb3';

interface Props { }

export interface CreateInvoiceForm {
    customer?: string
}
export const InvoiceCreate: React.FC<Props> = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { getSpace } = use3Box()
    const { getWeb3, getAddress } = useWeb3()

    const [form, setForm] = useState<CreateInvoiceForm>({});

    const setTestValues = () => {
        setForm({
            "customer": "111"
        })
    }

    const onSubmit = async () => {
        setIsSubmitting(true)
        const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const space = await getSpace()
        // const web3 = await getWeb3()
        // const address = await getAddress(web3)
        console.log("RandomID", randomId);

        const thread = await space.joinThread('customerList', {
            // firstModerator: address,
            members: true
        })
        const postId = await thread.post(randomId)
        const postData = await space.private.set(postId, form)
        console.log("postData", postData);

        setIsSubmitting(false)
    }

    const [customers, setCustomers] = useState([]);
    return (
        <>
            <Box gap="small">
                <Text size="large">Create invoice</Text>

                <Box border="top"></Box>
                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small" >
                        <Text alignSelf="center">Customer</Text>
                        <Select
                            options={['small', 'medium', 'large']}
                            value={customers}
                            onChange={({ option }) => setForm(old => ({ ...old, customer: option }))}
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