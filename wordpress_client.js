WordPress = {};

/**
 *
 * Request WordPress credentials for the user
 *
 * @param options {optional}
 * @param credentialRequestCompleteCallback {Function} Callback function to call on completion.
 * Takes one argument, credentialToken on success, or Error on error.
 *
 */
WordPress.requestCredential = function(options, credentialRequestCompleteCallback) {
	// support both (options, callback) and (callback).
	if (!credentialRequestCompleteCallback && typeof options === 'function') {
		credentialRequestCompleteCallback = options;
		options = {};
	}

	var config = ServiceConfiguration.configurations.findOne({ service: 'wordpress' });
	if (!config) {
		credentialRequestCompleteCallback && credentialRequestCompleteCallback(
			new ServiceConfiguration.ConfigError());
		return;
	}
	var credentialToken = Random.secret();

	var loginStyle = OAuth._loginStyle('wordpress', config, options);

	var loginUrl =
			'https://wordpress.dev/wp-json/oauth1/authorize' + // @todo change this
			'?client_id=' + config.clientId +
			'&scope=' + "read" + // @todo change this
			'&redirect_uri=' + OAuth._redirectUri('wordpress', config) +
			'&state=' + OAuth._stateParam(loginStyle, credentialToken);

	OAuth.launchLogin({
		loginService: "wordpress",
		loginStyle: loginStyle,
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: credentialToken,
		popupOptions: { width: 900, height: 450 }
	});
};
