sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Text",
  "sap/m/ColumnListItem",
  "sap/ui/core/Icon",
  "sap/ui/core/IconPool"
], function(Controller,Text,ColumnListItem, Icon, IconPool) {
  "use strict";
  
  return Controller.extend("com.myorg.myapp.controller.HomePage", {

    onInit: function(){

      const token = window.localStorage.getItem("token")
      
      fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/user/home", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({token}),
      })
        .then(res => res.json())
        .then(data => {
          const userTableData = data.homeData;

          const table = this.getView().byId("table0");

          userTableData.forEach(item => {

            const row = new ColumnListItem({
              cells: [
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: item.CREATED_DATE}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT}),
                this.createEditIcon(item.SALES_ORDER_NO)
              ]
            });
            
            table.addItem(row);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
        
    fetch('https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/manager/home',{
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then((data)=> {

      console.log(data);
      
      const managerTableData = data.homeData;

          const table = this.getView().byId("table0");

          managerTableData.forEach(item => {
  
            const row = new ColumnListItem({
              cells: [
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: item.CREATED_DATE}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT}),
                this.createEditIcon(item.SALES_ORDER_NO)
              ]
            });
            table.addItem(row);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },

    createEditIcon: function(orderId) {
        const editIcon = new Icon({
        src: IconPool.getIconURI("edit"),
        press: this.onEditIconPress.bind(this, orderId)
      });
      return editIcon;
    },

    onEditIconPress: function(orderId){
      if(orderId){

        window.localStorage.setItem("orderID", orderId)
        this.getOwnerComponent().getRouter().navTo("updateSales");

      }

    },

    salesCreate: function(){
      this.getOwnerComponent().getRouter().navTo("createSales")
    },

    handleFilter: function(){
    }
  });
});
