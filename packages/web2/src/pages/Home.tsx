import React, { useEffect } from 'react';
import { Heading } from 'grommet';

interface Props { }

export const HomePage: React.FC<Props> = () => {

    useEffect(() => {
        document.title = "🖨 Flash Invoice 🖨 | Home"
    }, []);

    return (
        <Heading level={3}>Welcome to Flash Invoice</Heading>
    )
}