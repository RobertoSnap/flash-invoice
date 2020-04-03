import React, { useContext, useEffect } from 'react';
import { Box, Button, Text, TextInput, Grid } from "grommet"
import { useForm } from "react-hook-form";
import { Save } from "grommet-icons";
import { SpaceContext } from '../../App';

interface Props { }

export const CustomerCreate: React.FC<Props> = () => {
    const [space, , , address] = useContext(SpaceContext)
    const { register, handleSubmit, errors, formState, setValue } = useForm()


    const onSubmit = async (data: any) => {
        console.log("data", data);
        const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(address, randomId);

        const thread = await space.joinThread('customerList', {
            firstModerator: address,
            members: true
        })
        console.log(thread);
    }

    const setTestValues = () => {
        setValue("name", "Testcompany LTD")
        setValue("email", "test@test.com")
        setValue("orgNumber", 999555444)
        setValue("address1", "Test road 1")
        setValue("postcode", 1551)
        setValue("city", "Oslo")
    }

    useEffect(() => {
        console.log("errors =>", errors);
    }, [errors])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box gap="small">
                    <Text size="large">Create customer</Text>

                    <Box border="top"></Box>
                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small" >
                            <Text alignSelf="center">Name</Text>
                            <TextInput
                                ref={register({
                                    required: true,
                                })}
                                name="name"
                            />
                        </Grid>
                        {errors.name && <Text size="small" color="status-error">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small">
                            <Text alignSelf="center">Email</Text>
                            <TextInput
                                ref={register({
                                    required: true,
                                })}
                                name="email"
                            />
                        </Grid>
                        {errors.email && <Text size="small" color="status-error">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small" >
                            <Text alignSelf="center">Org. number</Text>
                            <TextInput
                                ref={register({
                                    required: true,
                                })}
                                name="orgNumber"
                            />
                        </Grid>
                        {errors.orgNumber && <Text size="small" color="status-error">*</Text>}
                    </Box>



                    <Box>
                        <Grid columns={['xsmall', 'flex']} gap="small">
                            <Text alignSelf="center">Address1</Text>
                            <TextInput
                                ref={register({
                                    required: true,
                                })}
                                name="address1"
                            />
                        </Grid>
                        {errors.address1 && <Text size="small" color="status-error">*</Text>}
                    </Box>

                    <Box>
                        <Grid columns={['xsmall', 'xsmall', "flex"]} gap="small">
                            <Text alignSelf="center">Postcode</Text>
                            <TextInput
                                ref={register({
                                    max: 4,
                                    min: 4
                                })}
                                name="postcode"
                            />
                            <TextInput
                                ref={register({

                                })}

                                name="city"
                            />
                        </Grid>
                        {errors.postcode && <Text size="small" color="status-error">*</Text>}
                    </Box>

                    <Button
                        icon={<Save />}
                        label="Create"
                        type="submit"
                        disabled={formState.isSubmitting || Object.keys(formState.touched).length === 0}
                        color="status-ok"
                        hoverIndicator
                    />
                </Box>
            </form>
            {process.env.NODE_ENV === "development" &&
                <Button label="Set test values" onClick={() => setTestValues()} size="small" margin="medium"></Button>
            }
        </>
    )

}