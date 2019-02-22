sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("flower_display.controller.Detail", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {

			this.getView().bindElement({
				path: decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "flowers"
			});

			var flid = this.getView().byId("flidd").getText();
			var filters = new Array();
			var filterByName = new sap.ui.model.Filter("flid", sap.ui.model.FilterOperator.Contains, flid)
			filters.push(filterByName);
			
			var oModel = this.getView().getModel("shops");

			var oTable = this.byId("shopList");

			oModel.read("/Shops", {
				filters: filters,
				success: function (oData) {
				
					if(oData.results.length != 0)
					var oTemplate = new sap.m.ColumnListItem({
						cells: [new sap.m.Text({
							text: "{shid}"
						}), new sap.m.Text({
							text: "{name}"
						})]
					});

					oTable.setModel(oModel);
					oTable.bindAggregation("items", {
						path: "/Shops",
						template: oTemplate
					});
				}
			});
		},
		onNavBack: function () {
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
			// var oTable = this.getView().byId("shopsList");

			// var oSelectedItem = oTable.getSelectedItem();

			var name = this.getView().byId("namee").getValue();

			var oModel = this.getView().getModel("flowers");

			if (!name) {
				MessageToast.show("Fill field");
			} else {
				var flid = this.getView().byId("flidd").getText();

				var Flower = {};
				Flower.name = name;

				oModel.update("/Flowers('" + flid + "')", Flower, {
					merge: false,
					success: function () {
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
				this.onCloseDialog();
			}
		},
		deleteFlower: function () {

		}
	});
});