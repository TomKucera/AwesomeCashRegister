import React, { useEffect, useState, ChangeEvent } from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import { ICustomer } from 'src/model/types';
import { showCustomersRoute } from 'src/modules/routes';

import confirm from "src/components/confirmDialog";

import i18n from "src/locales/i18n";    //move to wrapper

const useStyles = makeStyles({
    root: {
        marginTop: "20px"
    },

    label: {
        fontSize: "xx-large",
    },
    div: {
        width: '60%',
        margin: "auto",
    },
    button: {
        marginLeft: "10px",
        width: "100px"
    },
    divButtons: {
        marginTop: "10px",
        float: "right"
    },
    fab: {
        float: "right"
    }

});

interface iProps extends RouteComponentProps<any> {
    //...WithTranslateProps,
    loading: boolean,
    editing: boolean,
    customer: ICustomer,
    customerId?: number,
    loadCustomer: () => void,
    saveCustomer: (customer: ICustomer) => Promise<boolean>,
    deleteCustomer: (customerId: number) => Promise<boolean>,
}

export type IComponentProps = iProps & RouteComponentProps;

const CustomerEditNext: React.FC<IComponentProps> = (props: IComponentProps): JSX.Element => {
    const classes = useStyles();
    const [name, setName] = useState<string>('');
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        if (load) {
            if (props.customerId) {
                props.loadCustomer();
            }
            setLoad(false);
        }
    }, [load, props.loadCustomer]);

    useEffect(() => {
        if (name.length === 0) {
            console.log('useEffect cust [customer, name] ', props.customer, name);
            setName(props.customer.name);
        }
    }, [props.customer, name]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleSave = () => {
        if (name.length === 0) {
            alert('Invalid name');
            return;
        }
        if (name === props.customer.name) {
            alert('No change');
            return;
        }
        const customerToEdit: ICustomer = { ...props.customer, name };
        console.log('handleSave [customerToEdit] ', customerToEdit);
        props.saveCustomer(customerToEdit).then((success) => {
            console.log('handleSave [success] ', success);
            if (success) {
                props.history.push(showCustomersRoute());
            }
        });
    }

    const enableSave = (): boolean => {
        if (name.length === 0) {
            return false;
        }
        if (name === props.customer.name) {
            return false;
        }
        return true;
    }; 

    const handleDelete = () => {
        if (props.customerId == undefined) {
            alert('Invalid operation');
            return;
        }

        confirm(i18n.t("customer.confirmationDelete")).then(() => {
            console.log('proceed!') ;
            props.customerId &&
            props.deleteCustomer(props.customerId).then((success: boolean) => {
                console.log('handleDelete [success] ', success);
                if (success) {
                    props.history.push(showCustomersRoute());
                }
            });

          }, () => {
            console.log('cancel!');
          });
    }

    const handleCancel = () => {
        props.history.push(showCustomersRoute());
    }

    const renderLoading = (): JSX.Element | null => {
        if (!props.loading) {
            return null;
        }
        return (<h1>. . . loading . . .</h1>);
    };

    const renderEditing = (): JSX.Element | null => {
        if (!props.editing) {
            return null;
        }
        return (<h1>. . . editing . . .</h1>);
    };

    const label: string = props.customerId ? i18n.t("customer.labelEdt") : i18n.t("customer.labelNew");
    
    return (
        <div className={classes.div}>
            <label className={classes.label}>{label}</label>
            {props.customerId &&
                <Fab className={classes.fab} size="small" color="default" aria-label="add" onClick={handleDelete}>
                    <DeleteIcon />
                </Fab>
            }
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label={i18n.t("customer.name")} placeholder={i18n.t("customer.namePlaceholder")} variant="outlined" margin="normal" value={name} onChange={handleNameChange} fullWidth />
            </form>
            <div className={classes.divButtons}>
                <Button className={classes.button} variant="outlined" color="primary" onClick={handleSave} disabled={!enableSave()} >{i18n.t("action.save")}</Button>
                <Button className={classes.button} variant="outlined" onClick={handleCancel}>{i18n.t("action.cancel")}</Button>
            </div>
            {renderLoading()}
            {renderEditing()}
        </div>
    );
}

export default  withRouter(CustomerEditNext);
