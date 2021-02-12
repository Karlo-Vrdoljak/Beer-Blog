import BeerModel from "models/Beer.model";

class BeerService {
	config = null;

	constructor(config) {
        this.config = config;
        this.config.API_URL += "/beer/";
    }
    
	getBeers = function() {
		return fetch(this.config.API_URL + 'all')
			.then(response => response.json())
			.then(data => data.map(beer => new BeerModel(beer)));
    }
    getBeersDetailed = function() {
        return fetch(this.config.API_URL + 'all/detailed')
			.then(response => response.json())
			.then(data => data);
    }
    getSingleBeerDetailed = function(id) {
        return fetch(this.config.API_URL + 'one/detailed?' + new URLSearchParams({pk: id}))
			.then(response => response.json())
			.then(data => data);
    }
}

export default BeerService;
