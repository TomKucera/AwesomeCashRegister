import React, { ChangeEvent } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ISelectItem, IStringMap } from '../../model/types';

interface IProps {
    labelText?: string,
    load: (searchText?: string) => Promise<ISelectItem[]>, 
    allowCaching?: boolean,
    onChange?: (value?: ISelectItem) => void;
};

const Selector: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<ISelectItem[]>([]);
    const [searchText, setSearchText] = React.useState('');
    const [foundText, setFoundText] = React.useState('');
    const [cache, setCache] = React.useState<IStringMap<ISelectItem[]>>({});
    
    const loading = open && foundText !== searchText;

    const cacheAllowed = props.allowCaching || true;
    
    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {

            let found: ISelectItem[] | undefined = undefined;

            if (cacheAllowed && cache[searchText] != undefined) {
                found = cache[searchText];
            }

            if (!found) {
                found = searchText.length ? await props.load(searchText) : [];

                if(cacheAllowed){
                    const nextCache = {...cache};
                    nextCache[searchText] = found;
                    setCache(nextCache);
                }                
            }

            setFoundText(searchText);
            setOptions(found);
        })();

    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.target.value);
    };

    const onAutocompleteChange = (event: React.ChangeEvent<{}>, value: any, reason: any): void => {
        props.onChange && props.onChange(value);
    };

    const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
        return (
            <TextField
                {...params}
                label={props.labelText}
                value={searchText}
                onChange={onInputChange}
                variant="outlined"
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}
            />
        );
    };

    return (
        <Autocomplete
            //id="asynchronous-demo"
            //style={{ width: 300 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            getOptionSelected={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={renderInput}
            onChange={onAutocompleteChange}
        />
    );
};

export default Selector;