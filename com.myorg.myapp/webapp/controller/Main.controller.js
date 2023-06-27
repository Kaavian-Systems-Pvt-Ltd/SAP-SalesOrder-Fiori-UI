sap.ui.define(["./BaseController"], function (BaseController) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		onInit: function(){
            this.getOwnerComponent().getRouter().navTo("login");
        },
	});
});
