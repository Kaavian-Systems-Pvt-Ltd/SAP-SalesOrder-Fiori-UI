sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Text",
  "sap/m/ColumnListItem"
], function(Controller,Text,ColumnListItem) {
  "use strict";

  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiVVNFUiIsImlhdCI6MTY4NzM0NzEwNH0.-1-RbsdtWzVHbY9oo8yrBtl2elVPKejpEhSFbkxZFwc";
  
  return Controller.extend("com.myorg.myapp.controller.HomePage", {

    onInit:async function(){
      const userId=2;
      console.log(token);
       await fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/user/home",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({token}),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const tableData = data.homeData;

          console.log(tableData);
          const table = this.getView().byId("table0");


          tableData.forEach(item => {
            console.log(item);
            const row = new ColumnListItem({
              cells: [
                new Text({ text: item.SALES_ORDER_NO}),
                new Text({ text: item.CREATED_DATE}),
                new Text({ text: item.SOLD_TO_PARTY_NAME}),
                new Text({ text: item.SHIP_TO_PARTY_NAME}),
                new Text({ text: item.SALES_ORDER_NET_AMOUNT})

              ]
            });
            console.log(row);
            table.addItem(row);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },

    handleFilter: async function(){
      
      const orderId=this.getView().byId("field0").getValue();
      const searchTerm=orderId;
      await fetch("https://server-balanced-wallaby-dk.cfapps.us10-001.hana.ondemand.com/api/searchSalesOrder",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ searchTerm })
      }).then(res=>res.json())
      .then((data)=>{
        console.log(data)
      })
    }


  });
});
