//事件查找函数
var _indexOf = function(arr, key){
	if (arr === null) { return -1}
	var i = 0, len = arr.length;
	for(i; i<len; i++){
		if (arr[i] === key) { return i}
	}
	return -1
}

var Event = Class.extend({
	//添加监听
	on: function(key, listener){
		if (!this.__events) {
			this.__events = {}
		}
		if (!this.__events[key]) {
			this.__events[key] = []
		}

		if (_indexOf(this.__events, listener) === -1 && typeof listener === 'function') {
			this.__events[key].push(listener)
		}

		return this;
	},
	fire: function(key){
		var args = Array.prototype.slice.call(arguments, 1) || [];
		var listeners = this.__events[key]
		var i = 0, len = listeners.length;
		for(i; i < len; i++){
			listeners[i].apply(this, args)
		}

		return this;
	},
	off: function(key, listener){
		if (!key && !listener) {
			this.__events = {}
		}

		if (key && !listener) {
			delete this.__events[key]
		}

		if (key && listener) {
			let listeners = this.__events[key],
			index = _indexOf(listeners, listener)

			(index > 1) && listeners.splice(index, 1)
		return this;
		}
	}


})