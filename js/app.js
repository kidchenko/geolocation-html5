// Jquery load
$(document).ready(function () {
	'use strict';

	var App = {
		load : function () {
			// create a instance of DataBase class
			this.dataBase = new window.app.DataBase();
			this.loadElements();
			this.addEvents();
			this.loadPlugins();
		},
		// get all elements by jquery
		loadElements : function() {
			this.$name = $('#name');
			this.$email = $('#email');
			this.$telephone = $('#telephone');
			this.$address = $('#address');
			this.$map = $('#map');
			this.$form = $('form');
			this.$friendsTab = $('nav ul li:eq(1)');
			this.$friendsTable = $('table');
		},
		// add all events
		addEvents : function() {
			// bind make the variable this equals this (app)
			// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
			this.$form.on('submit', this.addFriend.bind(this));
			this.$friendsTab.on('show.bs.tab', this.showAllFriends.bind(this));
		},
		loadPlugins: function () {
			var $map = this.$map;
			// create a map using geocomplete
			// see http://ubilabs.github.io/geocomplete/
			var map = this.$address.geocomplete({
				map: $map,
			});

			this.$telephone.mask('(99) 9999-9999');
			
			this.getCurrentPosition(function (position) {
				map.setLocation([position.coords.latitude, position.coords.longitude]);
			});
		},
		getCurrentPosition: function(callback) {
			if (Modernizr.geolocation) {
				var positionError = function (error) {
					console.log(error.message);
				}
				var options = { enableHighAccuracy : true} ;
				navigator.geolocation.getCurrentPosition(callback, positionError, options);
			}
		},
		addFriend: function(e) {
			e.preventDefault(); // cancel the default event
			// get fields values
			var name = this.$name.val().trim();
			var email = this.$email.val().trim();
			var telephone = this.$telephone.val().trim();
			var address = this.$address.val().trim();
			// create a friend object
			var friend = {
				name : name,
				email : email,
				telephone : telephone,
				address : address, 
			};
			// add
			this.dataBase.add(friend, this.showSucessMessage);
		},
		showAllFriends: function () {
			var $tbody = this.$friendsTable.find('tbody');
			// clean table
			$tbody.empty();
			// load all friends
			this.dataBase.findAll(function(friends) {
				$.each(friends, function (index, element) {
					// create a tr
					var tr = '<tr><td>{{name}}</td><td>{{email}}</td><td>{{telephone}}</td><td>{{address}}</td>';
					tr = tr.replace('{{name}}', element.name).replace('{{email}}', element.email).replace('{{telephone}}', element.telephone).replace('{{address}}', element.address);
					$tbody.append(tr);
				});
			});
		},
		showSucessMessage: function () {
			alert('Amigo adicionado com sucesso!');
		}
	};

	
	
	App.load();
});