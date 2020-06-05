
import { IVdfLocation } from '../../../model/types';
//import { createDispatchHook } from 'react-redux';

export function loadLocations(address?: string) {
    return new Promise<IVdfLocation[]>(async (resolve) => {
        try {
            console.log('loadLocations');
            const url = 'http://localhost:9000/testAPI/vodafone/location';
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = { address };
            const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers });
            const locations: IVdfLocation[] = await response.json();
            resolve(locations);
        } catch (error) {
            console.log("loadLocations error", error);
        }
    });
};