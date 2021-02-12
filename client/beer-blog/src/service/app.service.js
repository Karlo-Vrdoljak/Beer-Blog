import BeerService from "./beer.service";
import ManufService from "./manuf.service";

const { default: Config } = require("./config");

class AppService {
	constructor() {
		this.config = new Config();
		this.beerService = new BeerService(JSON.parse(JSON.stringify(this.config)));
		this.manufService = new ManufService(JSON.parse(JSON.stringify(this.config)));
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
}

export default AppService;
