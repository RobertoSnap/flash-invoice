import React, { useState, useEffect } from 'react';
import { Box, Button, Text, TextInput, Grid, Select } from "grommet"
import { Save } from "grommet-icons";
import { use3Box, Customer } from '../../utils/use3Box';
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

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const doAsync = async () => {
            const space = await getSpace()
            const thread = await space.joinThread('customerList', {
                // firstModerator: address,
                members: true
            })
            const posts = await thread.getPosts()
            const promises = posts.map(({ postId, message }: { postId: string, message: string }) => {
                return space.private.get(postId)
            })
            const customers = (await Promise.all(promises)).filter((maybeCustomer: any) => {
                return maybeCustomer && maybeCustomer.name && typeof (maybeCustomer.name) === "string"
            }) as Customer[]
            setCustomers(customers)
        };
        doAsync();
    }, [])

    return (
        <>
            <Box gap="small">
                <Text size="large">Create invoice</Text>

                <Box border="top"></Box>
                <Box>
                    <Grid columns={['xsmall', 'flex']} gap="small" >
                        <Text alignSelf="center">Customer</Text>
                        <Select
                            options={customers}
                            value={form.customer}
                            onChange={({ option }) => setForm(old => ({ ...old, customer: option }))}

                        />
                    </Grid>
                </Box>



                <Button
                    icon={<Save />}
                    label="Create invoice"
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