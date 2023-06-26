sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function(Controller) {
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

    let valid = false;

    let salesOrderNo;
    let soldToPartyName;
    let soldToPartyAdress1;
    let soldToPartyAdress2;
    let soldToPartyCity;
    let soldToPartyState;
    let soldToPartyZip;
    let shipToPartyName;
    let shipToPartyAddress1;
    let shipToPartyAddress2;
    let shipToPartyCity;
    let shipToPartyState;
    let shipToPartyZip;
    let CCName;
    let CCMonth;
    let CCYear;
    let CCV;
    let salesOrderNetAmount;
    let billingBlockAmount;
    let CCNumber;
    
    return Controller.extend("com.myorg.myapp.controller.UpdateSales", {

      onInit: async function(){

        const orderID = window.localStorage.getItem("orderID");
        const getToken = window.localStorage.getItem("tokenData");

        await fetch('https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/getSalesOrderDetails', {
          method: 'POST',
          body: JSON.stringify({ salesOrderNo: orderID }),
          headers: { 'content-type': 'application/json' }
        })
        .then(res => res.json())
        .then((userData)=> {
          salesOrderNo = userData.salesOrderDetails[0].SALES_ORDER_NO;
          soldToPartyName = userData.salesOrderDetails[0].SOLD_TO_PARTY_NAME;
          soldToPartyAdress1 = userData.salesOrderDetails[0].SOLD_TO_PARTY_ADDRESS1;
          soldToPartyAdress2 = userData.salesOrderDetails[0].SOLD_TO_PARTY_ADDRESS2;
          soldToPartyCity = userData.salesOrderDetails[0].SOLD_TO_PARTY_CITY;
          soldToPartyState = userData.salesOrderDetails[0].SOLD_TO_PARTY_STATE;
          soldToPartyZip = userData.salesOrderDetails[0].SOLD_TO_PARTY_ZIP;
          shipToPartyName = userData.salesOrderDetails[0].SHIP_TO_PARTY_NAME;
          shipToPartyAddress1 = userData.salesOrderDetails[0].SHIP_TO_PARTY_ADDRESS1;
          shipToPartyAddress2 = userData.salesOrderDetails[0].SHIP_TO_PARTY_ADDRESS2;
          shipToPartyCity = userData.salesOrderDetails[0].SHIP_TO_PARTY_CITY;
          shipToPartyState = userData.salesOrderDetails[0].SHIP_TO_PARTY_STATE;
          shipToPartyZip = userData.salesOrderDetails[0].SHIP_TO_PARTY_ZIP;
          CCName = userData.salesOrderDetails[0].CC_NAME;
          CCNumber = userData.salesOrderDetails[0].CC_NUMBER;
          CCMonth = userData.salesOrderDetails[0].CC_MONTH;
          CCYear = userData.salesOrderDetails[0].CC_YEAR;
          CCV = userData.salesOrderDetails[0].CVV;
          salesOrderNetAmount = userData.salesOrderDetails[0].SALES_ORDER_NET_AMOUNT;
          billingBlockAmount = userData.salesOrderDetails[0].BILLING_BLOCK_AMOUNT;
        })

        const orderNo = this.getView().byId("input0")
        orderNo.setValue(salesOrderNo)
        const soldPartyName = this.getView().byId("input1")
        soldPartyName.setValue(soldToPartyName);
        const soldPartyAdress1 = this.getView().byId("input2")
        soldPartyAdress1.setValue(soldToPartyAdress1)
        const soldPartyAdress2 = this.getView().byId("input3")
        soldPartyAdress2.setValue(soldToPartyAdress2)
        const soldPartyCity = this.getView().byId("input4")
        soldPartyCity.setValue(soldToPartyCity)
        const soldPartyState = this.getView().byId("input5")
        soldPartyState.setValue(soldToPartyState)
        const soldPartyZip = this.getView().byId("input6")
        soldPartyZip.setValue(soldToPartyZip)
        const shipPartyName = this.getView().byId("input7")
        shipPartyName.setValue(shipToPartyName)
        const shipPartyAddress1 = this.getView().byId("input8")
        shipPartyAddress1.setValue(shipToPartyAddress1)
        const shipPartyAddress2 = this.getView().byId("input9")
        shipPartyAddress2.setValue(shipToPartyAddress2)
        const shipPartyCity = this.getView().byId("input10")
        shipPartyCity.setValue(shipToPartyCity)
        const shipPartyState = this.getView().byId("input11")
        shipPartyState.setValue(shipToPartyState)
        const shipPartyZip = this.getView().byId("input12")
        shipPartyZip.setValue(shipToPartyZip)
        const ccName = this.getView().byId("input13")
        ccName.setValue(CCName)
        const ccNumber = this.getView().byId("input14")
        ccNumber.setValue(CCNumber)
        const ccMonth = this.getView().byId("input15")
        ccMonth.setValue(CCMonth)
        const ccYear = this.getView().byId("input16")
        ccYear.setValue(CCYear)
        const ccv = this.getView().byId("input17")
        ccv.setValue(CCV)
        const salesOrderNetAmountInput = this.getView().byId("input18")
        salesOrderNetAmountInput.setValue(salesOrderNetAmount)
        const billingBlockAmountInput = this.getView().byId("input19")
        billingBlockAmountInput.setValue(billingBlockAmount)

        console.log(getToken);
        console.log(getToken.role);
        console.log(getToken[0].role);
      },

      onLiveUpdate: function(){
        const CCNumberInput = this.getView().byId("input14").getValue();

        valid = validateCreditCard(CCNumberInput);
        return valid;
      },

      handlePressCreate: function(){
        const soldPartyAdress1Input = this.getView().byId("input2")
        const soldPartyAdress2Input = this.getView().byId("input3")
        const soldPartyCityInput = this.getView().byId("input4")
        const soldPartyStateInput = this.getView().byId("input5")
        const soldPartyZipInput = this.getView().byId("input6")
        const shipPartyAddress1Input = this.getView().byId("input8")
        const shipPartyAddress2Input = this.getView().byId("input9")
        const shipPartyCityInput = this.getView().byId("input10")
        const shipPartyStateInput = this.getView().byId("input11")
        const shipPartyZipInput = this.getView().byId("input12")
        const ccName = this.getView().byId("input13")
        const ccNumber = this.getView().byId("input14")
        const ccMonth = this.getView().byId("input15")
        const ccYear = this.getView().byId("input16")
        const ccv = this.getView().byId("input17")
      }
    });
  });
  