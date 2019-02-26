sap.ui.require([
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/core/ComponentContainer"
], function (ResourceModel, ComponentContainer) {
  "use strict";
  sap.ui.getCore().attachInit(function () {
    new sap.m.Shell({
      app: new sap.ui.core.ComponentContainer({
        height: "100%",
        name: "flower_display"
      })
    }).placeAt("content");
    var oResourceModel = new ResourceModel({
      bundleName: "flower_display.i18n.i18n"
    });
    sap.ui.getCore().setModel(oResourceModel, "i18n");
  });
});