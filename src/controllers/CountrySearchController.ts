import { Request, Response } from 'express';
import { findCountriesByName } from '../services/CountrySearchService';

export const findByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
        const countries = await findCountriesByName(name);
        res.status(200).json(countries)
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'Server Error',
            error: error.message,
        });
    }
}
