/**
 * utils.js
 */
var CONSTANTS = require('./constants.json'),
	t_Arr = 'Array',
	t_Str = 'String',
	t_Fn = 'Function',
	t_Numb = 'Number',
	hasOwnProperty = Object.prototype.hasOwnProperty,
	_loggingChecked = false,
	UNDEFINED = CONSTANTS.OBJECT_TYPE.UNDEFINED;

// Handle addEventListener gracefully in older browsers
exports.addEventHandler = function(element, event, func) {
	if (element.addEventListener) {
		element.addEventListener(event, func, true);
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, func);
	}
};
/**
 * Return if the object is of the
 * given type.
 * @param {*} object to test
 * @param {String} _t type string (e.g., Array)
 * @return {Boolean} if object is of type _t
 */
exports.isA = function(object, _t) {
	return Object.prototype.toString.call(object) === '[object ' + _t + ']';
};

exports.isFn = function(object) {
	return this.isA(object, t_Fn);
};

exports.isStr = function(object) {
	return this.isA(object, t_Str);
};

exports.isArray = function(object) {
	return this.isA(object, t_Arr);
};

exports.isNumber = function(object){
	return this.isA(object, t_Numb);
};

/**
 * Return if the object is "empty";
 * this includes falsey, no keys, or no items at indices
 * @param {*} object object to test
 * @return {Boolean} if object is empty
 */
exports.isEmpty = function(object) {
	if (!object) {
		return true;
	}

	if (this.isArray(object) || this.isStr(object)){
		return !(object.length > 0);
	}
	for (var k in object) {
		if (hasOwnProperty.call(object, k)) return false;
	}
	return true;
};

exports.loadScript = function(currentWindow, tagSrc, callback) {
	//create a script tag for the jpt call
	var doc = currentWindow.document;
	var scriptTag = doc.createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;

	// Execute a callback if necessary
	if (callback && typeof callback === 'function') {
		if (scriptTag.readyState) {
			scriptTag.onreadystatechange = function() {
				if (scriptTag.readyState === 'loaded' || scriptTag.readyState === 'complete') {
					scriptTag.onreadystatechange = null;
					callback();
				}
			};
		} else {
			scriptTag.onload = function() {
				callback();
			};
		}
	}

	scriptTag.src = tagSrc;

	//add the new script tag to the page
	var elToAppend = doc.getElementsByTagName('head');
	elToAppend = elToAppend.length ? elToAppend : doc.getElementsByTagName('body');
	if (elToAppend.length) {
		elToAppend = elToAppend[0];
		elToAppend.insertBefore(scriptTag, elToAppend.firstChild);
	}

	return scriptTag;
};
//get random id
exports.getUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * Iterate object with the function
 * falls back to es5 `forEach`
 * @param {Array|Object} object
 * @param {Function(value, key, object)} fn
 */
exports._each = function(object, fn) {
	if (this.isEmpty(object)) {return;}
	if (this.isFn(object.forEach)) {
		return object.forEach(fn);
	}

	var k = 0,
		l = object.length;

	if (l > 0) {
		for (; k < l; k++) {
			fn(object[k], k, object);
		}
	} else {
		for (k in object) {
			if (hasOwnProperty.call(object, k)) {
				fn(object[k], k, object);
			}
		}
	}
};

exports.contains = function(a, obj) {
	if(this.isEmpty(a)){
		return false;
	}
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
};

var hasConsoleLogger = function () {
    return (window.console && window.console.log);
};

exports.stringContains = function(orginalStr, matchStr) {
	return orginalStr.indexOf(matchStr) != -1;
};


exports.getParameterByName = function(name) {
	var regexS = '[\\?&]' + name + '=([^&#]*)',
		regex = new RegExp(regexS),
		results = regex.exec(window.location.search);
	if (results === null) {
		return '';
	}
	return decodeURIComponent(results[1].replace(/\+/g, ' '));
};

exports.hasOwn = function(objectToCheck, propertyToCheckFor) {
    if (objectToCheck.hasOwnProperty) {
        return objectToCheck.hasOwnProperty(propertyToCheckFor);
    } else {
        return (typeof objectToCheck[propertyToCheckFor] !== UNDEFINED) && (objectToCheck.constructor.prototype[propertyToCheckFor] !== objectToCheck[propertyToCheckFor]);
    }
};

var getConsoleDate = function(){
	var date = new Date(),
	msg = '[' + date.getHours() + ':' + date.getMinutes() + ':'+ date.getSeconds() + ':' + date.getMilliseconds() + '] ';
	return msg;
};

/**
 * return string srray with targetId
 * @param {array|string} ['targetId','targetId'] | 'targetId' optional
 */
exports.getTargetArrayforRefresh = function(targetObj){
    var arr =[];

    if(this.isArray(targetObj)){
        arr = targetObj;
    }else if(this.isStr(targetObj)){
        arr.push(targetObj);
    }

    return arr;
};

/**
 * Map an array or object into another array
 * given a function
 * @param {Array|Object} object
 * @param {Function(value, key, object)} callback
 * @return {Array}
 */
exports._map = function (object, callback) {
  if (this.isEmpty(object)) return [];
  if (this.isFn(object.map)) return object.map(callback);
  var output = [];
  this._each(object, function (value, key) {
    output.push(callback(value, key, object));
  });
  return output;
};
