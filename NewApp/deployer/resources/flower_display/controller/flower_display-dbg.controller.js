sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("flower_display.controller.flower_display", {
        onInit: function () {
			console.log("controller init");			
		}
     });
});