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

			var name = this.getView().byId("namee").getValue();

			console.log(name);

			var oModel = this.getView().getModel("flowers");

			console.log(oModel);

			if (!name) {
				MessageToast.show("Fill field");
			} else {
				var flid = this.getView().byId("flidd").getText();

				console.log(flid);

				var Flower = {};
				Flower.name = name;
				Flower.ts_update = null;
				Flower.ts_create = null;

				console.log(Flower);

				oModel.update("/Flowers('" + flid + "')", Flower, {
					merge: false,
					success: function () {
						jQuery.sap.log.info("Sucsess");
						MessageToast.show("Updated"); 
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
		},
		deleteFlower: function () {
			var oTable = this.getView().byId("shopList");
			
			var oSelectedItem = oTable.getSelectedItem();			

			if (!oSelectedItem){
				MessageToast.show("Phone is not selected!");
			} else {
				var phid = oSelectedItem.getBindingContext("phones").getProperty("phid");

				jQuery.ajax({
					type : "DELETE",
					contentType : "application/json",
					url : "https://p2001081134trial-maksimzhytkevich-space1-service.cfapps.eu10.hana.ondemand.com/xsjs/phone/phone.xsjs?phoneid=" + phid,
					dataType : "json", 
					success: function(){
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}	
				});	
} 
		}
	});
});