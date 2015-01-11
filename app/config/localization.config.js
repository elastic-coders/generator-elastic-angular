(function () {
'use strict';

// ## Localization configuration
// see: https://github.com/doshprompt/angular-localization
angular.module('webApp.Config.Localization', [
  'ngCookies',
  'ngLocalize.Config',
  'ngLocalize.InstalledLanguages',
  'ngLocalize.Events'
])

.value('localeConf', {
	basePath: 'assets/strings',
	defaultLocale: 'en-US',
	sharedDictionary: 'common',
	fileExtension: '.lang.json',
	persistSelection: true,
	cookieName: 'webapp_locale',
	observableAttrs: new RegExp('^(?!ng-|i18n)'),
	delimiter: '::',
})
.value('localeSupported', [
	'en-US',
	'it-IT',
])
.value('localeFallbacks', {
	'en': 'en-US',
	'it': 'it-IT',
});

})();