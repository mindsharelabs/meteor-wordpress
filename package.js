Package.describe({
	name: 'mindshare:wordpress',
	summary: "WordPress OAuth flow",
	version: '0.0.1',
	git: 'https://github.com/mindsharestudios/meteor-wordpress.git',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.use("jquery");
	api.use('oauth', [ 'client', 'server' ]);
	api.use('http', [ 'server' ]);
	api.use('underscore', 'client');
	api.use('templating', 'client');
	api.use('random', 'client');
	api.use('service-configuration', [ 'client', 'server' ]);

	api.export('WordPress');
	api.addFiles([ 'wordpress_configure.html', 'wordpress_configure.js' ], 'client');
	api.addFiles('wordpress_server.js', 'server');
	api.addFiles('wordpress_client.js', 'client');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('mindshare:accounts-wordpress');
	api.addFiles('mindshare:wordpress-tests.js');
});
