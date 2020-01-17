import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OkIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { confirmable, ReactConfirmProps } from 'react-confirm';

import Dialog from '@material-ui/core/Dialog';


let classDivButtons: React.CSSProperties = {
    float: "right",
    margin: "20px"
};

let classes = {
    root: {
        marginTop: "20px"
    },

    divLabel: {
        fontSize: "xx-large",
        margin:"20px",
        width:"100%"
    },
    label: {
        fontSize: "xx-large",
        marginBottom:"20px",
        width:"100%"
    },
    div: {
        width: '600px',
        margin: "auto",
    },
    button: {
        marginLeft: "10px",
        width: "100px",
    },
    divButtons: classDivButtons,
    fab: {
        float: "right"
    }
};

const useStyles = makeStyles({});

interface iProps {
    show: boolean,
    proceed: () => void,
    dismiss: () => void,
    cancel: () => void,
    confirmation: any,
    okLabel: string,
    cancelLabel: string,
    title: string,
    body?: JSX.Element,
    //modal: boolean,
    //waitForConfirm?: boolean,
    confirmButtonTooltip?: string,
}

export type IComponentProps = iProps & ReactConfirmProps;

class confirmDialogComponent extends Component<IComponentProps> {

    handleCancel = () => {
        this.props.cancel();
    }

    classes = classes; //useStyles();

    render() {
        return (
            <Dialog
                title={this.props.title}
                open={this.props.show}
            >
                <div style={classes.div}>
                <div style={classes.divLabel}>
                    <label style={classes.label}>{this.props.title}</label>    
                    </div>                
                    {this.props.body}
                    <div style={classes.divButtons}>
                        <Button key="cancel" style={classes.button} variant="outlined" color="primary" onClick={this.props.proceed} size="small" startIcon={<OkIcon />}>
                            {this.props.okLabel}
                        </Button>
                        <Button key="confirm" style={classes.button} variant="outlined" color="default" onClick={this.handleCancel} size="small" startIcon={<CancelIcon />} >
                            {this.props.cancelLabel}
                        </Button>
                    </div>
                </div>
            </Dialog>
        )
    };
};

export default confirmable(confirmDialogComponent);