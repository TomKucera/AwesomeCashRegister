import { ISelectItem, IVdfLocation } from "./types";

export const locationToSelectItem = (location: IVdfLocation): ISelectItem => {
    return {
        title: location.address,
        value: location.id,
    };
};