sap.ui.define(["./BaseController"], function (BaseController) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.App", {
		onInit: function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
			onNavigateToCustomPage: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("registerPage");
			  },
			  _onBeforeRouteMatched: function (oEvent) {
				var sRouteName = oEvent.getParameter("name");
				if (sRouteName === "registerPage") {
				  this.getView().byId("registerPageContent").addContent(new sap.ui.view({
					viewName: "com.myorg.myapp.view.Register",
					type: sap.ui.core.mvc.ViewType.XML
				  }));
				}
			  }
				
			
		
	});
});
