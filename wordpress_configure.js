Template.configureLoginServiceDialogForWordPress.helpers({
	siteUrl: function() {
		return Meteor.absoluteUrl();
	}
});

Template.configureLoginServiceDialogForWordPress.fields = function() {
	return [
		{ property: 'clientId', label: 'Client ID' },
		{ property: 'secret', label: 'Client Secret' }
	];
};
