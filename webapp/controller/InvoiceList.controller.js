sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/BusyIndicator",
    "zaml/model/formatter",
    "sap/ui/Device",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library",
    "sap/ui/model/resource/ResourceModel"
], (Controller, JSONModel, Filter, MessageBox, FilterOperator, BusyIndicator, formatter, Device, Spreadsheet, library, ResourceModel) => {
    "use strict";

    return Controller.extend("zaml.controller.InvoiceList", {
        formatter: formatter,  // <-- Attach the formatter
        onInit() {
            // if (Device.system.phone || Device.system.tablet) {
            //     this.byId("p3_Country_324").setVisible(true);
            // } else {
            this.byId("uitableid").setVisible(true);
            // }
            var localmodel = new JSONModel();
            this.getView().setModel(localmodel, "Setdefaultmodel");
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("invoiceList").attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched(oEvent) {

            var oArguments = oEvent.getParameter("arguments");
            this._sObjectId = parseInt(oArguments.objectId);
            this.getReadAPI(this._sObjectId);
        },
        onNavBack(History) {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Overview", {}, true);
        },
        getAccessToken: function () {
            const tokenUrl = 'https://chg-meridian-dev-qa-5gwjbubw.authentication.eu20.hana.ondemand.com/oauth/token';
            const clientId = 'sb-1b807827-5cef-4be7-a28f-a5cd04937a57!b64479|it-rt-chg-meridian-dev-qa-5gwjbubw!b18631';
            const clientSecret = '589a2f4c-bf3c-4481-8402-92b0943a09ba$_e-GrL4Ve9hLn1637qzrLuptGCz-XwjwOR4vKdzHTHA=';
            return new Promise((resolve, reject) => {
                jQuery.ajax({
                    url: tokenUrl,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        grant_type: 'client_credentials'
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(clientId + ":" + clientSecret));
                    },
                    success: function (response) {
                        resolve(response.access_token);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },

        fetchData: function (Id) {
            var sId = parseInt(Id);
            var tablename = "Bussiness_Partner_Data";
            var that = this;
            let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;
            this.getAccessToken().then((token) => {
                const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
                // const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";
                if (systemid === "SD1") {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

				} else if (systemid === "SQ1" || systemid === "SQ2") {
					nodeUrl = "https://dbconnect-proxysq.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

				} else if (systemid === "SP1") {
					nodeUrl = "https://dbconnect-proxysp.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

				} else {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";
				}


                //const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
                const query = `SELECT * FROM ${tablename}`;
                jQuery.ajax({
                    // url: proxyUrl + apiUrl,
                    url: nodeUrl,
                    method: 'POST',
                    headers: {
                        "Content-Type": "text/plain", // Use "application/json" if CPI expects JSON
                        "Authorization": `Bearer ${token}`,
                        "X-Requested-With": "XMLHttpRequest" // Capitalized properly
                        // Do not add Access-Control-Allow-* headers here — browser will ignore them
                    },
                    data: query,
                    success: (response) => {
                        BusyIndicator.hide();
                        // Handle success response here
                        // new code 
                        let xmlString = response; // assuming response is the raw XML string
                        let parser = new DOMParser();
                        let xmlDoc = parser.parseFromString(xmlString, "application/xml");
                        // Optional: check for parsing error
                        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                            console.error("Invalid XML response");
                            return;
                        }

                        let jsonData = that.xmlToJson(xmlDoc.documentElement); // pass the <ROOT> node

                        // Extract "row" data
                        let rowData = jsonData.select_response.row // jsonData.ROOT.select_response.row;
                        // Ensure rowData is always an array
                        if (!Array.isArray(rowData)) {
                            rowData = [rowData];
                        }
                        const mergedData = Array.from(
                            rowData.reduce((map, item) => {
                                const key = item.Business_Partner_ID;
                                const existing = map.get(key);

                                if (existing) {
                                    // Merge Industry_Codes (handle comma-separated lists and remove duplicates)
                                    const combinedCodes = [
                                        ...new Set(
                                            (existing.Industry_Codes + ',' + item.Industry_Codes)
                                                .split(',')
                                                .map(code => code.trim())
                                                .filter(Boolean)
                                        )
                                    ].join(',');

                                    existing.Industry_Codes = combinedCodes;
                                } else {
                                    // Clone the item to avoid mutating the original
                                    map.set(key, { ...item });
                                }

                                return map;
                            }, new Map()).values()
                        );

                        // Remove duplicates based on Business_Partner_ID 
                        // const uniqueData = [];
                        // const uniqueID = new Set();
                        // for (const item of rowData) {
                        //     const key = `${item.Business_Partner_ID}|${item.Industry_Codes}|${item.Country}|${item.Customer_subtype}`;
                        //     if (!uniqueID.has(key)) {
                        //         uniqueID.add(key);
                        //         uniqueData.push(item);
                        //     }
                        // }



                        if (mergedData[0] !== undefined) {
                            Object.entries(mergedData).forEach(([key, value]) => {
                                if (
                                    value.Business_Partner_ID &&
                                    typeof value.Business_Partner_ID === "object" &&
                                    Object.keys(value.Business_Partner_ID).length === 0
                                ) {
                                    value.Business_Partner_ID = ""; // or " " if you prefer a space
                                }

                                if (
                                    value.BP_Name &&
                                    typeof value.BP_Name === "object" &&
                                    Object.keys(value.BP_Name).length === 0
                                ) {
                                    value.BP_Name = ""; // or " " if you prefer a space
                                }

                                if (
                                    value.Country &&
                                    typeof value.Country === "object" &&
                                    Object.keys(value.Country).length === 0
                                ) {
                                    value.Country = ""; // or " " if you prefer a space
                                }

                                if (
                                    value.Customer_subtype &&
                                    typeof value.Customer_subtype === "object" &&
                                    Object.keys(value.Customer_subtype).length === 0
                                ) {
                                    value.Customer_subtype = ""; // or " " if you prefer a space
                                }
                                if (
                                    value.Industry_Codes &&
                                    typeof value.Industry_Codes === "object" &&
                                    Object.keys(value.Industry_Codes).length === 0
                                ) {
                                    value.Industry_Codes = ""; // or " " if you prefer a space
                                }
                                if (
                                    value.Compliance_Risk &&
                                    typeof value.Compliance_Risk === "object" &&
                                    Object.keys(value.Compliance_Risk).length === 0
                                ) {
                                    value.Compliance_Risk = ""; // or " " if you prefer a space
                                }
                                if (
                                    value.Beneficial_Owner_Risk &&
                                    typeof value.Beneficial_Owner_Risk === "object" &&
                                    Object.keys(value.Beneficial_Owner_Risk).length === 0
                                ) {
                                    value.Beneficial_Owner_Risk = ""; // or " " if you prefer a space
                                }
                                if (
                                    value.AML_Risk &&
                                    typeof value.AML_Risk === "object" &&
                                    Object.keys(value.AML_Risk).length === 0
                                ) {
                                    value.AML_Risk = ""; // or " " if you prefer a space
                                }
                            });
                        }

                        // Create JSON Model
                        let oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData({ rows: mergedData });

                        // Set Model to View
                        that.getView().setModel(oModel, "tableModel");

                        var oModel2 = that.getView().getModel("tableModel");
                        oModel2.setProperty("/rows", mergedData); // Ensure the response structure matches this path
                        // let textcount = that.getView().getModel("i18n").getResourceBundle().getText("Business_Partner_Data",rowData.length);
                        that.getView().getModel("Setdefaultmodel").setProperty("/rowcount", mergedData.length);


                        that.oOriginalData = JSON.parse(JSON.stringify(that.getView().getModel("tableModel").getData())); // Deep copy original data
                        // if(sId === 2){
                        //     MessageBox.success("Background job is scheduled to update business partner data & Update successful");
                        // }

                        //that.getJson(Response);
                    },
                    error: (error) => {
                        BusyIndicator.hide();
                        MessageBox.error("Failed to fetch data from the server.");
                    }
                });
            }).catch((error) => {
                MessageBox.error("Failed to obtain access token.");
            });
        },

        xmlToJson: function (Response) {
            var xml = Response;
            let obj = {};

            if (xml.nodeType === 1) { // Element node
                if (xml.childNodes.length === 1 && xml.firstChild.nodeType === 3) {
                    return xml.firstChild.nodeValue.trim(); // Directly return value
                }
            }

            if (xml.hasChildNodes()) {
                for (let i = 0; i < xml.childNodes.length; i++) {
                    let item = xml.childNodes.item(i);
                    let nodeName = item.nodeName;

                    let content = this.xmlToJson(item);

                    if (typeof obj[nodeName] === "undefined") {
                        obj[nodeName] = content;
                    } else {
                        if (!Array.isArray(obj[nodeName])) {
                            obj[nodeName] = [obj[nodeName]];
                        }
                        obj[nodeName].push(content);
                    }
                }
            }
            return obj;

        },
        onBusinessPart: function (oEvent) {
            const sQuery = oEvent.getParameter("newValue")?.trim();
            const oTable = this.byId("p3_Country_324");
            const oBinding = oTable.getBinding("items");
            var oFilter;
            var date = "";
            if (!sQuery) {
                oBinding.filter([]); // clear filter
                return;
            }
            oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("Business_Partner_ID", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("BP_Name", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Customer_subtype", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Industry_Codes", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Compliance_Risk", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("Beneficial_Owner_Risk", sap.ui.model.FilterOperator.Contains, sQuery),
                    new sap.ui.model.Filter("AML_Risk", sap.ui.model.FilterOperator.Contains, sQuery)
                ],
                and: false // OR condition
            });
            // }


            oBinding.filter(oFilter);
        },

        getReadAPI: function (objectId) {
            var Id = objectId;
            this.byId("searchBusinesPart").setValue("");
            this.byId("searchBusinesPart1").setValue("");
            BusyIndicator.show();
            const oTable = this.byId("uitableid");
            // Clear filter on binding 
            oTable.getColumns().forEach((col) => {
                col.setFiltered(false);
                col.setFilterValue("");
            });
            this.fetchData(Id);
        },
        //*************************************************************************************************** */

        jsontoXML: function (json) {
            var jsonData = json;
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
            xml += `<n0:_-chg0_-bpfmReadBpDetailsResponse xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style" xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">\n`;
            xml += `    <EtData>\n`;

            jsonData.items.forEach(item => {
                xml += `        <item>\n`;
                xml += `            <BpNumber>${item.BpNumber}</BpNumber>\n`;
                xml += `            <BpName>${item.BpName}</BpName>\n`;

                xml += `            <IndustryCodes>\n`;
                xml += `                <item>\n`;
                xml += `                    <Industry>01</Industry>\n`;
                xml += `                    <Description>Diversifizierte Holding-Gesellschaften</Description>\n`;
                xml += `                </item>\n`;
                xml += `                <item>\n`;
                xml += `                    <Industry>01.1</Industry>\n`;
                xml += `                    <Description>Growing of non-perennial crops</Description>\n`;
                xml += `                </item>\n`;
                xml += `                <item>\n`;
                xml += `                    <Industry>01.11</Industry>\n`;
                xml += `                    <Description>Growing of cereals (except rice), leguminous crops and oil seeds</Description>\n`;
                xml += `                </item>\n`;
                xml += `            </IndustryCodes>\n`;

                xml += `            <CustomerSubtype>${item.CustomerSubtype}</CustomerSubtype>\n`;

                xml += `            <ChgCompany>\n`;
                xml += `                <item><Company>001010</Company><CompanyName>Company 1010</CompanyName></item>\n`;
                xml += `                <item><Company>AT01</Company><CompanyName>CHG Austria</CompanyName></item>\n`;
                xml += `                <item><Company>DE01</Company><CompanyName>CHG AG</CompanyName></item>\n`;
                xml += `                <item><Company>DE02</Company><CompanyName>CHG GmbH</CompanyName></item>\n`;
                xml += `            </ChgCompany>\n`;

                xml += `            <ComplianceRisk>${item.ComplianceRisk}</ComplianceRisk>\n`;
                xml += `            <BoOwnerRisk>${item.BoOwnerRisk || ""}</BoOwnerRisk>\n`;

                xml += `            <RegMangEmail>\n`;
                xml += `                <item><EmailAdrress>praveen.pittala@chg-meridian.com</EmailAdrress></item>\n`;
                xml += `                <item><EmailAdrress>dhivya.t@chg-meridian.com</EmailAdrress></item>\n`;
                xml += `                <item><EmailAdrress>harsh.arora@chg-meridian.com</EmailAdrress></item>\n`;
                xml += `                <item><EmailAdrress>avijit.koley@chg-meridian.com</EmailAdrress></item>\n`;
                xml += `            </RegMangEmail>\n`;

                xml += `            <OverrideFlag>X</OverrideFlag>\n`;

                xml += `            <CountryData>\n`;
                xml += `                <CountryKey>${item.CountryKey}</CountryKey>\n`;
                xml += `                <CountryDescr>${item.CountryDescr}</CountryDescr>\n`;
                xml += `            </CountryData>\n`;

                xml += `        </item>\n`;
            });

            xml += `    </EtData>\n`;
            xml += `</n0:_-chg0_-bpfmReadBpDetailsResponse>`;

            return xml;


        },
        updatequery: function () {
            // Convert object to array (if necessary)
            let aNewData = this.getView().getModel("tableModel").getData();
            var rootName = "EtData"
            //	let query = this.jsontoXML(aNewData);
            const query = `
            <it_partners>
            <item>
                <bpnumber>1000759</bpnumber>
                <amlrisk>HIGH</amlrisk>
            </item>
            <item>
                <bpnumber>1000760</bpnumber>
                <amlrisk>HIGH</amlrisk>
            </item>
            <item>        
                <bpnumber>1000761</bpnumber>
                <amlrisk>HIGH</amlrisk>
            </item>
            </it_partners>`;

            debugger;
            var testdata = [], index = 0;

            this.updateData(query);
        },

        updateData: function (query) {
            var that = this;
            // Correctly formatted XML string (use backticks for template literals)
            var updateQuery = query;
            this.getAccessToken().then((token) => {
                const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlupdates";
                const query = updateQuery; // Adjust query as needed
                jQuery.ajax({
                    url: proxyUrl + apiUrl,
                    // url:  apiUrl,

                    method: 'POST',
                    headers: {
                        "Content-Type": "text/plain",
                        "Authorization": `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization"
                    },
                    data: query,

                    success: (response) => {
                        console.log("Response:", response);
                        // Handle success response here
                        MessageBox.success("Background job is scheduled to update business partner data");

                    },
                    error: (error) => {
                        MessageBox.error("Failed to fetch data from the server.");
                    }
                });
            }).catch((error) => {
                MessageBox.error("Failed to obtain access token.");
            });
        },
        onMDGUpdate: function () {
            this.updatequery();
        },
        onDataExport: function (oEvent) {
            var oTable = this.byId("p3_Country_324");
            var oModel = this.getView().getModel("tableModel");
            var aCols = this.createColumnConfig();
            var aRows = oModel.getProperty("/rows");

            var oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: aRows,
                fileName: "BusinessPartnerData.xlsx",
                worker: false
            };

            var oSpreadsheet = new Spreadsheet(oSettings);
            oSpreadsheet.build()
                .then(() => sap.m.MessageToast.show("Download complete"))
                .finally(() => oSpreadsheet.destroy());
        },
        createColumnConfig: function () {
            return [
                { label: "Business Partner ID", property: "Business_Partner_ID", type: "string" },
                { label: "Business Partner Name", property: "BP_Name", type: "string" },
                { label: "Country", property: "Country", type: "string" },
                { label: "Customer Subtype", property: "Customer_subtype", type: "string" },
                { label: "Industry Code", property: "Industry_Codes", type: "string" },
                { label: "Compliance Risk", property: "Compliance_Risk", type: "string" },
                { label: "Beneficial Owner Risk", property: "Beneficial_Owner_Risk", type: "string" },
                { label: "AML Risk", property: "AML_Risk", type: "string" }
            ];
        },

        onBusinessPart: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("value"); // Handles both liveChange & change
            var oTable = this.byId("uitableid");
            var oBinding = oTable.getBinding("rows");

            if (!sQuery) {
                oBinding.filter([]); // Clear filters
                return;
            }

            // Create filters for each searchable field
            var aFilters = [
                new sap.ui.model.Filter("Business_Partner_ID", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("BP_Name", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("Customer_subtype", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("Industry_Codes", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("Compliance_Risk", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("Beneficial_Owner_Risk", sap.ui.model.FilterOperator.Contains, sQuery),
                new sap.ui.model.Filter("AML_Risk", sap.ui.model.FilterOperator.Contains, sQuery)
            ];

            // Combine them as OR filter
            var oGlobalFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false
            });

            oBinding.filter([oGlobalFilter]);
        }


    });
});
