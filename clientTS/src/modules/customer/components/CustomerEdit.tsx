import React, { useEffect, useState, ChangeEvent } from 'react';

import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { ICustomer } from './../../../model/types';

const CenterContent = styled.div`
    text-align: center;
    background-color: gainsboro;
    border: 2px solid grey;
    width: 30%;
    padding: 10px;
    margin: auto;
`;

interface iProps  extends RouteComponentProps<any> {
    //...WithTranslateProps,
    loading: boolean,
	editing: boolean,
    customer: ICustomer,
    loadCustomer: () => void,
    saveCustomer: (customer: ICustomer) => Promise<boolean>,
}

export type IComponentProps = iProps;

export const CustomerEdit: React.FC<IComponentProps> = 
({
    loading,
    editing,
    customer,
    loadCustomer,
    saveCustomer,
    history,
}): JSX.Element => {
    
    const [name, setName] = useState<string>('');
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        if( load ) {
            loadCustomer();
            setLoad(false);
        }
    }, [load, loadCustomer]);

    useEffect(() => {
        if (name.length === 0) {
            console.log('useEffect cust [customer, name] ', customer, name);
            setName(customer.name);
        }
    }, [customer, name]);
   
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };
    
    const handleSave = () => {
        if (name.length === 0) {
            alert('Invalid name');
            return;
        }
        if (name === customer.name) {
            alert('No change');
            return;
        }
        const customerToEdit: ICustomer = { ...customer, name };
        console.log('handleSave [customerToEdit] ', customerToEdit);
        saveCustomer(customerToEdit).then((success) => {
            if (success) {
                history.push('/customers');
            }
        });
	}

    const renderCustomer = (): JSX.Element | null => {

        console.log('renderCustomer [loading, editing, customer, name] ', loading, editing, customer, name);
        if (loading || editing) {
            return null;
        }
        return (
            <div>
                <label>Název</label>
                <input
                    type='text'
                    placeholder='název zákazníka'
                    value={name}
                    onChange={handleNameChange}
                />
                <button onClick={handleSave}>Save</button>
            </div>
        );
    };

    const renderLoading = (): JSX.Element | null => {
        if (!loading){
            return null;
        }
        return (<h1>. . . loading . . .</h1>);
    };

    const renderEditing = (): JSX.Element | null => {
        if (!editing){
            return null;
        }
        return (<h1>. . . editing . . .</h1>);
    };

    return (
        <CenterContent>
            <Link
                to='/customers'
            >
                zpět
            </Link>
            <h1>
                Edit customer
            </h1>
            {renderCustomer()}
            {renderLoading()}
            {renderEditing()}
        </CenterContent>
    );
}

export default withRouter(CustomerEdit);
