sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/BusyIndicator",
	"sap/ui/export/Spreadsheet",
	"sap/ui/export/library",
	"zaml/model/formatter",
	"sap/ui/model/resource/ResourceModel",
	"sap/m/MessageToast",
	"sap/ui/thirdparty/jquery"

], (Controller, JSONModel, Filter, MessageBox, FilterOperator, BusyIndicator, Spreadsheet, library, formatter, ResourceModel, MessageToast, jquery) => {
	"use strict";
	const now = new Date(); const globaldate = now.toISOString().split('T')[0];
	return Controller.extend("zaml.controller.Overview", {
		formatter: formatter,  // <-- Attach the formatter
		onInit: async function () {
			var oImage = this.byId("myImageId");
			var sImagePath = sap.ui.require.toUrl("zaml/img/AML_image.jpg");
			// var sImagePath = sap.ui.require.toUrl("zaml/img/CHG1.png");
			oImage.setSrc(sImagePath);
			var localmodel = new JSONModel();
			this.getView().setModel(localmodel, "Setdefaultmodel");
			if (!this.oBPhistorydialog) {
				this.oBPhistorydialog = await this.loadFragment({
					name: "zaml.view.BP_history"
				});
			}
			this.fetchDelete();
			
		},
		onShowHello() {
			// read msg from i18n model
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name");
			const sMsg = oBundle.getText("helloMsg", [sRecipient]);
			// show message
			MessageToast.show(sMsg);
		},

		onOpenDialog: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("customize");
		},

		// onCloseDialog() {
		// 	// note: We don't need to chain to the pDialog promise, since this event-handler
		// 	// is only called from within the loaded dialog itself.
		// 	this.byId("helloDialog").close();
		// },


		onOpenDialogIndustryCode: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 1;
			oRouter.navTo("detail");
		},


		onOpenDialogCustomerSubtype: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 2;
			oRouter.navTo("detail");
		},

		onOpenDialogCountry: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 3;
			oRouter.navTo("detail");
		},


		onOpenDialogCountryHirerchy: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 4;
			oRouter.navTo("detail");
		},
		onOpenDialogRiskweightage: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 5;
			oRouter.navTo("detail");
		},

		onOpenDialogRiskValue: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 6;
			oRouter.navTo("detail");
		},
		onOpenDialogRiskValueRange: function (oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 7;
			oRouter.navTo("detail");
		},
		onPressBussinessPartnerData: function (oEvent) {
			//    this.getReadAPI();
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 8;
			oRouter.navTo("invoiceList", {
				objectId: 1
			}, true);
		},

		onPressamlrisk: async function (oEvent) { 
			const oTable = this.byId("bpid1");
			// Remove perviously  loaded items
			oTable.removeAllItems();
			//Reset the growing counter
			oTable._iRenderedItems = 0;
			// reset the growing table (most important) 
			const oBinding = oTable.getBinding("items");
			if (oBinding) {
				oBinding.refresh(true);
			}
		this.fetchData();
			// Open the dialog
			this.oBPhistorydialog.open();
		},
		Onclose: function () {
			this.oBPhistorydialog.close();
		},
		OnConfirm: function (oEvent) {
			var that = this;
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 9;	
			MessageBox.information("Are you sure you want to perform the AML risk recalculation", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				onClose: function (sAction) {
					debugger;
					if (sAction == 'OK') {
						that.oBPhistorydialog.close();
						oRouter.navTo("amlrisk", {
							objectId: 9
						});
					}
				}
			});
		},
		onCompany: function (oEvent) {
			var that = this;
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			window.globalVariable = 10;
			oRouter.navTo("amlrisk", {
				objectId: 10
			});
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
			var tablename = "AMLChangeLog";
			var that = this;
			this.getAccessToken().then((token) => {
				const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

				//const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
				const query = `SELECT * FROM ${tablename} WHERE date = '${globaldate}'`;
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
						if (rowData[0] !== undefined) {
							// Create JSON Model
							let oModel = new sap.ui.model.json.JSONModel();
							oModel.setData({ rows: rowData });

							// Set Model to View
							that.getView().setModel(oModel, "tableModel1");
							that.getView().getModel("Setdefaultmodel").setProperty("/rowcount", rowData.length);
							
						}

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

		fetchDelete: function (tablename) {
			var tablename = tablename;
			var that = this;
			let dquery;
			dquery = `
			DELETE FROM [AMLChangeLog]
			WHERE [date] = CAST(GETDATE() - 1 AS DATE);
			`;
			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";

				const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

				//const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
				const query = dquery; // `SELECT * FROM ${tablename}`;
				jQuery.ajax({
					// url: proxyUrl + apiUrl,
					url: nodeUrl,//apiUrl,

					method: 'POST',
					headers: {
						"Content-Type": "text/plain", // Use "application/json" if CPI expects JSON
						"Authorization": `Bearer ${token}`,
						"X-Requested-With": "XMLHttpRequest" // Capitalized properly
						// Do not add Access-Control-Allow-* headers here — browser will ignore them
					},
					data: query,

					success: (response) => {

					},
					error: (error) => {

						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				MessageBox.error("Failed to obtain access token.");
			});
		},
		// fetchData: function () {
		// 	var that = this;
		// 	this.getAccessToken().then((token) => {
		// 		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		// 		const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlsend";
		// 		// const query = 'select * FROM test_table;'; // Adjust query as needed
		// 		const query = ''; // Adjust query as needed

		// 		jQuery.ajax({
		// 			url: proxyUrl + apiUrl,

		// 			method: 'POST',
		// 			headers: {
		// 				"Content-Type": "text/plain",
		// 				"Authorization": `Bearer ${token}`,
		// 				"Access-Control-Allow-Origin": "*",
		// 				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		// 				"Access-Control-Allow-Headers": "Content-Type, Authorization"
		// 			},
		// 			data: query,

		// 			success: (response) => {
		// 				console.log("Response:", response);
		// 				// Handle success response here
		// 				var xmlString = response;
		// 				let parser = new DOMParser();
		// 				let xml = parser.parseFromString(xmlString, "text/xml");

		// 				// Convert XML to JSON
		// 				// let jsonData = that.xmlToJson(xml.documentElement);







		// 				let jsonData = that.xmlToJson(xmlString);

		// 				// Extract "row" data
		// 				let rowData = jsonData["_-chg0_-bpfmReadBpDetailsResponse"].EtData.item; // jsonData.ROOT.select_response.row;


		// 				// Ensure rowData is always an array
		// 				rowData = Array.isArray(rowData) ? rowData : (rowData ? [rowData] : []);

		// 				// Process the data safely
		// 				let processedData = rowData.map(obj => ({
		// 					BpNumber: obj.BpNumber?.["#text"] || "",  // Handle undefined cases
		// 					BpName: obj.BpName?.["#text"] || "",
		// 					ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
		// 					BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
		// 					CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
		// 					CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
		// 					CustomerSubtype: obj.CustomerSubtype?.DESCRIPTION?.["#text"] || ""
		// 				}));

		// 				// Create and set the JSON model
		// 				let oModel = new sap.ui.model.json.JSONModel({ items: processedData });
		// 				that.getView().setModel(oModel, "tableModel");



		// 				that.oOriginalData = JSON.parse(JSON.stringify(that.getView().getModel("tableModel").getData())); // Deep copy original data

		// 				//that.getJson(Response);
		// 			},
		// 			error: (error) => {
		// 				MessageBox.error("Failed to fetch data from the server.");
		// 			}
		// 		});
		// 	}).catch((error) => {
		// 		console.error('Error fetching token:', error);
		// 		MessageBox.error("Failed to obtain access token.");
		// 	});
		// },

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

		// xmlToJson: function (xml) {

		// 	let obj = {};

		// 	if (xml.nodeType === 1) { // Element node
		// 		if (xml.attributes.length > 0) {
		// 			obj["@attributes"] = {};
		// 			for (let i = 0; i < xml.attributes.length; i++) {
		// 				let attr = xml.attributes.item(i);
		// 				obj["@attributes"][attr.nodeName] = attr.nodeValue;
		// 			}
		// 		}
		// 	} else if (xml.nodeType === 3) { // Text node
		// 		return xml.nodeValue.trim();
		// 	}

		// 	if (xml.hasChildNodes()) {
		// 		for (let i = 0; i < xml.childNodes.length; i++) {
		// 			let item = xml.childNodes.item(i);
		// 			let nodeName = item.nodeName.replace(/^.*:/, ""); // Remove namespace prefix
		// 			let content = this.xmlToJson(item);

		// 			if (typeof obj[nodeName] === "undefined") {
		// 				obj[nodeName] = content;
		// 			} else {
		// 				if (!Array.isArray(obj[nodeName])) {
		// 					obj[nodeName] = [obj[nodeName]];
		// 				}
		// 				obj[nodeName].push(content);
		// 			}
		// 		}
		// 	}
		// 	return obj;
		// },



		getReadAPI: function () {
			this.fetchData();
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
			let query = this.jsontoXML(aNewData);
			debugger;
			var testdata = [], index = 0;
			this.updateData(query);

		},

		updateData: function (query) {
			var that = this;
			// Correctly formatted XML string (use backticks for template literals)
			var updateQuery = `<?xml version="1.0" encoding="UTF-8"?>
<n0:_-chg0_-bpfmReadBpDetailsResponse 
    xmlns:n0="urn:sap-com:document:sap:soap:functions:mc-style"
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
    <EtData>
        <item>
            <BpNumber>0001000697</BpNumber>
            <BpName>drgrthtrh avijit</BpName>
            <IndustryCodes>
                <item>
                    <Industry>01</Industry>
                    <Description>Diversifizierte Holding-Gesellschaften</Description>
                </item>
                <item>
                    <Industry>01.1</Industry>
                    <Description>Growing of non-perennial crops</Description>
                </item>
                <item>
                    <Industry>01.11</Industry>
                    <Description>Growing of cereals (except rice), leguminous crops and oil seeds</Description>
                </item>
            </IndustryCodes>
            <CustomerSubtype>Public Institution</CustomerSubtype>
            <ChgCompany>
                <item><Company>001010</Company><CompanyName>Company 1010</CompanyName></item>
                <item><Company>AT01</Company><CompanyName>CHG Austria</CompanyName></item>
                <item><Company>DE01</Company><CompanyName>CHG AG</CompanyName></item>
                <item><Company>DE02</Company><CompanyName>CHG GmbH</CompanyName></item>
            </ChgCompany>
            <ComplianceRisk>High</ComplianceRisk>
            <BoOwnerRisk/>
            <RegMangEmail>
                <item><EmailAdrress>praveen.pittala@chg-meridian.com</EmailAdrress></item>
                <item><EmailAdrress>dhivya.t@chg-meridian.com</EmailAdrress></item>
                <item><EmailAdrress>harsh.arora@chg-meridian.com</EmailAdrress></item>
                <item><EmailAdrress>avijit.koley@chg-meridian.com</EmailAdrress></item>
            </RegMangEmail>
            <OverrideFlag>X</OverrideFlag>
            <CountryData>
                <CountryKey>IN</CountryKey>
                <CountryDescr>India</CountryDescr>
            </CountryData>
        </item>
    </EtData>
</n0:_-chg0_-bpfmReadBpDetailsResponse>`;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlsend";
				const query = updateQuery; // Adjust query as needed

				jQuery.ajax({
					url: proxyUrl + apiUrl,

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
						MessageBox.success("Data updated successfully");




					},
					error: (error) => {
						console.error("Error:", error);
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				console.error('Error fetching token:', error);
				MessageBox.error("Failed to obtain access token.");
			});
		},
		//   onMDGUpdate: function() { 
		// 	this.updatequery();
		//   },
		onCloseDialogIndustryCode() {

			this.byId("IndustryCode").close();
		}
	});
});
