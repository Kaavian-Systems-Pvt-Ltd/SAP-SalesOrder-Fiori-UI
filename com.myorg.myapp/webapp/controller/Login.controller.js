sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function(Controller, MessageBox) {
  "use strict";

  // A function to do regex Check for Login
  const LoginRegexCheck = (userName, password)=> {

    // User Name Regex Check
    const userNameCheck = ()=> {
      if(/^[a-zA-Z]+$/.test(userName)){
        return { 'Status' : true }
      }else{
        return { 'Status' : false }
      }
    }

    // Password Regex Check
    const passwordCheck = ()=> {
      if(/^(?=.*[A-Z])(?!.*\s).{8,16}$/.test(password)){
        return { 'Status' : true }
      }else{
        return { 'Status' : false }
      }
    }

    return { userNameCheck, passwordCheck }
}
  
  return Controller.extend("com.myorg.myapp.controller.Login", {

    // Login Button Handel
    handelLoginPress: function(){

      try{

        const userName = this.getView().byId("input5").getValue()
        const password = this.getView().byId("input6").getValue()

        const regexResult = LoginRegexCheck(userName, password);

        if( regexResult.userNameCheck().Status === true && regexResult.passwordCheck().Status === true  ){
          fetch(`https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/login`, {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'content-type': 'application/json' }
          })
          .then(res=> res.json())
          .then((data)=> {
            console.log(data, 'login fetch res');
            if(data.status === Success){
              this.getOwnerComponent().getRouter().navTo("home")
            }
          })
        }else if(regexResult.userNameCheck().Status === false && regexResult.passwordCheck().Status === false){

          MessageBox.alert("Both user Name and Password is not Valid")

        }else if(regexResult.userNameCheck().Status === true && regexResult.passwordCheck().Status === false){

          MessageBox.alert("Password is not Valid")

        }else if(regexResult.userNameCheck().Status === false && regexResult.passwordCheck().Status === true){

          MessageBox.alert("User Name is not Valid")

        }
      }catch(err){

        MessageBox.alert(err.message);

      }

    },

    // a function to make password visiable and hide
    handelPasswordIconPress: function(){
      const passwordType = this.getView().byId("input6");
      const btn = this.getView().byId("passwordIconId");

      if (passwordType.getType() === "Password" ) {
        passwordType.setType("Text");
        btn.setSrc("sap-icon://hide");
      }else{
        passwordType.setType("Password")
        btn.setSrc("sap-icon://show");
      }

    }

  });
});
