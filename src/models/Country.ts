import Currency from './Currency';

interface Country {
    name: string;
    population: number;
    flag?: string;
    currencies: Currency[];
}

export default Country;