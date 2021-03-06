var fieldTests = require('./commonFieldTestUtils.js');
var ModelTestConfig = require('../../../modelTestConfig/BooleanModelTestConfig');

module.exports = {
	before: function (browser) {
		fieldTests.before(browser);
		browser.adminUIInitialFormScreen.setDefaultModelTestConfig(ModelTestConfig);
		browser.adminUIItemScreen.setDefaultModelTestConfig(ModelTestConfig);
		browser.adminUIListScreen.setDefaultModelTestConfig(ModelTestConfig);
	},
	after: fieldTests.after,
	'Boolean field should show correctly in the initial modal': function (browser) {
		browser.adminUIApp.openList({section: 'fields', list: 'boolean'});

		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();

		browser.adminUIInitialFormScreen.assertFieldUIVisible([
			{ name: 'name', },
			{ name: 'fieldA', },
		]);
	},
	'restoring test state': function(browser) {
		browser.adminUIInitialFormScreen.cancel();
		browser.adminUIApp.waitForListScreen();
	},
	'Boolean field can be filled via the initial modal': function(browser) {
		browser.adminUIApp.openList({section: 'fields', list: 'boolean'});

		browser.adminUIListScreen.clickCreateItemButton();
		browser.adminUIApp.waitForInitialFormScreen();

		browser.adminUIInitialFormScreen.fillFieldInputs([
			{ name: 'name', input: { value: 'Boolean Field Test 1' }, },
			{ name: 'fieldA', input: { value: 'true' }, },
			{ name: 'fieldD', input: { value: 'Test' }, },
		]);

		browser.adminUIInitialFormScreen.assertFieldInputs([
			{ name: 'name', input: { value: 'Boolean Field Test 1' }, },
			{ name: 'fieldA', input: { value: 'true' }, },
			{ name: 'fieldD', input: { value: 'Test' }, },
		]);

		browser.adminUIInitialFormScreen.save();
		browser.adminUIApp.waitForItemScreen();
	},
	'Boolean field should show correctly in the edit form': function(browser) {
		browser.adminUIItemScreen.assertFieldUIVisible([
			{ name: 'name', },
			{ name: 'fieldA', },
			{ name: 'fieldB', },
		]);

		browser.adminUIItemScreen.assertFieldInputs([
			{ name: 'name', input: { value: 'Boolean Field Test 1' }, },
			{ name: 'fieldA', input: { value: 'true' }, },
			{ name: 'fieldD', input: { value: 'Test' }, },
		]);
	},
	'Boolean field should have its default value if hidden': function(browser) {
		browser.adminUIItemScreen.assertFieldUIVisible([
			{ name: 'fieldD', },
		]);
	},
	'Boolean field can be filled via the edit form': function(browser) {
		browser.adminUIItemScreen.fillFieldInputs([
			{ name: 'fieldB', input: {value: 'false'}, }
		]);

		browser.adminUIItemScreen.save();
		browser.adminUIApp.waitForItemScreen();

		browser.adminUIItemScreen.assertFlashMessage('Your changes have been saved successfully');

		browser.adminUIItemScreen.assertFieldInputs([
			{ name: 'name', input: { value: 'Boolean Field Test 1' }, },
			{ name: 'fieldA', input: { value: 'true' }, },
			{ name: 'fieldB', input: { value: 'false' }, },
		])
	},
};
