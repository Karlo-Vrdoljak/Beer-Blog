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
    update(data,auth) {
        return fetch(this.config.API_URL + "update", {
            method: "PUT",
            headers: {'Content-type': 'application/json', Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
    }
    insert(data,auth) {
        return fetch(this.config.API_URL + "insert", {
            method: "POST",
            headers: {'Content-type': 'application/json', Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
    }
    delete(id, auth) {
        return fetch(this.config.API_URL + "delete", {
			method: "DELETE",
			headers: { "Content-type": "application/json", Authorization: auth },
			body: JSON.stringify({ pk: id }),
		})
			.then(response => response.json())
			.then(data => data);
    }
}

export default BeerService;
