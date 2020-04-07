import React, { useState, useEffect } from 'react';
import { Box, Button, Text, /* TextInput, */ Grid, Select, Calendar, Layer } from "grommet"
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
    saleDate: (new Date()).toISOString()
}
export const InvoiceCreate: React.FC<Props> = () => {
    const { getSpace } = use3Box()
    // const { getWeb3, getAddress } = useWeb3()
    const { handleSubmit, control, formState, errors, getValues } = useForm<CreateInvoice>({
        defaultValues
    })
    const [customers, setCustomers] = useState<Customer[]>([{
        name: "Testcompany LTD",
        email: "test@test.com2",
        orgNumber: 124124,
        address1: "Test road 1",
        postcode: 15500,
        city: "Oslo",
        id: "zdpuArsiMimTL34ebWuX2nFcmYmWnx6rqB44PUG7ZSbukRRov"
    }]);
    const [showSaleDateCalender, setShowSaleDateCalender] = useState(false);


    const onSubmit = async (data: CreateInvoice) => {
        console.log("data", data);

        const space = await getSpace()
        const thread = await space.joinThread('invoiceList', {
            // firstModerator: address,
            members: true
        })
        const postId = await thread.post()
        const postData = await space.private.set(postId, { ...data, id: postId })
        console.log("postId", postId);
        console.log("postData", postData);
    }

    useEffect(() => {
        console.log(getValues())
        console.log(errors)
    }, [formState, getValues, errors])

    useEffect(() => {
        console.log("run", getSpace);

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
                                as={
                                    <Select
                                        options={customers}
                                        labelKey={(customer: Customer) => customer.name}
                                        placeholder={customers.length === 0 ? "Getting customer list..." : "Choose customer"}
                                        disabled={customers.length === 0}
                                        valueKey={(customer: Customer) => customer.id}
                                    />
                                }

                                name="customer"
                                control={control}
                                rules={{ required: true }}
                            />
                        </Grid>

                        <Grid columns={['xsmall', 'xsmall']} gap="small" >
                            <Text alignSelf="center">Sale date</Text>
                            <Box>
                                <Button label="Pick" onClick={() => setShowSaleDateCalender(true)} size="small" />
                                {showSaleDateCalender && (
                                    <Layer
                                        onEsc={() => setShowSaleDateCalender(false)}
                                        onClickOutside={() => setShowSaleDateCalender(false)}
                                    >
                                        <Box margin="medium" gap="small">

                                            <Controller
                                                as={
                                                    <Calendar
                                                        size="small"
                                                        date={(new Date()).toISOString()}
                                                        firstDayOfWeek={1}
                                                    // onSelect={(option: any) => {
                                                    //     console.log("cal", option);
                                                    // }}
                                                    />
                                                }
                                                onChangeName={"onSelect"}
                                                name="saleDate"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            <Button label="close" type="button" onClick={() => setShowSaleDateCalender(false)} />
                                        </Box>
                                    </Layer>
                                )}
                            </Box>

                        </Grid>
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