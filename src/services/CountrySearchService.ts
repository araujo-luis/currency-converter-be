import axios from 'axios';
import Country from '../models/Country';
import { COUNTRIES_BASE_URL, EXHANGE_RATE_BASE_URL, EXCHANGE_API_KEY } from '../utils/variables';
import CurrecyExchange from '../models/CurrencyExchange';
import { ECANCELED } from 'constants';

const getCurrencies = (countries: Country[]) => {
    const currencies = countries.map((country) => country.currencies.map((currency) => currency.code));
    return currencies.flat();
}

const getExchangeRates = async (currencies: string[]) => {
    const exchangeRequest = `${EXHANGE_RATE_BASE_URL}/latest?access_key=${EXCHANGE_API_KEY}&symbols=${currencies.join(',')}`;
    console.log('exchange request', exchangeRequest);
    try {
        const exchange = await axios.get<CurrecyExchange>(exchangeRequest);
        return exchange.data;
    } catch (error) {
        return error;
    }
}

const mergeCurrencuExchange = (countries: Country[], exchangeRates: CurrecyExchange) => {

    var response = countries.map((country) => {
        const currencies = country.currencies.map((currency) => {
            return { ...currency, baseCurrencyRate: exchangeRates.rates[currency.code] };
        })
        return { ...country, currencies };
    })
    return response;

}
export const findCountriesByName = async (name: string) => {
    try {
        const countriesRequest = `${COUNTRIES_BASE_URL}/rest/v2/name/${name}?fields=name;population;currencies;flag`;
        console.log('request', countriesRequest);

        const { data: countriesData } = await axios.get<Country[]>(countriesRequest);

        const currencies = getCurrencies(countriesData);

        const exchange = await getExchangeRates(currencies);

        const response = mergeCurrencuExchange(countriesData, exchange);

        return response;

    } catch (error) {
        return error;
    }
}