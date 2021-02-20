class CurrencyService {
	config = null;

	constructor(config) {
        this.config = config;
        this.config.API_URL += "/currency/";
    }
    
	getAll = function() {
		return fetch(this.config.API_URL + 'all')
			.then(response => response.json())
			.then(data => data);
    }

}

export default CurrencyService;
