sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Text",
  "sap/m/ColumnListItem",
  "sap/ui/core/Icon",
  "sap/ui/core/IconPool"
], function(Controller,Text,ColumnListItem, Icon, IconPool) {
  "use strict";

  let token;
  let role
  
  return Controller.extend("com.myorg.myapp.controller.HomePage", { 

    onInit: function() {
      this.renderTable();
      this.buttonControll();
    
      const oRouter = this.getOwnerComponent().getRouter();
      console.log(oRouter);
      oRouter.attachRouteMatched(this.onRouteMatched, this);
    },
    
    onRouteMatched: function(e) {
      const sRouteName = e.getParameter("name");
    
      if (sRouteName === "home") {
        this.buttonControll();
      }

    },

    dateFormat : function(formatdate){
      const month = formatdate.substring(5, 7);
      const date = formatdate.substring(8, 10);
      const year = formatdate.substring(0, 4);
  
      return month + '/' + date + '/' + year;
    },   

    buttonControll: function(){

      this.renderTable()

      console.log("lol");

      if(role === "MANAGER"){
        const ManagerButtonId = this.getView().byId("button0")
        ManagerButtonId.setEnabled(true)
      }else{
        const UserButtonId = this.getView().byId("button0")
        UserButtonId.setEnabled(true)
      }
    },

    renderTable: function(){

      console.log('came here');
      
      token = window.localStorage.getItem("token");
      role =window.localStorage.getItem("tokenData");

      console.log(role);

      if(role === "MANAGER"){
        const ManagerButtonId = this.getView().byId("button0")
        ManagerButtonId.setEnabled(false)
      }else{
        const UserButtonId = this.getView().byId("button0")
        UserButtonId.setEnabled(true)
      }

      if(role==="USER"){

        fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/user/home",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({token}),
      })
        .then(res => res.json())
        .then(data => {
          const userTableData = data.homeData;

          const table = this.getView().byId("table0");

          userTableData.forEach((item,index) => {
            const rowIndex=index+1;
            const row = new ColumnListItem({
              cells: [
                new Text({text: rowIndex.toString()}), 
                new Text({ text: item.USER_ID}),
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: this.dateFormat(item.UPDATED_DATE)}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT}),
                new Text({text:item.CC_NUMBER}),
                new Text({text:item.BILLING_BLOCK_AMOUNT}),
                this.createEditIcon(item.SALES_ORDER_NO)
              ]
            });
            
            table.addItem(row);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
      }
      else if(role==="MANAGER"){

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

          managerTableData.forEach((item,index) =>{
            const rowIndex=index+1;
            const row = new ColumnListItem({
              cells: [
                new Text({text: rowIndex.toString()}), 
                new Text({ text: item.USER_ID}),
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: this.dateFormat(item.UPDATED_DATE)}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT}),
                new Text({text:item.CC_NUMBER}),
                new Text({text:item.BILLING_BLOCK_AMOUNT}),
                this.createEditIcon(item.SALES_ORDER_NO)
              ]
            });
            table.addItem(row);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
      }
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

      const token = window.localStorage.getItem("token");

      const orderID = this.getView().byId("field0").getValue();

      const searchTerm=orderID;
      
      fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/searchSalesOrder",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({token,searchTerm})
      }).then(res=>res.json())
      .then((data)=>{
        console.log(data)
        const searchTableData = data.SearchData;
        console.log(searchTableData);
          if(searchTableData){
          const table = this.getView().byId("table0");
         

          searchTableData.forEach((item) =>{

          const rowIndex=1;
            const row = new ColumnListItem({
              cells: [
                new Text({text: rowIndex.toString()}), 
                new Text({ text: item.USER_ID}),
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: this.dateFormat(item.UPDATED_DATE)}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT}),
                new Text({text:item.CC_NUMBER}),
                new Text({text: item.BILLING_BLOCK_AMOUNT}),
                this.createEditIcon(item.SALES_ORDER_NO)
              ]
            });
            table.removeAllItems();
            table.addItem(row);
          })
          }else{
            
            const table = this.getView().byId("table0");
            
            table.removeAllItems();
          }
          });
    },
    onSearchFieldLiveChange: function(event) {
      var sValue = event.getParameter("newValue");
      if (!sValue) {
        this.onClear();
      }
    },
    
    onClear: function() {
      // or additional functionality when the X icon is clicked
      const table = this.getView().byId("table0");
      table.removeAllItems();
      this.onInit();
    },
    
  });
});
