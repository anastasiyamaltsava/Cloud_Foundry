sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";
	sap.ui.getCore().attachInit(function () {
		// var oModelJson = new JSONModel("https://services.odata.org/TripPinRESTierService/(S(pbifwq4mabylls1sbsykc25r))/People");
		// console.log(oModelJson);
		// sap.ui.getCore().setModel(oModelJson, "people");
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.demo.db.i18n.i18n"
		});
		sap.ui.getCore().setModel(oResourceModel, "i18n");
		var oView = new XMLView({
			viewName: "sap.ui.demo.db.view.App"
		}).placeAt("content");
	});
});