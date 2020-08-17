# Currency Converter - Anyfin
NodeJs app which allows to look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to SEK. 

Requests should require a valid JWT obtained from a separate /login endpoint and should be rate limited to 30 requests per token per minute.

### Env variables
```
PORT=4000
COUNTRIES_BASE_URL=https://restcountries.eu
EXHANGE_RATE_BASE_URL=http://data.fixer.io/api
EXCHANGE_API_KEY=<Data fixer API KEY>
JWT_SECRET=<Random string to sign JWT Token>
MAX_REQUESTS=30
REQUESTS_TIME_LIMIT_IN_SECONDS=60
```
### Installing

```
$ npm install
```
### Starting

```
$ npm start
```

## Authors

* **Luis Araujo** - [luisaraujo.io](https://luisaraujo.io)

## License

This project is licensed under the MIT License.
