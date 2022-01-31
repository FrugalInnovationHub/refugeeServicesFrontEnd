const env = process.env;

export default {
	host: env.HOST || '0.0.0.0',
	port: env.PORT || 8081,
	get serverUrl() {
		return `http://${this.host}:${this.port}`;
	},
	api_gateway: env.REACT_APP_API_GATEWAY || 'http://0.0.0.0:8080',
    tawk_to_key: env.REACT_APP_TAWK_TO_KEY
}