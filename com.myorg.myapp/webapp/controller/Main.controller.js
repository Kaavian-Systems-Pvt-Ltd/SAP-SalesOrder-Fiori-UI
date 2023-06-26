sap.ui.define(["./BaseController"], function (BaseController) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		pageNavigate: function(){
            this.getOwnerComponent().getRouter().navTo("login");
        },
		pageMove: function () {
			this.getOwnerComponent().getRouter().navTo("userRegisterPage");
		},
		home: function(){
			this.getOwnerComponent().getRouter().navTo("home")
		}
	});
});
