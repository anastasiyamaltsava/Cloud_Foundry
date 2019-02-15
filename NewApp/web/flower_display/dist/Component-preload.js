jQuery.sap.registerPreloadedModules({version:"2.0",name:"flower_display/Component-preload",modules:{"flower_display/Component.js":'sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device"],function(t,e){"use strict";return t.extend("flower_display.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments)}})});',"flower_display/controller/App.controller.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";return t.extend("sap.ui.demo.db.controller.App",{productListFactory:function(t,e){return this.byId("flowerList").clone(t)}})});',"flower_display/index.js":'sap.ui.require(["sap/ui/model/json/JSONModel","sap/ui/core/mvc/XMLView","sap/ui/model/resource/ResourceModel"],function(e,o,s){"use strict";sap.ui.getCore().attachInit(function(){var i=new e("https://p2001081516trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/flower/flower.xsjs");console.log(i),sap.ui.getCore().setModel(i,"flower");var a=new s({bundleName:"sap.ui.demo.db.i18n.i18n"});sap.ui.getCore().setModel(a,"i18n");new o({viewName:"sap.ui.demo.db.view.App"}).placeAt("content")})});',"flower_display/view/App.view.xml":'<mvc:View\r\n    controllerName="sap.ui.demo.db.controller.App"\r\n\txmlns="sap.m"\r\n    xmlns:l="sap.ui.layout"\r\n\txmlns:mvc="sap.ui.core.mvc"><Panel headerText="{i18n>header}" class="sapUiResponsiveMargin" width="auto"><content><Table\r\n                id="flowerList"\r\n                class="sapUiResponsiveMargin"\r\n                width="auto"\r\n                items="{path : \'flower>/value\'}"\r\n                ><columns><Column><Text text="{i18n>id}"/></Column><Column\r\n                                minScreenWidth="Small"\r\n                                demandPopin="true"><Text text="{i18n>name}"/></Column></columns><items><ColumnListItem><cells><Text text="{flower>flid}"/><Text text="{flower>name}"/></cells></ColumnListItem></items></Table></content></Panel></mvc:View>',"flower_display/i18n/i18n.properties":"header = Display flower\r\nid=id\r\nname=Name\r\ncreate=Create","flower_display/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"flower_display","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.ushell":{},"sap.collaboration":{},"sap.ui.comp":{},"sap.uxap":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"flower_display.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]}}}'}});