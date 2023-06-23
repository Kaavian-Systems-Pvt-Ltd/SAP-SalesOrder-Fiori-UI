sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function(Controller) {
    "use strict";
    
    return Controller.extend("com.myorg.myapp.controller.HomePage", {
      homepagebtnHandel: function(){
        this.getOwnerComponent().getRouter().navTo("createSales")
      }
    });
  });
  