import axios from 'axios';
import Country from '../models/Country';
import { COUNTRIES_BASE_URL } from '../utils/variables';

export const findCountriesByName = async (name: string) => {
    try {
        const request = `${COUNTRIES_BASE_URL}/rest/v2/name/${name}?fields=name;population;currencies;flag`;
        console.log('request', request);

        const { data: countriesData } = await axios.get<Country[]>(request);
        
        return countriesData;

    } catch (error) {
        return error;
    }
}