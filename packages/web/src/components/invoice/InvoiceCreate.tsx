import React, { useState, useEffect } from 'react';
import { Box, Button, Text, /* TextInput, */ Grid, Select, Calendar } from "grommet"
import { Save } from "grommet-icons";
import { use3Box, Customer } from '../../utils/use3Box';
// import { useWeb3 } from '../../utils/useWeb3';
import { useForm, Controller } from 'react-hook-form';

interface Props { }

interface CreateInvoice {
    customer?: string,
    saleDate?: string
}

const defaultValues: CreateInvoice = {
    saleDate: (new Date()).toISOString(),
    customer: ""
}

export const InvoiceCreate: React.FC<Props> = () => {
    const { getSpace } = use3Box()
    // const { getWeb3, getAddress } = useWeb3()
    const { handleSubmit, control, formState, errors } = useForm<CreateInvoice>({
        defaultValues
    })
    const [customers, setCustomers] = useState<Customer[]>(
        [
            /* {
                name: "Testcompany LTD",
                email: "test@test.com2",
                orgNumber: 124124,
                address1: "Test road 1",
                postcode: 15500,
                city: "Oslo",
                id: "zdpuArsiMimTL34ebWuX2nFcmYmWnx6rqB44PUG7ZSbukRRov"
            },
            {
                name: "Tes3",
                email: "test@test.com2",
                orgNumber: 124124,
                address1: "Test road 1",
                postcode: 15500,
                city: "Oslo",
                id: "413241241fafasffafad"
            } */
        ]
    );

    const onSubmit = async (data: CreateInvoice) => {
        console.log("Running submit", data);

        const space = await getSpace()
        const thread = await space.joinThread('invoiceList', {
            // firstModerator: address,
            members: true
        })
        const postId = await thread.post()
        const postData = await space.private.set(postId, { ...data, id: postId })
        console.log("invoice id ", postId);
        console.log("invoice data", postData);
    }

    useEffect(() => {
        console.log("Get customers");

        getSpace().then(async space => {
            const thread = await space.joinThread('customerList', {
                // firstModerator: address,
                members: true
            })
            const posts = await thread.getPosts()
            const promises = posts.map(({ postId, message }: { postId: string, message: string }) => {
                return space.private.get(postId)
            })
            const customers = (await Promise.all(promises)).filter((maybeCustomer: any) => {
                return maybeCustomer && maybeCustomer.name && maybeCustomer.id && typeof maybeCustomer.id === "string" && typeof (maybeCustomer.name) === "string"
            }) as Customer[]
            console.log("customers", customers);

            setCustomers(customers)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box gap="small">
                    <Text size="large">Create invoice</Text>


                    <Box border="top"></Box>
                    <Box gap="medium">
                        <Grid columns={['xsmall', 'flex']} gap="small" >
                            <Text alignSelf="center">Customer</Text>
                            <Controller
                                as={<Select
                                    options={customers}
                                    value=""
                                    labelKey={(customer: Customer) => customer.name}
                                    placeholder={customers.length === 0 ? "Getting customer list..." : "Choose customer"}
                                    disabled={customers.length === 0}
                                    focusIndicator={false}
                                    multiple={false}
                                />}
                                onChange={([selected]) => selected.option.id}
                                defaultValue=""
                                name="customer"
                                control={control}
                                valueKey="id"
                                rules={{ required: true }}
                            />
                        </Grid>
                        {errors.customer && <Text size="small">*</Text>}

                        <Grid columns={['xsmall', 'xsmall']} gap="small" >
                            <Text alignSelf="center">Sale date</Text>
                            <Controller
                                as={
                                    <Calendar
                                        size="small"
                                        date={(new Date()).toISOString()}
                                        firstDayOfWeek={1}
                                    />
                                }
                                onChangeName={"onSelect"}
                                name="saleDate"
                                control={control}
                                rules={{ required: true }}
                            />
                        </Grid>
                        {errors.saleDate && <Text size="small">*</Text>}
                    </Box>



                    <Button
                        icon={<Save />}
                        label="Create invoice"
                        type="submit"
                        disabled={formState.isSubmitting || Object.keys(formState.touched).length === 0}
                        color="status-ok"
                        hoverIndicator
                    />
                </Box>
            </form>
        </>
    )

}