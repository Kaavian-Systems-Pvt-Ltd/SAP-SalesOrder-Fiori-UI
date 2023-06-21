sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		onInit: function(){
			this.getOwnerComponent().getRouter().navTo("login");
		},
		sayHello: function () {
			MessageBox.show("Hello World!");
		}
	});
});
