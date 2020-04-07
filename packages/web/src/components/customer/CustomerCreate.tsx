import React from 'react';
import { Box, Button, Text, TextInput, Grid } from "grommet"
import { Save } from "grommet-icons";
import { use3Box } from '../../utils/use3Box';
import { useForm, Controller } from 'react-hook-form';

interface Props { }

const defaultValues = process.env.NODE_ENV === "development" ?
    {
        "name": "Comp LTD " + Math.random().toString().substr(2, 4),
        "email": "test@test.com",
        "orgNumber": 999555444,
        "address1": "Test road " + Math.random().toString().substr(2, 2),
        "postcode": 1551,
        "city": "Oslo",
    }
    :
    {
        "name": undefined,
        "email": undefined,
        "orgNumber": undefined,
        "address1": undefined,
        "postcode": undefined,
        "city": undefined,
    }

interface CreateCustomer {
    name?: string;
    email?: string;
    orgNumber?: number;
    address1?: string;
    postcode?: number;
    city?: string;
}

export const CustomerCreate: React.FC<Props> = () => {
    const { getSpace } = use3Box()
    const { handleSubmit, control, formState, errors } = useForm<CreateCustomer>({
        defaultValues
    })

    const onSubmit = async (data: CreateCustomer) => {
        const space = await getSpace()
        const thread = await space.joinThread('customerList', {
            // firstModerator: address,
            members: true
        })
        const postId = await thread.post()
        const postData = await space.private.set(postId, { ...data, id: postId })
        console.log("postId", postId);
        console.log("postData", postData);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box gap="small">
                    <Text size="large">Create customer</Text>

                    <Box border="top"></Box>
                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small" >
                            <Text alignSelf="center">Name</Text>
                            <Controller as={TextInput} name="name" control={control} rules={{ required: true }} />
                        </Grid>
                        {errors.name && <Text size="small">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small">
                            <Text alignSelf="center">Email</Text>
                            <Controller as={TextInput} name="email" control={control} rules={{ required: true }} />
                        </Grid>
                        {errors.email && <Text size="small">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small" >
                            <Text alignSelf="center">Org. number</Text>
                            <Controller as={TextInput} name="orgNumber" control={control} rules={{ required: true }} />
                        </Grid>
                        {errors.orgNumber && <Text size="small">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small">
                            <Text alignSelf="center">Address1</Text>
                            <Controller as={TextInput} name="address1" control={control} rules={{ required: true }} />
                        </Grid>
                        {errors.address1 && <Text size="small">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'xsmall', "flex"]} gap="small">
                            <Text alignSelf="center">Postcode</Text>
                            <Controller as={TextInput} name="postcode" control={control} rules={{ required: true }} type={"number"} />
                            <Controller as={TextInput} name="city" control={control} rules={{ required: true }} />
                        </Grid>
                        {errors.postcode && <Text size="small">*</Text>}
                        {errors.city && <Text size="small">*</Text>}
                    </Box>

                    <Button
                        icon={<Save />}
                        label="Create customer"
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