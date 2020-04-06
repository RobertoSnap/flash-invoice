import React, { useState } from 'react';
import { Box, Button, Text, TextInput } from "grommet"
import { Save } from "grommet-icons";
import { use3Box } from '../../utils/use3Box';

interface Props {
    name: string
}

export const AccountEdit: React.FC<Props> = ({ name }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { getSpace } = use3Box()
    const [newName] = useState(name);


    const onSubmit = async () => {
        setIsSubmitting(true)
        const space = await getSpace()
        await space.public.set("name", newName)
        setIsSubmitting(false)
    }

    return (

        <Box gap="small">
            <Text >Your organization</Text>
            <TextInput
                name="name"
                value={newName}
            />
            <Button
                icon={<Save />}
                label="Update"
                type="submit"
                disabled={isSubmitting}
                color="status-ok"
                hoverIndicator
                onClick={() => onSubmit()}
            />
        </Box>
    )
}