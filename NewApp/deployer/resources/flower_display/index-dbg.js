sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";
	sap.ui.getCore().attachInit(function () {
		var oModelJson = new JSONModel("https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/flower/flower.xsjs");
		console.log(oModelJson);
		sap.ui.getCore().setModel(oModelJson, "flower");
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui.demo.db.i18n.i18n"
		});
		sap.ui.getCore().setModel(oResourceModel, "i18n");
		var oView = new XMLView({
			viewName: "sap.ui.demo.db.view.App"
		}).placeAt("content");
	});
});