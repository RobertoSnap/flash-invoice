import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Text, TextInput } from "grommet"
import { useForm } from "react-hook-form";
import { Save } from "grommet-icons";
import { SpaceContext } from '../../App';

interface Props { }

export const AccountEdit: React.FC<Props> = () => {
    const [space, name, getSpace] = useContext(SpaceContext)
    const { register, handleSubmit, errors, setValue, formState } = useForm()

    // useEffect(() => {
    //     if (name) {
    //         // setValue("name", name)
    //     }
    // }, [name, setValue])

    const onSubmit = (data: { [field: string]: string }) => {
        console.log(data);
        const promises = Object.keys(data).map(field => space.public.set(field, data[field]))
        Promise.all(promises).finally(() => {
            getSpace()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box gap="small">
                <Text >Your organization</Text>
                <TextInput
                    ref={register({
                        required: true,
                    })}
                    name="name"
                    value={name}
                />
                {/* <input name="name" ref={register} /> */}
                {errors.name && <Text size="small">Name is required</Text>}

                <Button
                    icon={<Save />}
                    label="Update"
                    type="submit"
                    disabled={formState.isSubmitting || Object.keys(formState.touched).length === 0}
                    color="status-ok"
                    hoverIndicator
                />
            </Box>
        </form>
    )
}