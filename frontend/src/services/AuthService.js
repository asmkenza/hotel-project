import fetch from 'auth/FetchInterceptor'
import { env } from 'configs/EnvironmentConfig'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: `${env.API_ENDPOINT_URL}admin/login`,
		method: 'post',
		data: data
	})
}

AuthService.register = function (data) {
	data.nom="asmani";
	data.prenom="kenza";
	data.numtel="0666666683";

	return fetch({
		url: `${env.API_ENDPOINT_URL}admin/register`,
		method: 'post',
		data: data
	})
}

AuthService.logout = function (data) {
	return fetch({
		url: `${env.API_ENDPOINT_URL}admin/logout`,
		method: 'post',
		data: data
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;