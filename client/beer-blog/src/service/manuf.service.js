
class ManufService {
	config = null;

	constructor(config) {
        this.config = config;
        this.config.API_URL += "/manufacturer/";
    }
    
    getBeerManufacturers = function () {
        return fetch(this.config.API_URL + 'all')
        .then(response => response.json())
        .then(data => data);

    }
    getBeerManufacturersDetailed = function () {
        return fetch(this.config.API_URL + 'all/detailed')
        .then(response => response.json())
        .then(data => data);
    }
    getBeerManufacturerBeersDetailed = function(id) {
        return fetch(this.config.API_URL + 'all/detailed?' + new URLSearchParams({pk: id}))
        .then(response => response.json())
        .then(data => data);
    }
    
}

export default ManufService;
