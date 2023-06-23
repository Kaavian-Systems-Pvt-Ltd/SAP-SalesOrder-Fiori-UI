sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button"
  ], function(Controller, Dialog, Button) {
    "use strict";
    
    return Controller.extend("com.myorg.myapp.controller.Header", {
      logoutbtnHandle: function(){

        const that = this;

        const dialog = new Dialog({
          title: "Confirm",
          type: "Message",
          content: new Text({
            Text: "Are You Sure ?"
          }),
          beginButton: new Button({
            text: "OK",
            press: function() {
              dialog.close();
              that.getOwnerComponent().getRouter().navTo("login")
            }
          }),
          endButton: new Button({
            text: "Cancel",
            press: function() {
              dialog.close();
            }
          }),
          afterClose: function(){
            dialog.destroy();
          }
        });
        dialog.open()
      },

      handleTitle: function(){
        this.getOwnerComponent().getRouter().navTo("home")
      }
    });
  });
  