sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
  ], function(Controller, MessageBox, Dialog, Button, Text) {
    "use strict";

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

  // declaring global variables
    let valid = false;

    let salesorderno;
    let soldtopartyname;
    let soldtopartyadress1;
    let soldtopartyadress2;
    let soldtopartycity;
    let soldtopartystate;
    let soldtopartyzip;
    let shiptopartyname;
    let shiptopartyaddress1;
    let shiptopartyaddress2;
    let shiptopartycity;
    let shiptopartystate;
    let shiptopartyzip;
    let ccname;
    let ccmonth;
    let ccyear;
    let cvv;
    let salesordernetamount;
    let billingblockamount;
    let ccnumber;
    let token;
    let billingAmountBlock;
    
    return Controller.extend("com.myorg.myapp.controller.UpdateSales", {

      // when opened this function is rendered first
      onInit: async function(){

        // getting token and role from local storage
        const orderID = window.localStorage.getItem("orderID");
        const getToken = window.localStorage.getItem("tokenData");
        token = window.localStorage.getItem("token");

        await fetch('https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/getSalesOrderDetails', {
          method: 'POST',
          body: JSON.stringify({ salesOrderNo: orderID }),
          headers: { 'content-type': 'application/json' }
        })
        .then(res => res.json())
        .then((userData)=> {
          // getting field value from back end
          salesorderno = userData.salesOrderDetails[0].SALES_ORDER_NO;
          soldtopartyname = userData.salesOrderDetails[0].SOLD_TO_PARTY_NAME;
          soldtopartyadress1 = userData.salesOrderDetails[0].SOLD_TO_PARTY_ADDRESS1;
          soldtopartyadress2 = userData.salesOrderDetails[0].SOLD_TO_PARTY_ADDRESS2;
          soldtopartycity = userData.salesOrderDetails[0].SOLD_TO_PARTY_CITY;
          soldtopartystate = userData.salesOrderDetails[0].SOLD_TO_PARTY_STATE;
          soldtopartyzip = userData.salesOrderDetails[0].SOLD_TO_PARTY_ZIP;
          shiptopartyname = userData.salesOrderDetails[0].SHIP_TO_PARTY_NAME;
          shiptopartyaddress1 = userData.salesOrderDetails[0].SHIP_TO_PARTY_ADDRESS1;
          shiptopartyaddress2 = userData.salesOrderDetails[0].SHIP_TO_PARTY_ADDRESS2;
          shiptopartycity = userData.salesOrderDetails[0].SHIP_TO_PARTY_CITY;
          shiptopartystate = userData.salesOrderDetails[0].SHIP_TO_PARTY_STATE;
          shiptopartyzip = userData.salesOrderDetails[0].SHIP_TO_PARTY_ZIP;
          ccname = userData.salesOrderDetails[0].CC_NAME;
          ccnumber = userData.salesOrderDetails[0].CC_NUMBER;
          ccmonth = userData.salesOrderDetails[0].CC_MONTH;
          ccyear = userData.salesOrderDetails[0].CC_YEAR;
          cvv = userData.salesOrderDetails[0].CVV;
          salesordernetamount = userData.salesOrderDetails[0].SALES_ORDER_NET_AMOUNT;
          billingblockamount = true;
        })

        // setting field value
        const orderNo = this.getView().byId("input0")
        orderNo.setValue(salesorderno)
        const soldPartyName = this.getView().byId("input1")
        soldPartyName.setValue(soldtopartyname);
        const soldPartyAdress1 = this.getView().byId("input2")
        soldPartyAdress1.setValue(soldtopartyadress1)
        const soldPartyAdress2 = this.getView().byId("input3")
        soldPartyAdress2.setValue(soldtopartyadress2)
        const soldPartyCity = this.getView().byId("input4")
        soldPartyCity.setValue(soldtopartycity)
        const soldPartyState = this.getView().byId("input5")
        soldPartyState.setValue(soldtopartystate)
        const soldPartyZip = this.getView().byId("input6")
        soldPartyZip.setValue(soldtopartyzip)
        const shipPartyName = this.getView().byId("input7")
        shipPartyName.setValue(shiptopartyname)
        const shipPartyAddress1 = this.getView().byId("input8")
        shipPartyAddress1.setValue(shiptopartyaddress1)
        const shipPartyAddress2 = this.getView().byId("input9")
        shipPartyAddress2.setValue(shiptopartyaddress2)
        const shipPartyCity = this.getView().byId("input10")
        shipPartyCity.setValue(shiptopartycity)
        const shipPartyState = this.getView().byId("input11")
        shipPartyState.setValue(shiptopartystate)
        const shipPartyZip = this.getView().byId("input12")
        shipPartyZip.setValue(shiptopartyzip)
        const ccName = this.getView().byId("input13")
        ccName.setValue(ccname)
        const ccNumber = this.getView().byId("input14")
        ccNumber.setValue(ccnumber)
        const ccMonth = this.getView().byId("input15")
        ccMonth.setValue(ccmonth)
        const ccYear = this.getView().byId("input16")
        ccYear.setValue(ccyear)
        const CVV = this.getView().byId("input17")
        CVV.setValue(cvv)
        const salesOrderNetAmountInput = this.getView().byId("input18")
        salesOrderNetAmountInput.setValue(salesordernetamount)
        const billingBlockAmountInput = this.getView().byId("box2")
        billingBlockAmountInput.setSelected(billingblockamount)

        console.log(getToken);

        // setting diff editable option to manager and user

        // if manager
        if(getToken === "MANAGER"){

        const orderNo = this.getView().byId("input0")
        orderNo.setEditable(false)
        const soldPartyName = this.getView().byId("input1")
        soldPartyName.setEditable(false)
        const soldPartyAdress1 = this.getView().byId("input2")
        soldPartyAdress1.setEditable(false)
        const soldPartyAdress2 = this.getView().byId("input3")
        soldPartyAdress2.setEditable(false)
        const soldPartyCity = this.getView().byId("input4")
        soldPartyCity.setEditable(false)
        const soldPartyState = this.getView().byId("input5")
        soldPartyState.setEditable(false)
        const soldPartyZip = this.getView().byId("input6")
        soldPartyZip.setEditable(false)
        const shipPartyName = this.getView().byId("input7")
        shipPartyName.setEditable(false)
        const shipPartyAddress1 = this.getView().byId("input8")
        shipPartyAddress1.setEditable(false)
        const shipPartyAddress2 = this.getView().byId("input9")
        shipPartyAddress2.setEditable(false)
        const shipPartyCity = this.getView().byId("input10")
        shipPartyCity.setEditable(false)
        const shipPartyState = this.getView().byId("input11")
        shipPartyState.setEditable(false)
        const shipPartyZip = this.getView().byId("input12")
        shipPartyZip.setEditable(false)
        const ccName = this.getView().byId("input13")
        ccName.setEditable(false)
        const ccNumber = this.getView().byId("input14")
        ccNumber.setEditable(false)
        const ccMonth = this.getView().byId("input15")
        ccMonth.setEditable(false)
        const ccYear = this.getView().byId("input16")
        ccYear.setEditable(false)
        const cvv = this.getView().byId("input17")
        cvv.setEditable(false)
        const salesOrderNetAmountInput = this.getView().byId("input18")
        salesOrderNetAmountInput.setEditable(false)
        const billingBlockAmountInput = this.getView().byId("box2")
        billingBlockAmountInput.setEnabled(true)

        // if user
        }else if(getToken === "USER"){

        const orderNo = this.getView().byId("input0")
        orderNo.setEditable(false)
        const soldPartyName = this.getView().byId("input1")
        soldPartyName.setEditable(false)
        const soldPartyAdress1 = this.getView().byId("input2")
        soldPartyAdress1.setEditable(true)
        const soldPartyAdress2 = this.getView().byId("input3")
        soldPartyAdress2.setEditable(true)
        const soldPartyCity = this.getView().byId("input4")
        soldPartyCity.setEditable(true)
        const soldPartyState = this.getView().byId("input5")
        soldPartyState.setEditable(true)
        const soldPartyZip = this.getView().byId("input6")
        soldPartyZip.setEditable(true)
        const shipPartyName = this.getView().byId("input7")
        shipPartyName.setEditable(false)
        const shipPartyAddress1 = this.getView().byId("input8")
        shipPartyAddress1.setEditable(true)
        const shipPartyAddress2 = this.getView().byId("input9")
        shipPartyAddress2.setEditable(true)
        const shipPartyCity = this.getView().byId("input10")
        shipPartyCity.setEditable(true)
        const shipPartyState = this.getView().byId("input11")
        shipPartyState.setEditable(true)
        const shipPartyZip = this.getView().byId("input12")
        shipPartyZip.setEditable(true)
        const ccName = this.getView().byId("input13")
        ccName.setEditable(true)
        const ccNumber = this.getView().byId("input14")
        ccNumber.setEditable(true)
        const ccMonth = this.getView().byId("input15")
        ccMonth.setEditable(true)
        const ccYear = this.getView().byId("input16")
        ccYear.setEditable(true)
        const cvv = this.getView().byId("input17")
        cvv.setEditable(true)
        const salesOrderNetAmountInput = this.getView().byId("input18")
        salesOrderNetAmountInput.setEditable(false)
        const billingBlockAmountInput = this.getView().byId("box2")
        billingBlockAmountInput.setEnabled(false)
        }
      },

      // checking credit card on change
      onLiveUpdate: function(){
        const CCNumberInput = this.getView().byId("input14").getValue();

        valid = validateCreditCard(CCNumberInput);
        return valid;
      },

      // update button handled
      handlePressCreate: function(){

        const salesOrderNo = parseInt(this.getView().byId("input0").getValue(), 10)
        const soldPartyName = this.getView().byId("input1").getValue()
        const soldPartyAdress1Input = this.getView().byId("input2").getValue()
        const soldPartyAdress2Input = this.getView().byId("input3").getValue()
        const soldPartyCityInput = this.getView().byId("input4").getValue()
        const soldPartyStateInput = this.getView().byId("input5").getValue()
        const soldPartyZipInput = parseInt(this.getView().byId("input6").getValue(), 10)
        const shipPartyName = this.getView().byId("input7").getValue()
        const shipPartyAddress1Input = this.getView().byId("input8").getValue()
        const shipPartyAddress2Input = this.getView().byId("input9").getValue()
        const shipPartyCityInput = this.getView().byId("input10").getValue()
        const shipPartyStateInput = this.getView().byId("input11").getValue()
        const shipPartyZipInput = parseInt(this.getView().byId("input12").getValue(), 10)
        const ccName = this.getView().byId("input13").getValue()
        const ccNumber = parseInt(this.getView().byId("input14").getValue(), 10)
        const ccMonth = this.getView().byId("input15").getValue()
        const ccYear = this.getView().byId("input16").getValue()
        const cvv = parseInt(this.getView().byId("input17").getValue(), 10)
        const salesOrderNetAmountUpdate = parseInt(this.getView().byId("input18").getValue(), 10)
        const billingBlockAmountUpdate = this.getView().byId("box2")
        const isChecked = billingBlockAmountUpdate.getSelected();

        if(isChecked === true){
          billingAmountBlock = "Y"
        }else{
          billingAmountBlock = "N"
        }

        console.log(billingAmountBlock, 'billingAmountBlock');


        fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/updateSalesOrder", {
          method: 'POST',
          body: JSON.stringify({
            token,
            salesOrderNo,
            soldPartyName,
            soldPartyAddress1: soldPartyAdress1Input,
            soldPartyAddress2: soldPartyAdress2Input,
            soldPartyCity: soldPartyCityInput,
            soldPartyState: soldPartyStateInput,
            soldPartyZip: soldPartyZipInput,
            shipPartyName,
            shipPartyAddress1: shipPartyAddress1Input,
            shipPartyAddress2: shipPartyAddress2Input,
            shipPartyCity: shipPartyCityInput,
            shipPartyState: shipPartyStateInput,
            shipPartyZip: shipPartyZipInput,
            ccName,
            ccMonth,
            ccNumber,
            CCyear: ccYear,
            cvv,
            salesOrderNetAmount: salesOrderNetAmountUpdate,
            billingAmountBlock
          }),
          headers: { 'content-type': 'application/json' }
        })
        .then(res=> res.json())
        .then((data)=> {
          console.log(data);
          const Res = data.message
          console.log(Res);
          const that = this;

          if(data.message === "Sales Order updation failed"){
            const dialog = new Dialog({
              title: "Failed",
              type: "Message",
              content: new Text({
                text: Res
              }),
              beginButton: new Button({
                text: "OK",
                press: function() {
                  dialog.close();
                }
              }),
              afterClose: function(){
                dialog.destroy();
              }
            })
            dialog.open()
          }else{
            const dialog = new Dialog({
              title: "Success",
              type: "Message",
              content: new Text({
                text: Res
              }),
              beginButton: new Button({
                text: "OK",
                press: function() {
                  dialog.close();
                  that.getOwnerComponent().getRouter().navTo("home")
                }
              }),
              afterClose: function(){
                dialog.destroy();
              }
            })
            dialog.open()
          }
        })
      }
    });
  });
  