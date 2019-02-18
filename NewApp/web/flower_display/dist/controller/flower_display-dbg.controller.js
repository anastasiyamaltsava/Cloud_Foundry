sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("flower_display.controller.flower_display", {
        onInit: function () {
			console.log("controller init");
		},
		executeAjax: function(settings) {
			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		},
		createFlower: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			var list = sap.ui.getCore().byId(this.getView().sId + "--flowerList");

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/NewApp.xsodata/Flowers",
				"method": "POST",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}",
			};

			executeAjax(settings);

			list.getModel().updateBindings();
		},
		updateFlower: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			var Id = sap.ui.getCore().byId(this.getView().sId + "--input_id").getValue();

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/NewApp.xsodata/Flowers('" + Id + "')",
				"method": "PUT",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\", \"ts_update\": null,  \"ts_create\": null}"
			};

			executeAjax(settings);

			window.location.reload();
		}
     });
});
