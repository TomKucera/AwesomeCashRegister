import React from 'react';
import { Select, MenuItem, Input, InputLabel } from '@material-ui/core';

import { ISelectItem } from '../model/types';

/*
const CenterContent = styled.div`
    text-align: center;
    background-color: green;
    margin: auto;
    width: 50%;
`;
*/

interface iProps {
    //...WithTranslateProps,
    //items: Array<ISelectItem>,
    //onChange: () => {},

    items: Array<ISelectItem>,
    onChange: (value?: number) => void,

    //loadData: () => void,
    //loadCurrencies: () => void,
    autoFocus?: boolean,
    allowEmpty?: boolean,
    emptyText?: string,
    labelText?: string,
    disabled?: boolean,
    fullWidth?: boolean,
    inline?: boolean,
    labelOutside?: boolean,
    compact?: boolean,
    //value?: ?string | ?number | Array<any>,
    value?: number,
};

export type ISelectorProps = iProps;

export const Selector: React.FC<ISelectorProps> =
    ({
        items,
        value,
        onChange
        /*
        onChange= () => {},
        autoFocus = false,
        allowEmpty = false,
        emptyText = '',
        value = null,
        */
    }): JSX.Element => {

        const handleChange = (event: any) => {
            onChange(event.target.value);
        };
//onChange={handleChange}
        return (
            //<InputLabel htmlFor="grouped-select">Grouping</InputLabel>
            <Select value={value} autoWidth={true} onChange={handleChange} >
                {items.map((item) => <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>)}
            </Select>
        );
        /*
                return (
                    <select value={value} >
                        {items.map((item) => <option key={item.value} value={item.value} >{item.title}</option>)}
                    </select>
                );
                */
    };

export default Selector;