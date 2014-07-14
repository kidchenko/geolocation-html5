// Define a closure to encapsulate our javascript code, this is a good pratice
(function (window) {
	'use strict'

	/**
	This is a class in JavaScript that represent our database
	@see http://www.phpied.com/3-ways-to-define-a-javascript-class/
	*/
	function DataBase() {
		this._STORAGE_ID = "netcoders-friends";

		//init a database - localStorage, if not exists
		if (!localStorage[this._STORAGE_ID]) {
			var init = {
				friends: []
			};
			localStorage[this._STORAGE_ID] = JSON.stringify(init);
		}
	}

	/**
	This is a javascript method to list all friends
	*/
	DataBase.prototype.findAll = function (callback) {
		// check if callback exists, if no exists create a empty function
		callback = callback || function () {};
		var data = JSON.parse(localStorage[this._STORAGE_ID]);
		callback.call(this, data.friends);
	}

	DataBase.prototype.add = function (friend, callback) {
		callback = callback || function () {};
		// get all friends in database and convert to JSON
		var data = JSON.parse(localStorage[this._STORAGE_ID]);
		// add friend in array
		data.friends.push(friend);
		// save all friends in database
		localStorage[this._STORAGE_ID] = JSON.stringify(data);
		callback.call(this);
	};


	// create app variable in window
	window.app = window.app || {};
	window.app.DataBase = DataBase;

})(window);