import BeerService from "./beer.service";
import BeerTypeService from "./beerType.service";
import CurrencyService from "./currency.service";
import ManufService from "./manuf.service";

const { default: Config } = require("./config");

class AppService {
	constructor() {
		this.config = new Config();
		this.beerService = new BeerService(JSON.parse(JSON.stringify(this.config)));
		this.manufService = new ManufService(JSON.parse(JSON.stringify(this.config)));
		this.BeerTypeService = new BeerTypeService(JSON.parse(JSON.stringify(this.config)));
		this.currencyService = new CurrencyService(JSON.parse(JSON.stringify(this.config)));
	}

	login(user) {
		return fetch(this.config.API_URL + "/security/login", {
            method: "POST",
            headers: {'Content-type': 'application/json'},
			body: JSON.stringify(user),
		})
			.then(response => response.json())
			.then(data => data);
	}
	getUsers() {
		return fetch(this.config.API_URL + '/user/all')
			.then(response => response.json())
			.then(data => data);
	}
	getUserByUsername(uname) {
		return fetch(this.config.API_URL + '/user/one/username?' + new URLSearchParams({username: uname}))
			.then(response => response.json())
			.then(data => data);
	}
	registerBrewey(data, auth) {
		return fetch(this.config.API_URL + "/brewer/insert", {
            method: "POST",
            headers: {'Content-type': 'application/json', Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
	}
	updateUser(data,auth){
		return fetch(this.config.API_URL + "/user/update", {
            method: "PUT",
            headers: {'Content-type': 'application/json', Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
	}
	deleteUser(id, auth) {
		return fetch(this.config.API_URL + "/user/delete", {
			method: "DELETE",
			headers: { "Content-type": "application/json", Authorization: auth },
			body: JSON.stringify({ pk: id }),
		})
			.then(response => response.json())
			.then(data => data);
	}
	registerUser(data) {
		return fetch(this.config.API_URL + "/security/register", {
            method: "POST",
            headers: {'Content-type': 'application/json'},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
	}
}

export default AppService;
