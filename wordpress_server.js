// See for docs https://github.com/WP-API/OAuth1/blob/master/docs/spec.md
WordPress = {};

// Self-hosted WP domain name, "/?json_route=" is appended automatically
var wp_api_endpoint = "https://wordpress.dev"; // @todo expose to Meteor user for simple config via accounts-entry

// WP OAuth1 service URLs, @todo pull from API authenticate object?
var urls = {
	requestToken: wp_api_endpoint + "/oauth1/request",
	authorize: wp_api_endpoint + "/oauth1/authorize",
	accessToken: wp_api_endpoint + "/oauth1/access",
	authenticate: wp_api_endpoint + "/?json_route=/"
};

// @todo add wp_scope field from WP API?

// Register the WP OAuth1 service
OAuth.registerService('wordpress', 1, urls, function(oauthBinding) {

	var identity = oauthBinding.get(urls.authenticate).data;

	var serviceData = {
		accessToken: OAuth.sealSecret(oauthBinding.accessToken),
		accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
	};

	return {
		serviceData: serviceData,
		options: {
			profile: {
				name: identity.name
			}
		}
	};
});

WordPress.retrieveCredential = function(credentialToken, credentialSecret) {
	return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
