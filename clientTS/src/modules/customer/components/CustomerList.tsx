import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormControl } from '@material-ui/core';

import { ICustomer } from './../../../model/types';
import Selector from './../../../components/selector';
import ISelectItem from './../../../model/common/ISelectItem';

import { customerToSelectItem } from 'src/model/common/convert';

const CenterContent = styled.div`
    text-align: center;
    background-color: green;
    margin: auto;
    width: 50%;
`;

const styles = {
    formControl: {
        width: 300,
        //border: '2px solid grey',
    },
};

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
            if (load) {
                loadData();
                setLoad(false);
            }
        }, [load, loadData]);

        const renderCustomers = (): JSX.Element | null => {
            if (!customers) {
                return null;
            }

            const items = getSelectorItems();
            console.log('customers', customers);
            console.log('items', items);

            return (
                <table>
                    <tbody>
                        {customers.map((c) =>
                            <tr key={c.id.toString()}>
                                <td>{c.id}</td>
                                <td><Link to={`/customers/${c.id}`}>{c.name}</Link></td>
                                <td>{c.created}</td>
                                <td>{c.updated}</td>
                            </tr>)}
                    </tbody>
                </table>
            );
        };

        const renderLoading = (): JSX.Element | null => {
            if (!loading) {
                return null;
            }
            return (<h1>. . . loading . . .</h1>);
        };

        const getSelectorItems = (): Array<ISelectItem> => {
            if (!customers) {
                return [];
            }
            return customers.map((c) => customerToSelectItem(c));
        };

        const onSelectorChange = (value?: number) => {
            console.log('selected', value);
            //alert(value || 0);
        };

        const renderSelector = (): JSX.Element | null => {
            /*if (!loading){
                return null;
            }
            */
            const items = getSelectorItems();
            console.log('customers', customers);
            console.log('items', items);
            return (
                <FormControl style={styles.formControl}>
                    <Selector items={getSelectorItems()} onChange={onSelectorChange} />
                </FormControl>
            );
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
                {renderSelector()}
            </CenterContent>
        );
    }

export default CustomerList;