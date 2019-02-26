sap.ui.define([
  "flower_display/controller/flower_display.controller",
  "sap/ui/core/routing/History",
  "sap/m/MessageToast"
], function (Controller, History, MessageToast) {
  "use strict";

  return Controller.extend("flower_display.controller.Detail", {
    onInit: function () {

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },
    showShops: function () {
      var data = this.getView().getModel("data");
      var filters = new Array();
      var filterByName = new sap.ui.model.Filter("flid", sap.ui.model.FilterOperator.Contains, data.flowerID)
      filters.push(filterByName);

      var oModel = this.getView().getModel("shops");

      var oTable = this.byId("shopList");

      oModel.read("/Shops", {
        filters: filters,
        success: function (oData) {
          var oTableJSON = new sap.ui.model.json.JSONModel();
          var Data = {
            Table: oData.results,
          };
          oTableJSON.setData(Data);
          oTable.setModel(oTableJSON, "Data");
        }
      });
    },
    _onObjectMatched: function (oEvent) {

      this.getView().bindElement({
        path: decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
        model: "flowers"
      });

      this.showShops();
    },
    onNavBack: function () {
      var data = this.getView().getModel("data");
      var name = this.getView().byId("flowerName");

      if (!name.getValue() || name.getValue() !== data.flowerName) {
        name.setValue(data.flowerName);
      }

      var oHistory, sPreviousHash;

      oHistory = History.getInstance();
      sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouter().navTo("home", {}, true);
      }
    },
    updateFlower: function () {

      var name = this.getView().byId("flowerName");
      var data = this.getView().getModel("data");
      var oModel = this.getView().getModel("flowers");

      if (!name.getValue()) {
        MessageToast.show("Field can't be empty");
        name.setValue(data.flowerName);
      } else {

        var Flower = {};
        Flower.name = name.getValue();
        Flower.ts_update = null;
        Flower.ts_create = null;

        oModel.update("/Flowers('" + data.flowerID + "')", Flower, {
          merge: false,
          success: function () {
            jQuery.sap.log.info("Sucsess");
            MessageToast.show("Updated");
            data.flowerName = name.getValue();
          },
          error: function () {
            jQuery.sap.log.error("Error");
          }
        });
      }
    },
    deleteFlower: function () {
      var oModel = this.getView().getModel("shops");
      var oTable = this.getView().byId("shopList");
      var oSelectedItem = oTable.getSelectedItem();

      if (!oSelectedItem) {
        MessageToast.show("Line is not selected!");
      } else {
        var id = oSelectedItem.mAggregations.cells[0].mProperties.text;

        jQuery.ajax({
          type: "DELETE",
          contentType: "application/json",
          url: "https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/shop/shop.xsjs?id=" + id,
          dataType: "json",
          success: function () {
            jQuery.sap.log.info("Sucsess");
            MessageToast.show("Deleted");

          },
          error: function () {
            jQuery.sap.log.error("Error");
          }
        });
        this.showShops();
      }

    }
  });
});