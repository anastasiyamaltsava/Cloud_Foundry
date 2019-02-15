sap.ui.define([
	"sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.demo.db.controller.App", {
		productListFactory : function(sId, oContext) {
			var oUIControl;
			oUIControl = this.byId("flowerList").clone(sId);
			return oUIControl;
		}
    });
});