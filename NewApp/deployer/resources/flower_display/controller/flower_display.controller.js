sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/m/MessageToast"
], function(Controller, UIComponent, MessageToast) {
  "use strict";

  return Controller.extend("flower_display.controller.flower_display", {
    onInit: function() {
      jQuery.sap.log.debug("controller init");
    },
    getRouter: function() {
      return UIComponent.getRouterFor(this);
    },
    onItemSelected: function(oEvent) {
      var oSelectedItem = oEvent.getSource();
      var context = encodeURIComponent(oSelectedItem.getBindingContext('flowers').getPath());
      this.getRouter().navTo("detail", {
        invoicePath: context
      });

			var data = this.getView().getModel("data");

			data.flowerID = oEvent.getSource().mAggregations.cells[0].mProperties.text;
			data.flowerName = oEvent.getSource().mAggregations.cells[1].mProperties.text;

    },
    createFlower: function() {
      var data = this.getView().getModel("data");

      var name = data.oData.createName;

      var oModel = this.getView().getModel("flowers");

      if (!name) {
        MessageToast.show("Fill field");
      } else {

        var Flower = {};
        Flower.name = name;

        oModel.create("/Flowers", Flower, {
          success: function() {
            jQuery.sap.log.info("Sucsess");
            MessageToast.show("Created");
          },
          error: function() {
            jQuery.sap.log.error("Error");
          }
        });
      }
    }
  });
});
