sap.ui.define(["./BaseController"], function (BaseController) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Register", {
		onInit: function () {
			
		},
        onSubmit : function () {
    
      //const role =this.getView().byId("select0").getValue();
     // const username =this.getView().byId("input0").getValue();
      //const password =this.getView().byId("input1").getValue();

      var srole = this.byId("select0");
      var role = srole.getSelectedKey();

      var username = this.byId("input0");
      var Name = username.getValue();
        
      var secret = this.byId("input1");
      var password = secret.getValue();
      
      console.log(role,Name,password);
      
      srole.setSelectedkey("");
      username.setValue("");
      secret.setValue("");
    }
	});
});
