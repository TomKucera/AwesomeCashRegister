import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ICustomer } from './../../../model/types';

const CenterContent = styled.div`
    text-align: center;
    background-color: green;
`;

interface iProps {
	//...WithTranslateProps,
	loading: boolean,
	customers: Array<ICustomer> | undefined,
	loadData: () => void,
}

export type IComponentProps = iProps;

export const CustomerList: React.FC<IComponentProps> = 
({
    loading,
    customers,
    loadData
}): JSX.Element => {
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        if( load ) {
            loadData();
            setLoad(false);
        }
    }, [load, loadData]);
   
    const renderCustomers = (): JSX.Element | null => {
        if (!customers){
            return null;
        }

        return (
            <tbody>
                {customers.map((c) =>
                <tr>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.created}</td>
                    <td>{c.updated}</td>
                </tr>)}
            </tbody>
        );
    };

    const renderLoading = (): JSX.Element | null => {
        if (!loading){
            return null;
        }
        return (<h1>. . . loading . . .</h1>);
    };

    return (
        <CenterContent>
            <Link
                to='/'
            >
                Home
            </Link>
            <h1>
                Customers
            </h1>
            {renderCustomers()}
            {renderLoading()}
        </CenterContent>
    );
}

export default CustomerList;