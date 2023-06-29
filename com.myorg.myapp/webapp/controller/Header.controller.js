sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
  ], function(Controller, Dialog, Button, Text) {
    "use strict";
    
    return Controller.extend("com.myorg.myapp.controller.Header", {
      logoutbtnHandle: function(){

        const that = this;

        const dialog = new Dialog({
          title: "Confirm",
          type: "Message",
          content: new Text({
            text: "Are You Sure ?"
          }),
          beginButton: new Button({
            text: "OK",
            press: function() {
              dialog.close();
              window.localStorage.clear();
              window.caches.delete()
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
  