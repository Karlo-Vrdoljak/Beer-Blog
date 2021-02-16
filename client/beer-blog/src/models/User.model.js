import { makeAutoObservable } from "mobx";

class User {
	user = {
		username: "",
		password: "",
		auth: null,
	};
	constructor() {
		makeAutoObservable(this);
	}
	getUser() {
		return this.user;
	}
	isAdmin() {
		if (this.user.auth && this.user.auth.token) {
			return this.user.auth.data.isAdmin === 1 ? true : false;
		}
		return false;
	}
	setUser(user) {
		console.log(user);
		this.user = user;
		if (this.user.auth && this.user.auth.token) {
			this.user.auth.data = JSON.parse(atob(this.user.auth.token.split(".")[1])).data;
		}
	}
	getBearerToken() {
		if (this.user.auth && this.user.auth.token) {
			return "Bearer " + this.user.auth.token;
		}
		return "Bearer ";
	}
	isAuthenticated() {
		if (this.user.auth) {
			return this.user.auth.valid;
		}
		return false;
	}
	clearAuth() {
		this.user.auth = null;
	}
}
export default User;
