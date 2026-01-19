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
	"sap/ui/thirdparty/jquery",
], (Controller, JSONModel, Filter, MessageBox, FilterOperator, BusyIndicator, Spreadsheet, library, formatter, ResourceModel, MessageToast, jquery) => {
	"use strict";
	var query_Industry_Hierarchy, query_Customer_Subtype, query_Country, query_Risk_Weightage, query_Risk_Value, query_Risk_Value_Range;
	var AMLChangeRecords = { BussinessPartners: [] }, calculatedRiskData;
	var AMLxmlrecord = [];
	var count1 = 0, count2 = 0, bpcount = 0, amlcount = 0, recalcount = 0;
	const now = new Date(); const globaldate = now.toISOString().split('T')[0];
	return Controller.extend("zaml.controller.amlrisk", {
		formatter: formatter,  // <-- Attach the formatter
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR",
				rowcount1: 0
			});
			this.getView().setModel(oViewModel, "view");

			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("amlrisk").attachPatternMatched(this.onObjectMatched, this);
		},


		async onObjectMatched(oEvent) {
			amlcount = 0;
			var oArguments = oEvent.getParameter("arguments");
			this._sObjectId = parseInt(oArguments.objectId);
			var oModel = new sap.ui.model.json.JSONModel();
			if (globalVariable == 9 || this._sObjectId == 9) {
				this.byId("companyidrel").setVisible(false);
				this.byId("p3_Country_3242").setVisible(true);
				this.byId("compid").setSelectedKey("");
				this.byId("relationid").setSelectedKey("");
				this.fetchAMLChangelog();

			} else {
				this.byId("p3_Country_3242").setVisible(false);
				this.byId("companyidrel").setVisible(true);
				this.byId("compid").setSelectedKey("");
				this.byId("relationid").setSelectedKey("");
				this.byId("Footer").setVisible(true);
				this.relationship();
				this.company();
			}
		},
		Onclose: function () {
			this.oBPhistorydialog.close();

		},
		relationship: function () {
			const oModel = new JSONModel();
			var that = this;
			const relation = [

				{
					"Reltype": "ZADMN",
					"Reldesc": "Admin",
					"separator": "-"
				},
				{
					"Reltype": "ZBANK",
					"Reldesc": "House Bank",
					"separator": "-"
				},
				{
					"Reltype": "ZBUSSU",
					"Reldesc": "Business Supplier",
					"separator": "-"
				},
				{
					"Reltype": "ZFUNP",
					"Reldesc": "Funding Partner",
					"separator": "-"
				},
				{
					"Reltype": "ZINDS",
					"Reldesc": "Indirect Supplier",
					"separator": "-"
				},
				{
					"Reltype": "ZINTC",
					"Reldesc": "Inter Company",
					"separator": "-"
				},
				{
					"Reltype": "ZITS",
					"Reldesc": "IT Supplier",
					"separator": "-"
				},
				{
					"Reltype": "ZLEACU",
					"Reldesc": "Leasing Customer",
					"separator": "-"
				},
				{
					"Reltype": "ZTRREC",
					"Reldesc": "Trading/Re-Marketing",
					"separator": "-"
				}
			]
			oModel.setData(relation);
			this.getView().setModel(oModel, "relation");

		},
		company: function () {
			const oModel = new JSONModel();
			var that = this;
			const company = [

				{
					"compid": "001010",
					"desc": "Company 1010",
					"separator": "-"
				},
				{
					"compid": "AT01",
					"desc": "CHG Austria",
					"separator": "-"
				},
				{
					"compid": "AU01",
					"desc": "CHG Australia Pty Limited",
					"separator": "-"
				},
				{
					"compid": "BE01",
					"desc": "CHG Belux NV",
					"separator": "-"
				},
				{
					"compid": "BR01",
					"desc": "CHG Brasil Loc. de Equip. Ltda",
					"separator": "-"
				},
				{
					"compid": "BR02",
					"desc": "CHG Brasil Arren. Mercantil SA",
					"separator": "-"
				},
				{
					"compid": "CA01",
					"desc": "CHG Canada Ltd.",
					"separator": "-"
				},
				{
					"compid": "CH01",
					"desc": "CHG Schweiz AG",
					"separator": "-"
				},
				{
					"compid": "CZ01",
					"desc": "CHG Czech Republic s.r.o",
					"separator": "-"
				},
				{
					"compid": "DE01",
					"desc": "CHG AG",
					"separator": "-"
				},
				{
					"compid": "DE02",
					"desc": "CHG GmbH",
					"separator": "-"
				},
				{
					"compid": "DE03",
					"desc": "CHG Brokerage GmbH",
					"separator": "-"
				},
				{
					"compid": "DK01",
					"desc": "CHG Denmark A/S",
					"separator": "-"
				},
				{
					"compid": "ES01",
					"desc": "CHG Spain S.L.",
					"separator": "-"
				},
				{
					"compid": "FI01",
					"desc": "CHG Finnland OY",
					"separator": "-"
				},
				{
					"compid": "FR01",
					"desc": "CHG France SAS",
					"separator": "-"
				},
				{
					"compid": "GB01",
					"desc": "CHG UK Limited",
					"separator": "-"
				},
				{
					"compid": "IE01",
					"desc": "CHG Ireland Limited",
					"separator": "-"
				},
				{
					"compid": "IT01",
					"desc": "CHG Italia S.p.A",
					"separator": "-"
				},
				{
					"compid": "MX01",
					"desc": "CHG Mexico S.A.P.I. De C.V.",
					"separator": "-"
				},
				{
					"compid": "NL01",
					"desc": "CHG Nederland BV",
					"separator": "-"
				},
				{
					"compid": "NO01",
					"desc": "CHG Norway AS",
					"separator": "-"
				},
				{
					"compid": "NZ01",
					"desc": "CHG New Zealand Limited",
					"separator": "-"
				},
				{
					"compid": "PL01",
					"desc": "CHG Polska sp.z o.o",
					"separator": "-"
				}, {
					"compid": "SE01",
					"desc": "CHG Sweden AB",
					"separator": "-"
				},
				{
					"compid": "SG01",
					"desc": "CHG Singapore Pte. Ltd.",
					"separator": "-"
				},
				{
					"compid": "SI01",
					"desc": "CHG Slovenia d.o.o.",
					"separator": "-"
				},
				{
					"compid": "SK01",
					"desc": "CHG Slovakia s.r.o",
					"separator": "-"
				}, {
					"compid": "US01",
					"desc": "CHG USA Corp.",
					"separator": "-"
				}
			]
			oModel.setData(company);
			this.getView().setModel(oModel, "company");
		},
		onAfterRendering() {
			// if(query_Industry_Hierarchy!==undefined){
			// 	this.fetchBPData(query_Industry_Hierarchy);
			// }
			// this.getReadAPI();
			// this.amlupdateSQLquery();
		},
		onNavBack() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Overview", {}, true);
		},

		amlgetAccessToken: function () {
			const tokenUrl = 'https://chg-meridian-dev-qa-5gwjbubw.authentication.eu20.hana.ondemand.com/oauth/token';
			const clientId = 'sb-na-59c90699-0738-4d1a-8abc-8c1bcbe6a24b!t64479';
			const clientSecret = '021f5e6a-16f0-4127-9895-319bcc02c0ef$ol9-ZuQqQmIz9YtLSLXGC5VVvWlzCgVRu0zEREL7VEY=';
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

		fetchAMLChangelog: function () {
			var tablename = "AMLChangeLog";
			var that = this;
			let industryCode = "", ValueCustomersubtype = "", ValueCountry = "";
			// BusyIndicator.show();
			that.getView().byId("p3_Country_3242").setBusy(true);
			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
				const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";
				//const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
				// const query = `SELECT * FROM ${tablename} `;
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
						// Keep the first occurrence of each unique Industry_code
						const uniqueArray = [];

						const seenKeys = new Set();



						// let rowData = jsonData.ROOT.select_response.row; // old with proxy working code
						// Ensure rowData is always an array
						if (!Array.isArray(rowData)) {
							rowData = [rowData];
						}
						recalcount = 0;
						AMLxmlrecord = [];
						if (rowData[0] !== undefined) {
							rowData.forEach(item => {
								const fname = item.FName?.['#text'] || '';
								const fvalue = item.FValue?.['#text'] || '';

								const key = `${fname}__${fvalue}`; // combine to make unique key

								if (!seenKeys.has(key)) {
									seenKeys.add(key);
									uniqueArray.push(item);
								}
							});
							for (var i = 0; i < uniqueArray.length; i++) {

								// code start if(rowData[i].FName["#text"]==='Country_code')
								if (uniqueArray[i].TableName["#text"] === 'Industry_Hierarchy') {
									industryCode = uniqueArray[i].FValue["#text"];
									// query_Industry_Hierarchy = `SELECT * FROM Bussiness_Partner_Data WHERE [Industry Codes] = '${industryCode}';`;
									// that.fetchBPData(query_Industry_Hierarchy, rowData.length);
									count1 = count1 + 1;
									recalcount++;
									AMLxmlrecord.push({
										industry: industryCode,
										customertype: "",
										coutrycode: ""
									});
								}
								if (uniqueArray[i].TableName["#text"] === 'Customer_Subtype') {
									ValueCustomersubtype = uniqueArray[i].FValue["#text"];
									// query_Customer_Subtype = `SELECT * FROM Bussiness_Partner_Data WHERE [Customer subtype] = '${ValueCustomersubtype}';`;
									// that.fetchBPData(query_Customer_Subtype, rowData.length);
									count1 = count1 + 1;
									recalcount++;
									AMLxmlrecord.push({
										industry: "",
										customertype: ValueCustomersubtype,
										coutrycode: ""
									});
								}
								//code for Country 

								if (uniqueArray[i].TableName["#text"] === 'Country') {
									ValueCountry = uniqueArray[i].FValue["#text"];
									// query_Country = `SELECT * FROM Bussiness_Partner_Data WHERE [Country] = '${ValueCountry}';`;
									// that.fetchBPData(query_Country, rowData.length);
									count1 = count1 + 1;
									recalcount++;
									AMLxmlrecord.push({
										industry: "",
										customertype: "",
										coutrycode: ValueCountry
									});
								}
							}
							if (count1 === 0) {
								that.getView().byId("p3_Country_3242").setBusy(false);
								MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
									onClose: function (sAction) {
										const oRouter = that.getOwnerComponent().getRouter();
										oRouter.navTo("Overview", {}, true);
									}
								});
							} else {
								that.getView().byId("p3_Country_3242").setBusy(false);
								// AMLxmlrecord.push({
								// 	industry: industryCode,
								// 	customertype: ValueCustomersubtype,
								// 	coutrycode: ValueCountry
								// });
								that.fetchData();
							}
						} else {
							// BusyIndicator.hide();
							that.getView().byId("p3_Country_3242").setBusy(false);
							MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
								onClose: function (sAction) {
									const oRouter = that.getOwnerComponent().getRouter();
									oRouter.navTo("Overview", {}, true);
								}
							});
						}

					},
					error: (error) => {
						that.getView().byId("p3_Country_3242").setBusy(false);
						MessageBox.error(error.responseText, {
							onClose: function (sAction) {
								const oRouter = that.getOwnerComponent().getRouter();
								oRouter.navTo("Overview", {}, true);
							}
						});
					}
				});
			}).catch((error) => {
				that.getView().byId("p3_Country_3242").setBusy(false);
				MessageBox.error("Failed to obtain access token.");
			});
		},

		/** Fetching BP data for Industry_code, Coutry code, Customer_Subtype */

		fetchBPData: function (query3, length1) {
			var query2 = query3; //"Bussiness_Partner_Data";
			var that = this;
			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
				const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";
				//const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
				const query = query2;//`SELECT * FROM ${tablename}`;
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
						amlcount++;
						count2 = count2 + 1;
						// Handle success response here
						//   var xmlString = response;
						//  let jsonData = that.xmlToJson(xmlString);
						// let rowData = jsonData.ROOT.select_response.row;

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
						let rowData = jsonData.select_response.row;

						// Ensure rowData is always an array
						if (!Array.isArray(rowData)) {
							rowData = [rowData];
						}

						if (rowData[0] !== undefined) {
							amlcount--;
							//new code start for multiple Bussiness Partners
							for (var j = 0; j < rowData.length; j++) {
								AMLChangeRecords.BussinessPartners.push(rowData[j].Business_Partner_ID["#text"]);
							}

							if (AMLChangeRecords.BussinessPartners !== undefined && AMLChangeRecords.BussinessPartners !== '') {
								AMLChangeRecords.BussinessPartners = [...new Set(AMLChangeRecords.BussinessPartners)];
							}
							// New Code end for multiple bussiness partners
							for (var i = 0; i < count1; i++) {
								if (count1 >= bpcount) {

									/// AMLChangeRecords.BussinessPartners.push(rowData[0].Business_Partner_ID["#text"]);
									bpcount = bpcount + 1;
									// AMLChangeRecords.BussinessPartners[0] = rowData[0].Business_Partner_ID["#text"];

								}
							}//forloop

							if (AMLChangeRecords.BussinessPartners !== undefined) {
								recalcount--;

							}
						} else {
							if (length1 === 1) {
								// BusyIndicator.hide();
								that.getView().byId("p3_Country_3242").setBusy(false);
								MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
									onClose: function (sAction) {
										const oRouter = that.getOwnerComponent().getRouter();
										oRouter.navTo("Overview", {}, true);
									}
								});
							} else if (length1 === 2) {
								recalcount--;
								if (amlcount === 2) {
									// BusyIndicator.hide();
									that.getView().byId("p3_Country_3242").setBusy(false);
									MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
										onClose: function (sAction) {
											const oRouter = that.getOwnerComponent().getRouter();
											oRouter.navTo("Overview", {}, true);
										}
									});
								}
							}
							else {
								recalcount--;
								if (amlcount === 3) {
									// BusyIndicator.hide();
									that.getView().byId("p3_Country_3242").setBusy(false);
									MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
										onClose: function (sAction) {
											const oRouter = that.getOwnerComponent().getRouter();
											oRouter.navTo("Overview", {}, true);
										}
									});
								}
							}

						}

						if (recalcount === 0) {
							that.getReadAPI();
						}
					},
					error: (error) => {
						that.getView().byId("p3_Country_3242").setBusy(false);
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				that.getView().byId("p3_Country_3242").setBusy(false);
				MessageBox.error("Failed to obtain access token.");
			});
		},
		getReadAPI: function () {
			this.fetchData();
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

		//  end code to fetch changed records

		fetchData: function () {
			if (AMLxmlrecord.length > 0) {
				var that = this;
				let xml = `<EtData>\n`; AMLxmlrecord.forEach(bp => {
					if (bp.industry !== "" && bp.customertype !== "" && bp.coutrycode !== "") {
						xml += `  <item>\n    <Industry>${bp.industry}</Industry>\n <Industrydescr></Industrydescr>\n 
					   <CustomerSubtype>${bp.customertype}</CustomerSubtype>\n <Description></Description>\n
					    <CountryKey>${bp.coutrycode}</CountryKey>\n <CountryDescr></CountryDescr>\n </item>\n`;
					} else if (bp.industry !== "" && bp.customertype !== "") {
						xml += `  <item>\n    <Industry>${bp.industry}</Industry>\n <Industrydescr></Industrydescr>\n 
					   <CustomerSubtype>${bp.customertype}</CustomerSubtype>\n <Description></Description>\n
					    </item>\n`;
					} else if (bp.industry !== "" && bp.coutrycode !== "") {
						xml += `  <item>\n    <Industry>${bp.industry}</Industry>\n <Industrydescr></Industrydescr>\n 	    
					   <CountryKey>${bp.coutrycode}</CountryKey>\n <CountryDescr></CountryDescr>\n </item>\n`;
					} else if (bp.customertype !== "" && bp.coutrycode !== "") {
						xml += `  <item>\n   <CustomerSubtype>${bp.customertype}</CustomerSubtype>\n <Description></Description>\n   	    
					   <CountryKey>${bp.coutrycode}</CountryKey>\n <CountryDescr></CountryDescr>\n </item>\n`;
					} else if (bp.industry !== "") {
						xml += `  <item>\n    <Industry>${bp.industry}</Industry>\n <Industrydescr></Industrydescr>\n   </item>\n`;
					} else if (bp.customertype !== "") {
						xml += `  <item>\n    <CustomerSubtype>${bp.customertype}</CustomerSubtype>\n <Description></Description>\n  </item>\n`;
					} else if (bp.coutrycode !== "") {
						xml += `  <item>\n    <CountryKey>${bp.coutrycode}</CountryKey>\n <CountryDescr></CountryDescr>\n </item>\n`;
					}

					if (bp.customertype !== "") {

					}
					if (bp.coutrycode !== "") {

					}


				});
				xml += `</EtData>`;
				let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;


				this.getAccessToken().then((token) => {
					const proxyUrl = "https://cors-anywhere.herokuapp.com/";
					//const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

					const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlsend";
					// const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";
					if (systemid === "SD1") {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else if (systemid === "SQ1" || systemid === "SQ2") {
					nodeUrl = "https://dbconnect-proxysq.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else if (systemid === "SP1") {
					nodeUrl = "https://dbconnect-proxysp.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";
				}



					// const query = 'select * FROM test_table;'; // Adjust query as needed
					const query = xml; // Adjust query as needed

					jQuery.ajax({
						//  url: proxyUrl + apiUrl,
						url: nodeUrl,

						method: 'POST',
						headers: {
							"Content-Type": "text/plain", // Use "application/json" if CPI expects JSON
							"Authorization": `Bearer ${token}`,
							"X-Requested-With": "XMLHttpRequest" // Capitalized properly
							// Do not add Access-Control-Allow-* headers here — browser will ignore them
						},
						data: query,

						success: async (response) => {
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
							let rowData = jsonData.EtData.item; //jsonData.select_response.row // jsonData.ROOT.select_response.row;

							// Ensure rowData is always an array
							rowData = Array.isArray(rowData) ? rowData : (rowData ? [rowData] : []);

							// Process the data safely
							// let processedData = rowData.map(obj => ({
							// 	BpNumber: obj.BpNumber?.["#text"] || "",  // Handle undefined cases
							// 	BpName: obj.BpName?.["#text"] || "",
							// 	IndustryCodes: obj.IndustryCodes?.["item"] || "",
							// 	ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
							// 	BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
							// 	CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
							// 	CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
							// 	CustomerSubtype: obj.CustomerSubtype?.CustomerSubtype?.["#text"] || ""
							// }));

							let processedData = [];

							rowData.forEach(obj => {
								let industryItems = obj.aIndustryCodes || obj.IndustryCodes?.item || [];
								if (!Array.isArray(industryItems)) {
									industryItems = [industryItems]; // normalize single object to array
								}

								if (industryItems.length === 0) {
									// No industry codes, push one record with empty code
									processedData.push({
										BpNumber: obj.BpNumber?.["#text"] || "",
										BpName: obj.BpName?.["#text"] || "",
										IndustryCodes: "",   // empty
										ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
										BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
										CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
										CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
										CustomerSubtype: obj.CustomerSubtype?.CUSTOMER_SUBTYPE?.["#text"] || ""
									});
								} else {
									// For each industry code, push a separate record
									industryItems.forEach(code => {
										processedData.push({
											BpNumber: obj.BpNumber?.["#text"] || "",
											BpName: obj.BpName?.["#text"] || "",
											IndustryCodes: code.Industry?.["#text"] || "",
											IndustryDescription: code.Description?.["#text"] || "",
											ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
											BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
											CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
											CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
											CustomerSubtype: obj.CustomerSubtype?.CUSTOMER_SUBTYPE?.["#text"] || ""
										});
									});
								}
							});

							// Create and set the JSON model
							let oModel = new sap.ui.model.json.JSONModel({ items: processedData });
							that.getView().setModel(oModel, "tableModel");
							that.oOriginalData = JSON.parse(JSON.stringify(that.getView().getModel("tableModel").getData())); // Deep copy original data
							//that.getJson(Response);
							//step 3
							// if (AMLChangeRecords.BussinessPartners && AMLChangeRecords.BussinessPartners.length >= 1) {
							// that.amlupdateSQLquery();
							that.getView().setModel(oModel, "bpdetailmodel");
							that.getView().getModel("view").setProperty("/rowcount1", processedData.length);
							if (rowData.length > 0) {
								that.UpdateBPtable(processedData);
							}
							if (!that.BPdialog) {
								that.BPdialog = await this.loadFragment({
									name: "zaml.view.BP"
								});
							}
							// Create and set the JSON model
							that.BPdialog.open();
							// }
						},
						error: (error) => {
							MessageBox.error("Failed to fetch data from the server.");
						}
					});
				}).catch((error) => {
					MessageBox.error("Failed to obtain access token.");
				});
			}//end of if condtion
		},


		xmlToJson: function (xml) {

			let obj = {};

			if (xml.nodeType === 1) { // Element node
				if (xml.attributes.length > 0) {
					obj["@attributes"] = {};
					for (let i = 0; i < xml.attributes.length; i++) {
						let attr = xml.attributes.item(i);
						obj["@attributes"][attr.nodeName] = attr.nodeValue;
					}
				}
			} else if (xml.nodeType === 3) { // Text node
				return xml.nodeValue.trim();
			}

			if (xml.hasChildNodes()) {
				for (let i = 0; i < xml.childNodes.length; i++) {
					let item = xml.childNodes.item(i);
					let nodeName = item.nodeName.replace(/^.*:/, ""); // Remove namespace prefix
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
			// let aNewData = this.getView().getModel("tableModel").getData();
			var rootName = "EtData"
			//	let query = this.jsontoXML(aNewData);

			const query = `
						<it_partners>
						<item>
							<bpnumber>1000751</bpnumber>
							<amlrisk>HIGH</amlrisk>
						</item>
						<item>
							<bpnumber>1000752</bpnumber>
							<amlrisk>HIGH</amlrisk>
						</item>
						<item>        
							<bpnumber>1000753</bpnumber>
							<amlrisk>HIGH</amlrisk>
						</item>
						</it_partners>`;
			debugger;
			var testdata = [], index = 0;
			this.updateData(query);

		},

		amlupdateSQLquery: async function () {

			const bpList = AMLChangeRecords.BussinessPartners;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			const query = {
				"BP_NUMBERS": Array.isArray(bpList) && bpList.length > 0
					? bpList.map(bp => ({ "BP_NUMBER": bp }))
					: [],
				// "SID": "SD1"  // Replace with dynamic SID if needed
				"SID": systemid
			};

			// Only call amlupdateSQLData if there are BP_NUMBERS
			if (query.BP_NUMBERS.length > 0) {
				this.amlupdateSQLData(query);

			} else {
				that.getView().setBusy(false);
				that.getView().byId("p3_Country_3242").setBusy(false);
				MessageBox.information("No Business Partner's AML Risk to be recalculated.", {
					onClose: function (sAction) {
						const oRouter = that.getOwnerComponent().getRouter();
						oRouter.navTo("Overview", {}, true);
					}
				});
			}

		},

		amlupdateSQLData: function (query) {
			var that = this;
			var updateQuery = query; // this should be a plain JS object 
			this.amlgetAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://aml_rest-bright-waterbuck-re.cfapps.eu20-001.hana.ondemand.com/amlrecalculate";
				jQuery.ajax({
					// url: proxyUrl + apiUrl,
					url: apiUrl,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
					data: JSON.stringify(updateQuery), // ✅ Send proper JSON string here
					success: (response) => {
						// BusyIndicator.hide();
						//  code for convert xml data to send as parameter 
						that.getView().setBusy(false);
						calculatedRiskData = that.convertparameter(response);
						if (calculatedRiskData) {
							that.updateData(calculatedRiskData);
							//  end code for convert xml data to send as parameter 
							//calculatedRiskData = JSON.stringify(response);
							// MessageBox.success("Update successful!");

							const oRouter = that.getOwnerComponent().getRouter();
							oRouter.navTo("invoiceList", {
								objectId: 2
							}, true);
						} else {
							MessageToast.show(that.getView().getModel("i18n").getResourceBundle().getText("Message_amlrecalculate"))
						}

					},
					error: (error) => {
						MessageBox.error("Error while sending data: " + error.responseText);
					}
				});
			}).catch((error) => {
				MessageBox.error("Failed to obtain access token.");
			});


		},

		updateData: function (query) {
			var that = this;
			// Correctly formatted XML string (use backticks for template literals)
			var updateQuery = query;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				// const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlupdates";
				if (systemid === "SD1") {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlupdates";

				} else if (systemid === "SQ1" || systemid === "SQ2") {
					nodeUrl = "https://dbconnect-proxysq.cfapps.eu20-001.hana.ondemand.com/api/amlupdates";

				} else if (systemid === "SP1") {
					nodeUrl = "https://dbconnect-proxysp.cfapps.eu20-001.hana.ondemand.com/api/amlupdates";

				} else {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlupdates";
				}

				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlupdates";
				const query = updateQuery; // Adjust query as needed

				jQuery.ajax({
					// url: proxyUrl + apiUrl,
					url: nodeUrl,// apiUrl,

					method: 'POST',
					headers: {
						"Content-Type": "text/plain", // Use "application/json" if CPI expects JSON
						"Authorization": `Bearer ${token}`,
						"X-Requested-With": "XMLHttpRequest" // Capitalized properly
						// Do not add Access-Control-Allow-* headers here — browser will ignore them
					},
					data: query,

					success: (response) => {
						// Handle success response here  Business Partner's AML Risk to be recalculated.
						MessageBox.success(that.getView().getModel("i18n").getResourceBundle().getText("Success_msg"));
					},
					error: (error) => {
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				MessageBox.error("Failed to obtain access token.");
			});
		},

		convertparameter: function (xmlStr) {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
			const rows = xmlDoc.getElementsByTagName("row");
			let resultXML;
			if (rows.length > 0) {
				resultXML = `<it_partners>\n`;
				for (let i = 0; i < rows.length; i++) {
					const bpID = rows[i].getElementsByTagName("Business_Partner_ID")[0].textContent.trim();
					const amlRisk = rows[i].getElementsByTagName("AML_Risk")[0].textContent.trim().toUpperCase();

					resultXML += `  <item>\n    <bpnumber>${bpID}</bpnumber>\n    <amlrisk>${amlRisk}</amlrisk>\n  </item>\n`;
				}
				resultXML += `</it_partners>`;
			}

			return resultXML;
		},

		//********************************************************* */
		amlupdatequery: function () {
			// Convert object to array (if necessary)
			let aNewData = this.getView().getModel("tableModel").getData();
			var rootName = "EtData";
			oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			//	let query = this.jsontoXML(aNewData); 
			const query = {
				BP_Number: "1000051",
				BP_Name: "CHG Update IHB Servicer/Holder",
				Country: "DE",
				Customer_Subtype: "01",
				Industry_Codes: "01.11.0,01.12.0,01.13.1",
				Compliance_Risk: "Low",
				Beneficial_Owner_Risk: "High",
				SID: systemid
			};
			debugger;
			var testdata = [], index = 0;
			this.amlupdateData(query);

		},

		amlupdateData: function (query) {
			var that = this;
			// Correctly formatted XML string (use backticks for template literals)
			var updateQuery = query;

			this.amlgetAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://aml_rest-bright-waterbuck-re.cfapps.eu20-001.hana.ondemand.com/amlcheck";
				const query = updateQuery; // This should be a JS object

				jQuery.ajax({
					url: proxyUrl + apiUrl,
					// url: apiUrl,
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
					data: JSON.stringify(query), // ✅ Convert to JSON string
					success: (response) => {
						var message2 = JSON.stringify(response)
						// Handle success response here
						MessageBox.success(message2);

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
		onAmlRiskCalculation: function () {
			this.amlupdatequery();
		},
		onUpdateRiskSQL: function () {
			///// this.amlupdateSQLquery();
		},
		oncancel: function (oEvent) {
			var that = this;
			MessageBox.information("Do you want to cancel", {
				emphasizedAction: MessageBox.Action.OK,
				onClose: function () {
					that.onNavBack();
				}
			});
		},
		OnCalculate: async function (oEvent) {
			var that = this;
			if (that.byId("compid").getSelectedKey() && that.byId("relationid").getSelectedKey()) {
				if (!this.BPdialog) {
					this.BPdialog = await this.loadFragment({
						name: "zaml.view.BP"
					});
				}
				that.onBpdetails();
				this.BPdialog.open();
			} else {
				MessageBox.information("Please Select Company ID & Relation Type");
			}
		},

		onBpdetails: function () {
			var that = this;
			let compid = that.byId("compid").getSelectedKey();
			let reltype = that.byId("relationid").getSelectedKey()
			let xml = `<EtData>\n` +
				`  <item>\n` +
				`    <Zrcomp>${compid}</Zrcomp>\n` +
				`    <Zreltyp>${reltype}</Zreltyp>\n` +

				`  </item>\n` +
				`</EtData>`;

			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl; 
			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				//const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/amlsend";
				// const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				if (systemid === "SD1") {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else if (systemid === "SQ1" || systemid === "SQ2") {
					nodeUrl = "https://dbconnect-proxysq.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else if (systemid === "SP1") {
					nodeUrl = "https://dbconnect-proxysp.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				} else {
					nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/amlsend";

				}


				// const query = 'select * FROM test_table;'; // Adjust query as needed
				const query = xml; // Adjust query as needed

				jQuery.ajax({
					//  url: proxyUrl + apiUrl,
					url: nodeUrl,

					method: 'POST',
					headers: {
						"Content-Type": "text/plain", // Use "application/json" if CPI expects JSON
						"Authorization": `Bearer ${token}`,
						"X-Requested-With": "XMLHttpRequest" // Capitalized properly
						// Do not add Access-Control-Allow-* headers here — browser will ignore them
					},
					data: query,

					success: async (response) => {
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
						let rowData = jsonData.EtData.item; //jsonData.select_response.row // jsonData.ROOT.select_response.row;

						// Ensure rowData is always an array
						rowData = Array.isArray(rowData) ? rowData : (rowData ? [rowData] : []);

						// Process the data safely
						// let processedData = rowData.map(obj => ({
						// 	BpNumber: obj.BpNumber?.["#text"] || "",  // Handle undefined cases
						// 	BpName: obj.BpName?.["#text"] || "",
						// 	// IndustryCodes: obj.IndustryCodes?.["item"] || "",
						// 	IndustryCodes: (obj.aIndustryCodes || []).map(code => {
						// 		const industry = code.Industry?.["#text"] || "";
						// 		return industry;
						// 	}).filter(Boolean).join(", "),
						// 	ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
						// 	BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
						// 	CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
						// 	CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
						// 	CustomerSubtype: obj.CustomerSubtype?.CUSTOMER_SUBTYPE?.["#text"] || ""
						// }));

						let processedData = [];

						rowData.forEach(obj => {
							let industryItems = obj.aIndustryCodes || obj.IndustryCodes?.item || [];
							if (!Array.isArray(industryItems)) {
								industryItems = [industryItems]; // normalize single object to array
							}

							if (industryItems.length === 0) {
								// No industry codes, push one record with empty code
								processedData.push({
									BpNumber: obj.BpNumber?.["#text"] || "",
									BpName: obj.BpName?.["#text"] || "",
									IndustryCodes: "",   // empty
									ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
									BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
									CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
									CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
									CustomerSubtype: obj.CustomerSubtype?.CUSTOMER_SUBTYPE?.["#text"] || ""
								});
							} else {
								// For each industry code, push a separate record
								industryItems.forEach(code => {
									processedData.push({
										BpNumber: obj.BpNumber?.["#text"] || "",
										BpName: obj.BpName?.["#text"] || "",
										IndustryCodes: code.Industry?.["#text"] || "",
										IndustryDescription: code.Description?.["#text"] || "",
										ComplianceRisk: obj.ComplianceRisk?.["#text"] || "",
										BoOwnerRisk: obj.BoOwnerRisk?.["#text"] || "",
										CountryKey: obj.CountryData?.CountryKey?.["#text"] || "",
										CountryDescr: obj.CountryData?.CountryDescr?.["#text"] || "",
										CustomerSubtype: obj.CustomerSubtype?.CUSTOMER_SUBTYPE?.["#text"] || ""
									});
								});
							}
						});


						// Create and set the JSON model
						let oModel = new sap.ui.model.json.JSONModel({ items: processedData });
						that.getView().setModel(oModel, "bpdetailmodel");
						that.getView().getModel("view").setProperty("/rowcount1", processedData.length);
						if (rowData.length > 0) {
							that.UpdateBPtable(processedData);
						}
						that.BPdialog.open();
					},
					error: (error) => {
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				MessageBox.error("Failed to obtain access token.");
			});
		},
		getText: function (obj, path) {
			try {
				return path.reduce((acc, key) =>
					acc?.[key], obj)?.toString().trim() || '';
			} catch (e) {
				return '';
			}
		},
		UpdateBPtable: function (records) {
			var that = this;
			let tablename = "Bussiness_Partner_Data";
			// Helper function to safely get nested value
			const cleanedRecords = [];
			for (const r of records) {
				const cleanedRecord = {
					BpNumber: r.BpNumber,
					BpName: r.BpName,
					Country: r.CountryKey,
					CustomerSubtype: r.CustomerSubtype,
					IndustryCodes: r.IndustryCodes,
					ComplianceRisk: r.ComplianceRisk,
					BoOwnerRisk: r.BoOwnerRisk
				};

				// Skip this record if any field is missing or empty
				const allFieldsValid = Object.values(cleanedRecord).every(value => value !== '' && value !== undefined);
				if (allFieldsValid) {
					cleanedRecords.push(cleanedRecord);
				}
			}


			// Filter out records with any missing fields
			// const filteredRecords = records.filter(r =>
			// 	r.BpNumber && r.BpName && r.Country && r.CustomerSubtype &&
			// 	r.IndustryCodes && r.ComplianceRisk && r.BoOwnerRisk
			// );

			// Generate the VALUES part of the SQL query

			const valuesString = cleanedRecords.map(r =>
				`('${r.BpNumber}', '${r.BpName}', '${r.Country}', '${r.CustomerSubtype}', '${r.IndustryCodes}', '${r.ComplianceRisk}', '${r.BoOwnerRisk}')`
			).join(',\n');
			const insertQuery = ` 
								WITH SourceGrouped AS (
									SELECT
										BpNumber,
										BpName,
										Country,
										CustomerSubtype,
										STRING_AGG(IndustryCodes, ',') AS IndustryCodes,
										ComplianceRisk,
										BoOwnerRisk
									FROM (
										VALUES
											${valuesString}
									) AS v (BpNumber, BpName, Country, CustomerSubtype, IndustryCodes, ComplianceRisk, BoOwnerRisk)
									GROUP BY BpNumber, BpName, Country, CustomerSubtype, ComplianceRisk, BoOwnerRisk
								)

								MERGE INTO Bussiness_Partner_Data AS target
								USING SourceGrouped AS source
									ON target.[Business Partner ID] = source.BpNumber
								WHEN MATCHED THEN
									UPDATE SET 
										[BP Name] = source.BpName,
										[Country] = source.Country,
										[Customer subtype] = source.CustomerSubtype,
										[Industry Codes] = source.IndustryCodes,
										[Compliance Risk] = source.ComplianceRisk,
										[Beneficial Owner Risk] = source.BoOwnerRisk
								WHEN NOT MATCHED THEN
									INSERT (
										[Business Partner ID],
										[BP Name],
										[Country],
										[Customer subtype],
										[Industry Codes],
										[Compliance Risk],
										[Beneficial Owner Risk]
									)
									VALUES (
										source.BpNumber,
										source.BpName,
										source.Country,
										source.CustomerSubtype,
										source.IndustryCodes,
										source.ComplianceRisk,
										source.BoOwnerRisk
									);`;


			if (cleanedRecords.length > 0) {
				this.getAccessToken().then((token) => {
					const proxyUrl = "https://cors-anywhere.herokuapp.com/";
					const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
					const nodeUrl = "https://dbconnect-proxy.cfapps.eu20-001.hana.ondemand.com/api/dbconnect";

					//const query = 'select * FROM Industry_Hierarchy;'; // Adjust query as needed
					const query = insertQuery;
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

						},
						error: (error) => {
							// MessageBox.error("Failed to fetch data from the server.");
						}
					});
				}).catch((error) => {
					MessageBox.error("Failed to obtain access token.");
				});
			}


		},
		Onclose: function () {
			// 1. Get the model
			const oModel = this.getView().getModel("bpdetailmodel");
			// 2. Clear the /items data
			if (oModel && oModel.getProperty("/items")) {
				oModel.setProperty("/items", []);  // Clear data
			}
			this.getView().getModel("view").setProperty("/rowcount1", 0);
			// 3. Reset any selection (optional)
			const oTable = this.byId("bpid");
			if (oTable) {
				oTable.removeSelections();  // Remove selected rows
			}
			// 4. Close the dialog
			const oDialog = this.byId("bpdialog");
			if (oDialog) {
				oDialog.close();
			}
		},

		OnConfirm: function (oEvent) {
			var that = this;
			//new code start for multiple Bussiness Partners

			const bpModel = that.getView().getModel("bpdetailmodel");
			if (bpModel && bpModel.oData && Array.isArray(bpModel.oData.items)) {
				// const bpNumbers = bpModel.oData.items.map(item => item.BpNumber.replace(/^0+/, ''));
				const bpNumbers = bpModel.oData.items.map(item => item.BpNumber);

				// Remove duplicates by converting to a Set
				AMLChangeRecords.BussinessPartners = [...new Set(bpNumbers)];

				if (AMLChangeRecords.BussinessPartners.length > 0) {
					that.getView().setBusy(true);
					that.amlupdateSQLquery();
				}
			}
		},
		onExportToExcel: function () {
			const oTable = this.byId("bpid");
			const oDialog = this.byId("bpdialog");

			oDialog.setBusy(true); // Show busy state during export 
			const aCols = [
				{ label: "Business Partner ID", property: "BpNumber", type: "string" },
				{ label: "Business Partner Name", property: "BpName" },
				{
					label: "Industry Code",
					property: "IndustryCodes",
					type: "string",
					formatter: function (value) {
						// Option A: Show just the code (preserve formatting)
						return "'" + value;

						// Option B: Show code + description (uncomment below)
						// const sDesc = oIndustryCodeMap[value] || "";
						// return "'" + value + (sDesc ? " - " + sDesc : "");
					}
				},
				{ label: "Compliance Risk", property: "ComplianceRisk" },
				{ label: "Beneficial Owner Risk", property: "BoOwnerRisk" },
				{ label: "Country Code", property: "CountryKey", type: "string" },
				{ label: "Country Description", property: "CountryDescr" },
				{ label: "Customer Subtype", property: "CustomerSubtype", type: "string" }
			];

			const oModel = this.getView().getModel("bpdetailmodel");
			const aData = oModel.getProperty("/items");
			var oBinding = oTable.getBinding("items");
			// Ensure all contexts are fetched
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aCols
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "BusinessPartners.xlsx",
				worker: false
			});

			// oExport.build().then(function () {
			// 	sap.m.MessageToast.show("Export complete");
			// }).catch(function (oError) {
			// 	sap.m.MessageBox.error("Export failed: " + oError.message);
			// });
			// const oSettings = {
			// 	workbook: {
			// 		columns: aCols
			// 	},
			// 	dataSource: aData,
			// 	fileName: "BusinessPartners.xlsx"
			// };

			// new sap.ui.export.Spreadsheet(oExport)
			// 	.build()
			// 	.finally(() => {
			// 		oDialog.setBusy(false);
			// 	});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
				oDialog.setBusy(false);
			}).catch(function (oError) {
				oDialog.setBusy(false);
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		}

	});
});
