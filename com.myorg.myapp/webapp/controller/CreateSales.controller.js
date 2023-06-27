sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  ], function(Controller, MessageBox) {
    "use strict";

    // token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiVVNFUiIsImlhdCI6MTY4NzM0NzEwNH0.-1-RbsdtWzVHbY9oo8yrBtl2elVPKejpEhSFbkxZFwc";

    // function to check Regex
    const CreateSalesRegexCheck = (
      soldtToPartyNameInput, soldToPartyAddressLine1Input, soldToPartyAddressLine2Input, soldToPartyCityInput,
      soldToPartyStateInput, soldToPartyZipInput, shipToPartyNameInput, shipToPartyAddressLine1Input, shipToPartyAddressLine2Input,
      shipToPartyCityInput, shipToPartyStateInput, shiptoPartyzipInput, salesOrderNetAmountInput, CCNameInput, CCMonthInputInput,
      CCYearInput, CVVInput
      )=> {
        
      const RegexForSoldToPartyName = ()=> {
        if(/^[a-zA-Z.]+$/.test(soldtToPartyNameInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSoldToPartyAddressLine1Input = ()=> {
        if(/^(?!\s+$)\S.*\S$/.test(soldToPartyAddressLine1Input)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSoldToPartyAddressLine2Input = ()=> {
        if(/^(?!\s+$)\S.*\S$/.test(soldToPartyAddressLine2Input)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSoldToPartyCityInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(soldToPartyCityInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSoldToPartyStateInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(soldToPartyStateInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSoldToPartyZipInput = ()=> {
        if(/^(?=.*[0-9])\d+$/.test(soldToPartyZipInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShipToPartyNameInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(shipToPartyNameInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShipToPartyAddressLine1Input = ()=> {
        if(/^(?!\s+$)\S.*\S$/.test(shipToPartyAddressLine1Input)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShipToPartyAddressLine2Input = ()=> {
        if(/^(?!\s+$)\S.*\S$/.test(shipToPartyAddressLine2Input)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShipToPartyCityInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(shipToPartyCityInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShipToPartyStateInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(shipToPartyStateInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForShiptoPartyzipInput = ()=> {
        if(/^(?=.*[0-9])\d+$/.test(shiptoPartyzipInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForSalesOrderNetAmountInput = ()=> {
        if(/^(?=.*[0-9])\d+$/.test(salesOrderNetAmountInput)){
          return { 'Success' : true }
        }else {
          return { 'Success' : false }
        }
      }

      const RegexForCCNameInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(CCNameInput)){
          return { 'Success' : true }
        }else{
          return { 'Success' : false }
        }
      }

      const RegexForCCMonthInput = ()=> {
        if(/^[a-zA-Z.]+$/.test(CCMonthInputInput)){
          return { 'Success' : true }
        }else {
          return { 'Success' : false }
        }
      }

      const RegexForCCYearInput = ()=> {
        if(/^(?=.*[0-9])\d+$/.test(CCYearInput)){
          return { 'Success' : true }
        }else {
          return { 'Success' : false }
        }
      }

      const RegexForCVVInput = ()=> {
        if(/^(?=.*[0-9])\d+$/.test(CVVInput)){
          return { 'Success' : true }
        }else {
          return { 'Success' : false }
        }
      }

      return {
        RegexForSoldToPartyName, RegexForSoldToPartyAddressLine1Input, RegexForSoldToPartyAddressLine2Input, RegexForSoldToPartyCityInput,
        RegexForSoldToPartyStateInput, RegexForSoldToPartyZipInput, RegexForShipToPartyNameInput, RegexForShipToPartyAddressLine1Input,
        RegexForShipToPartyAddressLine2Input, RegexForShipToPartyCityInput, RegexForShipToPartyStateInput, RegexForShiptoPartyzipInput,
        RegexForSalesOrderNetAmountInput, RegexForCCNameInput, RegexForCCMonthInput, RegexForCCYearInput, RegexForCVVInput
      }
    }
  
    // luln metheod to check the credit card by their bumber
    const validateByLuhn = (CCNumberInput) => {
      let sum = 0;
      let shouldDouble = false;
    
      for (let i = CCNumberInput.length - 1; i >= 0; i--) {
        let digit = parseInt(CCNumberInput.charAt(i));
    
        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) {
            digit = digit - 9;
          }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
    
      return sum % 10 === 0;
    }
    

    // finding which type of creditcard
    const validateCreditCard = (CCNumberInput) => {
      const length = CCNumberInput.length;
      const firstDigit = parseInt(CCNumberInput.charAt(0));
    
      if (length === 15 && (firstDigit === 3 && [4, 7].includes(parseInt(CCNumberInput.charAt(1))))) {
        // American Express
        console.log('American Express');
        const isValid = validateByLuhn(CCNumberInput);
        console.log('Validation Result:', isValid);
        return isValid;
      } else if (length === 16) {
        if (firstDigit === 4) {
          // Visa
          console.log('Visa');
          const isValid = validateByLuhn(CCNumberInput);
          console.log('Validation Result:', isValid);
          return isValid;
        } else if (firstDigit >= 5 && firstDigit <= 5) {
          // Mastercard
          console.log('Mastercard');
          const isValid = validateByLuhn(CCNumberInput);
          console.log('Validation Result:', isValid);
          return isValid;
        }
      }
      
      console.log('Invalid card');
      return false;
    }

    let valid = false;
    
    return Controller.extend("com.myorg.myapp.controller.CreateSales", {

      // renders when page first opens, using it to bind this to the CC files to make it accessable 
      onInit: function(){

        try{

          this.fieldsFilled = false;

          const CCNameInput = this.getView().byId("input12")
          CCNameInput.attachChange(this.onInputChange.bind(this))
          const CCNumberInput = this.getView().byId("input13")
          CCNumberInput.attachChange(this.onInputChange.bind(this))
          const CCMonthInputInput = this.getView().byId("input14")
          CCMonthInputInput.attachChange(this.onInputChange.bind(this))
          const CCYearInput = this.getView().byId("input15")
          CCYearInput.attachChange(this.onInputChange.bind(this))
          const CVVInput = this.getView().byId("input16")
          CVVInput = attachChange(this.onInputChange.bind(this))

        }catch(err){

          console.log(err.message, 'init function');

        }

      },

      // when any CC filed is filled other CC filed becoms matatory and if non filled other remain optional
      onInputChange: function(e){

        try {

          const inputField = e.getSource();

          if(inputField.getValue()){
            this.fieldsFilled = true
          }else {
            this.fieldsFilled = false
          }

          const CCNameInput = this.getView().byId("input12")
          CCNameInput.setRequired(this.fieldsFilled)
          const CCNumberInput = this.getView().byId("input13")
          CCNumberInput.setRequired(this.fieldsFilled)
          const CCMonthInputInput = this.getView().byId("input14")
          CCMonthInputInput.setRequired(this.fieldsFilled)
          const CCYearInput = this.getView().byId("input15")
          CCYearInput.setRequired(this.fieldsFilled)
          const CVVInput = this.getView().byId("input16")
          CVVInput.setRequired(this.fieldsFilled)

        }catch(err){
          console.log(err.message, "input change");
        }

      },

      // geting the credit card number
      onLiveChange: function(){
        const CCNumberInput = this.getView().byId("input13").getValue();

        valid = validateCreditCard(CCNumberInput);
        return valid;
    },
      

      // create button press handle function
      handlePressCreate: function(){

        try {
          const soldtToPartyNameInput = this.getView().byId("input0").getValue();
          const soldToPartyAddressLine1Input = this.getView().byId("input1").getValue();
          const soldToPartyAddressLine2Input = this.getView().byId("input2").getValue();
          const soldToPartyCityInput = this.getView().byId("input3").getValue();
          const soldToPartyStateInput = this.getView().byId("input4").getValue();
          const soldToPartyZipInput = this.getView().byId("input5").getValue();
          const shipToPartyNameInput = this.getView().byId("input6").getValue();
          const shipToPartyAddressLine1Input = this.getView().byId("input7").getValue();
          const shipToPartyAddressLine2Input = this.getView().byId("input8").getValue();
          const shipToPartyCityInput = this.getView().byId("input9").getValue();
          const shipToPartyStateInput = this.getView().byId("input10").getValue();
          const shiptoPartyzipInput = this.getView().byId("input11").getValue();
          const CCNameInput = this.getView().byId("input12").getValue();
          const CCNumberInput = this.getView().byId("input13").getValue();
          const CCMonthInputInput = this.getView().byId("input14").getValue();
          const CCYearInput = this.getView().byId("input15").getValue();
          const CVVInput = this.getView().byId("input16").getValue();
          const salesOrderNetAmountInput = this.getView().byId("input17").getValue();

          console.log(CCNameInput, CCNumberInput, 'lol');
          console.log(typeof(CCNameInput, CCNumberInput, CCMonthInputInput, CCYearInput, CVVInput));
  
          // send data to do regex
          const RegexCheck = CreateSalesRegexCheck(
            soldtToPartyNameInput, soldToPartyAddressLine1Input, soldToPartyAddressLine2Input, soldToPartyCityInput,
            soldToPartyStateInput, soldToPartyZipInput, shipToPartyNameInput, shipToPartyAddressLine1Input, shipToPartyAddressLine2Input,
            shipToPartyCityInput, shipToPartyStateInput, shiptoPartyzipInput, salesOrderNetAmountInput, CCNameInput, CCMonthInputInput,
            CCYearInput, CVVInput
          )
  
          // if these cases true then data send to backend to store in DB
          if(
            RegexCheck.RegexForSoldToPartyName().Success === true &&
            RegexCheck.RegexForSoldToPartyAddressLine1Input().Success === true &&
            RegexCheck.RegexForSoldToPartyAddressLine2Input().Success === true &&
            RegexCheck.RegexForSoldToPartyCityInput().Success === true &&
            RegexCheck.RegexForSoldToPartyStateInput().Success === true &&
            RegexCheck.RegexForSoldToPartyZipInput().Success === true &&
            RegexCheck.RegexForShipToPartyNameInput().Success === true &&
            RegexCheck.RegexForShipToPartyAddressLine1Input().Success === true &&
            RegexCheck.RegexForShipToPartyAddressLine2Input().Success === true &&
            RegexCheck.RegexForShipToPartyCityInput().Success === true &&
            RegexCheck.RegexForShipToPartyStateInput().Success === true &&
            RegexCheck.RegexForShiptoPartyzipInput().Success === true &&
            RegexCheck.RegexForSalesOrderNetAmountInput().Success === true &&
            RegexCheck.RegexForCCNameInput().Success === true &&
            RegexCheck.RegexForCCMonthInput().Success === true &&
            RegexCheck.RegexForCCYearInput().Success === true &&
            RegexCheck.RegexForCVVInput().Success === true &&
            valid === true
            ){
              
              fetch('https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/user/createSalesOrder', {
                method: 'POST',
                body: JSON.stringify({
                  soldPartyName: soldtToPartyNameInput,
                  soldPartyAddress1: soldToPartyAddressLine1Input,
                  soldPartyAddress2: soldToPartyAddressLine2Input,
                  soldPartyCity: soldToPartyCityInput,
                  soldPartyState: soldToPartyStateInput,
                  soldPartyZip: soldToPartyZipInput,
                  shipPartyName: shipToPartyNameInput,
                  shipPartyAddress1: shipToPartyAddressLine1Input,
                  shipPartyAddress2: shipToPartyAddressLine2Input,
                  shipPartyCity: shipToPartyCityInput,
                  shipPartyState: shipToPartyStateInput,
                  shipPartyZip: shiptoPartyzipInput,
                  ccName: CCNameInput,
                  ccNumber: CCNumberInput,
                  ccMonth: CCMonthInputInput,
                  CCyear: CCYearInput,
                  cvv: CVVInput,
                  salesOrderNetAmount: salesOrderNetAmountInput,
                  token
                }),
                headers: { 'content-type': 'application/json' }
              })
              .then(res => res.json())
              .then((data)=> {
                try{
                  MessageBox.alert(data.createdSalesOrder.message)

                  if(data.createdSalesOrder.statusCode === 200){
                    this.getOwnerComponent().getRouter().navTo("home")
                  }
                }catch(err){
                  console.log(err.message);
                }
              })

            // if credit card validation failed
            }
            else if(RegexCheck.RegexForSoldToPartyName().Success === true &&
            RegexCheck.RegexForSoldToPartyAddressLine1Input().Success === true &&
            RegexCheck.RegexForSoldToPartyAddressLine2Input().Success === true &&
            RegexCheck.RegexForSoldToPartyCityInput().Success === true &&
            RegexCheck.RegexForSoldToPartyStateInput().Success === true &&
            RegexCheck.RegexForSoldToPartyZipInput().Success === true &&
            RegexCheck.RegexForShipToPartyNameInput().Success === true &&
            RegexCheck.RegexForShipToPartyAddressLine1Input().Success === true &&
            RegexCheck.RegexForShipToPartyAddressLine2Input().Success === true &&
            RegexCheck.RegexForShipToPartyCityInput().Success === true &&
            RegexCheck.RegexForShipToPartyStateInput().Success === true &&
            RegexCheck.RegexForShiptoPartyzipInput().Success === true &&
            RegexCheck.RegexForSalesOrderNetAmountInput().Success === true &&
            CCNameInput === "" && CCNumberInput === "" && CCMonthInputInput === "" && 
            CCYearInput === "" && CVVInput === ""
            ){
              // MessageBox.alert("Only master card or visa or American express are currenty accepted")
              fetch('https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/user/createSalesOrder', {
                method: 'POST',
                body: JSON.stringify({
                  soldPartyName: soldtToPartyNameInput,
                  soldPartyAddress1: soldToPartyAddressLine1Input,
                  soldPartyAddress2: soldToPartyAddressLine2Input,
                  soldPartyCity: soldToPartyCityInput,
                  soldPartyState: soldToPartyStateInput,
                  soldPartyZip: soldToPartyZipInput,
                  shipPartyName: shipToPartyNameInput,
                  shipPartyAddress1: shipToPartyAddressLine1Input,
                  shipPartyAddress2: shipToPartyAddressLine2Input,
                  shipPartyCity: shipToPartyCityInput,
                  shipPartyState: shipToPartyStateInput,
                  shipPartyZip: shiptoPartyzipInput,
                  ccName: null,
                  ccNumber: null,
                  ccMonth: null,
                  CCyear: null,
                  cvv: null,
                  salesOrderNetAmount: salesOrderNetAmountInput,
                  token
                }),
                headers: { 'content-type': 'application/json' }
              })
              .then(res => res.json())
              .then((data)=>{
                console.log(data);
                try{
                  MessageBox.alert(data.createdSalesOrder.message)

                  if(data.createdSalesOrder.statusCode === 200){
                    this.getOwnerComponent().getRouter().navTo("home")
                  }
                }catch(err){
                  console.log(err.message);
                }
              })
            }
            else {
              MessageBox.alert("Missing Required input")
            }
        }catch(err){
          console.log(err.message);
        }
      }
    });
  });
  