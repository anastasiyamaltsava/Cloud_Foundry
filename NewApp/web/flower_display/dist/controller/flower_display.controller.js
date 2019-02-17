sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("flower_display.controller.flower_display", {
        onInit: function () {
			console.log("controller init");			
		},
		createFlower: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			console.log(Name);

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/NewApp.xsodata/Flowers",
				"method": "POST",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		},
		updateFlower: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			var Id = sap.ui.getCore().byId(this.getView().sId + "--input_id").getValue();
			console.log(Name);

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/NewApp.xsodata/Flowers('" + Id + "')",
				"method": "PUT",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}
     });
});