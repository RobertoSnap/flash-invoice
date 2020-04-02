import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Text, TextInput } from "grommet"
import { useForm } from "react-hook-form";
import { Save } from "grommet-icons";
import { SpaceContext } from '../../App';

interface Props { }

export const AccountEdit: React.FC<Props> = () => {
    const [space, name] = useContext(SpaceContext)
    const { register, handleSubmit, errors, setValue } = useForm()
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (name) {
            console.log("setting name", name);

            setValue("name", name)
        }
    }, [name, setValue])

    const onSubmit = (data: { [field: string]: string }) => {
        setSubmitting(true)
        const promises = Object.keys(data).map(field => space.public.set(field, data[field]))
        Promise.all(promises).finally(() => {
            setSubmitting(false)
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
                />
                {errors.name && <Text size="small">Name is required</Text>}

                <Button
                    icon={<Save />}
                    label="Update"
                    type="submit"
                    disabled={submitting}
                    color="status-ok"
                    hoverIndicator
                />
            </Box>
        </form>
    )
}