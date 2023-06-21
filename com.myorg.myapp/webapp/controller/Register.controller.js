sap.ui.define(["./BaseController","sap/m/MessageBox"], function (BaseController,MessageBox) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Register", {
      onSubmit : function () {

      const select=this.getView().byId("select0").getSelectedItem();
      const username = this.getView().byId("input6").getValue();
      const password = this.getView().byId("input5").getValue();

      const role= select.getText();

      console.log(username, password,role);
      
      //var oInput = sap.ui.getCore().getElementById('input6'); 
      //oInput.setValue("");

      //username.setValue("");
      //password.setValue("");


// Regular expression to validate the username and password
var usernameRegex = /^[a-zA-Z]{3,15}$/;
var passwordRegex = /^.{8,}$/;

//var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// Check if the username matches the regex pattern
if (usernameRegex.test(username) && passwordRegex.test(password)) {
  var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Homepage");
  
} else {
  
  MessageBox.show("Username or Password  is invalid");
}



  //     fetch("https://server-mediating-quoll-ut.cfapps.us10-001.hana.ondemand.com/addData",{
  //     method:"POST",
  //     headers:{"content-type":"application/json"},
  //     body:JSON.stringify({role,username,password}),

  // }).then((res)=>res.json())
  // .then(data=>{
  //     console.log(data);
  // });

    }

	});
});
