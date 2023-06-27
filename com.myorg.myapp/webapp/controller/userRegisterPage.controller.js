sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
    "use strict";
  
    return BaseController.extend("com.myorg.myapp.controller.userRegisterPage", {
      
      onInit: function () {

      },
  
      iconPress: function () {
        const passwordType = this.getView().byId("input5");
        const btn = this.getView().byId("icon0");
  
        if (passwordType.getType() === "Password") {
          passwordType.setType("Text");
          btn.setSrc("sap-icon://hide");
        } else {
          passwordType.setType("Password")
          btn.setSrc("sap-icon://show");
        }
  
      },
      
      onSubmit: function () {
  
        const select = this.getView().byId("select0").getSelectedItem();
        const userName = this.getView().byId("input6").getValue();
        const userPassword = this.getView().byId("input5").getValue();
  
        const userRole = select.getText();
  
        // Regular expression to validate the username and password
        var usernameRegex = /^[a-zA-Z]{3,15}$/;
        var passwordRegex = /^.{8,}$/;
  
        // Check if the username matches the regex pattern
        if (usernameRegex.test(userName) && passwordRegex.test(userPassword)&& (userRole==="USER"||userRole==="MANAGER")){
          console.log(userName, userPassword, userRole);
  
          this.getView().byId("select0").setValue("Select a role");
          this.getView().byId("input6").setValue("");
          this.getView().byId("input5").setValue("");
          fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/register", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userName, userPassword, userRole }),
  
          }).then((res) => res.json())
            .then(data => {
              console.log(data);
              console.log(data.message);          
            MessageBox.show(data.message);
            });
            
          this.getOwnerComponent().getRouter().navTo("login");
  
        } else if(!usernameRegex.test(userName)) {
  
          MessageBox.alert("Username is invalid");

        }else if(!passwordRegex.test(userPassword)){

          MessageBox.alert("password must equal 8 or more characters");
        }else{

          MessageBox.alert("Please fill all fields");
        }
        
      }
    });
  });
  