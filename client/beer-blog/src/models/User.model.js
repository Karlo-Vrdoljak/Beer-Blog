import { makeAutoObservable } from "mobx";

class User {
    user = {
        username: '',
        password: '',
        auth: null
    }
    constructor() {
        makeAutoObservable(this);
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        console.log(user);
        this.user = user;
        if(this.user.auth && this.user.auth.token) {
            this.user.auth.data = JSON.parse(atob(this.user.auth.token.split('.')[1])).data
        }
    }
    isAuthenticated() {
        if(this.user.auth) {
            return this.user.auth.valid;
        }
        return false;
    }
    clearAuth() {
        this.user.auth = null;
    }
}
export default User;