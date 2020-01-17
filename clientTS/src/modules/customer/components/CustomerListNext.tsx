import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import moment from 'moment'

import { ICustomer } from 'src/model/types';
import { withNamespaces, WithNamespaces } from 'react-i18next';

import { addCustomerRoute, editCustomerRoute } from 'src/modules/routes';

const formatDate = (date: any) => {
    return moment(date) //.locale(locale)
        .format('l')
}

interface iColumn {
    id: string,
    label: string,
    minWidth: number,
    align?: "inherit" | "left" | "center" | "right" | "justify" | undefined,
    format?: (value: any) => any,
}

const columns: Array<iColumn> = [
    { id: 'id', label: 'ID', minWidth: 25 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'login', label: 'Login', minWidth: 75 },
    {
        id: 'created',
        label: 'Created',
        minWidth: 75,
        align: 'right',
        format: (value: any) => formatDate(value),
    },
    {
        id: 'updated',
        label: 'Updated',
        minWidth: 75,
        align: 'right',
        format: (value: any) => formatDate(value),
    },
];

const useStyles = makeStyles({
    root: {
        marginTop: "20px"
    },
    container: {
        maxHeight: 440,
    },
    label: {
        fontSize: "xx-large",
    },
    div: {
        width: '60%',
        margin: "auto",
    },
    fab: {
        float: "right"
    }
});

interface iProps {
    loading: boolean,
    customers: Array<ICustomer> | undefined,
    loadData: () => void,
}

export type IComponentProps = iProps & RouteComponentProps;

const CustomerListNext: React.FC<IComponentProps> = (props: IComponentProps): JSX.Element => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [load, setLoad] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (load) {
            props.loadData();
            setLoad(false);
        }
    }, [load, props.loadData]);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event: any, id: number) => {
        const route = editCustomerRoute(id);
        props.history.push(route);
    };

    const handleAdd = () => {
        props.history.push(addCustomerRoute());
    };

    return (
        <div className={classes.div}>
            <label className={classes.label}>Customers</label>
            <Fab className={classes.fab} size="small" color="primary" aria-label="add" onClick={handleAdd}>
                <AddIcon />
            </Fab>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(props.customers || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(cust => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={cust.id} onClick={event => handleClick(event, cust.id)}>
                                        {columns.map(column => {
                                            const value = (cust as any)[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} >
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={(props.customers || []).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );

}

export default withRouter(CustomerListNext);