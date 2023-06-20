sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		pageMove: function () {
			let word="HelloWorld";
			var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Register",{value:word});
		}
	});
});
