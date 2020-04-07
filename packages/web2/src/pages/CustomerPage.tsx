import React, { useEffect } from 'react';
import { Heading } from 'grommet';
import { CustomerCreate } from '../components/customer/CustomerCreate';

interface Props { }

export const CustomerPage: React.FC<Props> = () => {

    useEffect(() => {
        document.title = "🤘 Flash Invoice 🤘 | Customers"
    }, []);


    return (
        <>
            <Heading level={3}>Customers</Heading>
            <CustomerCreate></CustomerCreate>
        </>
    )
}