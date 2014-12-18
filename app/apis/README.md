# APIs Abstraction

An API abstraction should be a service exchanging data with a server and returning
promises. An API can also apply basic transformations on request and responses
to expose a cleaner interface to javascript code.

An `api` umbrella service can be defined to aggregate APIs inclusion and configuration.

## File

Assuming your API's name is `myApi` (in camelCase), your API file should be in
the `api` folder named:

`myApi/myApi.api.js`

With a unit testing spec:

`myApi/myApi.api.spec.js`

## Implementation

**Waiting for abstraction funciton to implement this**

Consider common angular code style guides for implementation best practices.

### Module name

Name the API angular module like so, assuming that `MyApi` is the name of your
API capitalized:

```
angular.module('myApp.Api.MyApi', []).provider('myApi', ...);
```

### Configuration

The API provider can define a `config` method accepting an object with API specific
configuration.

```
authApiProvider.config = function (obj) {
	angular.extend(config, obj)
};
```

Custom configuration checks may be executed at this stage.

### Service

An API service should have methods returning `$http` promises.

```
myApiProvider.$get = function ($http, $q) {
	var apiInstance = {
		myApiMethod: function(parameter) {
			return $http({ ... }).then(...);
		}
	};
	return apiInstance;
};
```

