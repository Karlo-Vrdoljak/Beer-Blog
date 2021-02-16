import AuthContext from "context/AuthProvider";
import { useContext } from "react";

class ManufService {
	config = null;

	constructor(config) {
		this.config = config;
		this.config.API_URL += "/manufacturer/";
	}

	getBeerManufacturers = function () {
		return fetch(this.config.API_URL + "all")
			.then(response => response.json())
			.then(data => data);
	};
	getBeerManufacturerOne = function (id) {
		return fetch(this.config.API_URL + "one?" + new URLSearchParams({ pk: id }))
			.then(response => response.json())
			.then(data => data);
	};
	getBeerManufacturersDetailed = function () {
		return fetch(this.config.API_URL + "all/detailed")
			.then(response => response.json())
			.then(data => data);
	};
	getBeerManufacturerBeersDetailed = function (id) {
		return fetch(this.config.API_URL + "all/detailed?" + new URLSearchParams({ pk: id }))
			.then(response => response.json())
			.then(data => data);
	};
	getCountries = function () {
		return fetch(this.config.API_URL + "all/country")
			.then(response => response.json())
			.then(data => data);
	};
	insertManufacturer = function (data, auth) {
		return fetch(this.config.API_URL + "insert", {
			method: "POST",
			headers: { "Content-type": "application/json", Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
	};
	deleteManufacturer = function (id, auth) {
		return fetch(this.config.API_URL + "delete", {
			method: "DELETE",
			headers: { "Content-type": "application/json", Authorization: auth },
			body: JSON.stringify({ pk: id }),
		})
			.then(response => response.json())
			.then(data => data);
	};
	updateManufacters = function (data, auth) {
		return fetch(this.config.API_URL + "update", {
			method: "PUT",
			headers: { "Content-type": "application/json", Authorization: auth },
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => data);
	}
}

export default ManufService;
