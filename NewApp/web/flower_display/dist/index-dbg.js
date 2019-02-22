sap.ui.require([
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/core/ComponentContainer"
], function (ResourceModel, ComponentContainer) {
	"use strict";
	sap.ui.getCore().attachInit(function () {
		new ComponentContainer({
			name: "flower_display",
			settings : {
				id : "flower_display"
			}
		}).placeAt("content");
		var oResourceModel = new ResourceModel({
			bundleName: "flower_display.i18n.i18n"
		});
		sap.ui.getCore().setModel(oResourceModel, "i18n");
	});
});