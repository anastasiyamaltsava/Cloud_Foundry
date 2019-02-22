sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
], function (Controller, UIComponent, MessageToast) {
	"use strict";

	return Controller.extend("flower_display.controller.flower_display", {
        onInit: function () {
			jQuery.sap.log.debug("controller init"); 
		},
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var context = encodeURIComponent(oSelectedItem.getBindingContext('flowers').getPath());
			console.log(context);
			this.getRouter().navTo("detail",  {invoicePath: context});
		},
		createFlower: function () {
			var name = this.getView().byId("input_name").getValue();			

			var oModel = this.getView().getModel("flowers");

			if (!name){
				MessageToast.show("Fill field");	
			} else {

				var Flower = {};
				Flower.name = name;

				oModel.create("/Flowers", Flower, {
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error : function () {
						jQuery.sap.log.error("Error");
					}
				});
			}	
		}
     });
});
