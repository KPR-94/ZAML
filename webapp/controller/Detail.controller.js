sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"zaml/model/formatter",
	"sap/ushell/services/UserInfo",
	"sap/ui/core/BusyIndicator",
	"sap/ui/Device",
	"sap/ui/export/Spreadsheet",
	"sap/ui/export/library",
	"sap/ui/model/resource/ResourceModel"
], (Controller, History, MessageToast, JSONModel, MessageBox, formatter, UserInfo, BusyIndicator, Device, Spreadsheet, library, ResourceModel
) => {
	"use strict";
	var updateTablename; const now = new Date(); const globaldate = now.toISOString().split('T')[0];
	var count = 2;
	return Controller.extend("zaml.controller.Detail", {
		formatter: formatter,  // <-- Attach the formatter
		onInit() {
			// Pramod
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
			//new code 
			this.oOriginalData = [];
			this.finalsqlQuery = 0;
			// let oModel = new sap.ui.model.json.JSONModel();
			// let oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			// let systemid = oModel.getProperty("/system");
			// let client = oModel.getProperty("/client");
		},

		onObjectMatched(oEvent) {
			const oViewModel = new JSONModel({
				currency: "EUR",
				Indsurtycount: 0,
				Visiblecount: 0,
				HistoryCount: 0
			});
			this.getView().setModel(oViewModel, "view");
			var oArguments = oEvent.getParameter("arguments");
			this._sObjectId = parseInt(oArguments.objectId);
			this.onCustomizing();
		},

		onCustomizing() {
			var tablename;
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				const oTable = this.byId("p3_Industry");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
					col.setSorted(false);
				});
				this.byId("p3_Industry").setVisible(true);
				this.byId("p3_Industry").setBusy(true);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("page3").setTitle("Industry Hierarchy ");
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("searchIndustryId").setValue("");
				tablename = 'Industry_Hierarchy';
				updateTablename = tablename;
				this.fetchData(tablename);

			}

			if (window.globalVariable === 2 || this._sObjectId === 2) {
				const oTable = this.byId("p3_Customer_subtype");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(true);
				this.byId("p3_Customer_subtype").setBusy(true);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("page3").setTitle("Customer Type");
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("searchcustsubtype").setValue("");
				tablename = 'Customer_Subtype';
				updateTablename = tablename;
				this.fetchData(tablename);

			}

			if (window.globalVariable === 3 || this._sObjectId === 3) {
				const oTable = this.byId("p3_Country");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setBusy(true);
				this.byId("p3_Country").setVisible(true);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("page3").setTitle("Country");
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("searchCountry").setValue("");
				tablename = 'Country';
				updateTablename = tablename;
				this.fetchData(tablename);
			}
			if (window.globalVariable === 4 || this._sObjectId === 4) {
				const oTable = this.byId("p3_Country");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(true);
				// this.byId("p3_Industry_hierarchy").setBusy(true);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("page3").setTitle("Country Hierarchy");
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);

			}

			if (window.globalVariable === 5 || this._sObjectId === 5) {
				const oTable = this.byId("p3_Riskweightage");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(true);
				this.byId("p3_Riskweightage").setBusy(true);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("page3").setTitle("Risk Weightage");
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("searchriskweightage").setValue("");
				tablename = 'Risk_Weightage';
				updateTablename = tablename;
				this.fetchData(tablename);

			}

			if (window.globalVariable === 6 || this._sObjectId === 6) {
				const oTable = this.byId("p3_RiskValue");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(true);
				this.byId("p3_RiskValue").setBusy(true);
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("page3").setTitle("Risk Value");
				this.byId("searchRiskValue").setValue("");
				tablename = 'Risk_Value';
				updateTablename = tablename;
				this.fetchData(tablename);
			}
			if (window.globalVariable === 7 || this._sObjectId === 7) {
				const oTable = this.byId("P3_RiskValueRange");
				// Clear filter on binding 
				oTable.getColumns().forEach((col) => {
					col.setFiltered(false);
					col.setFilterValue("");
				});
				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("P3_RiskValueRange").setVisible(true);
				this.byId("P3_RiskValueRange").setBusy(true);
				// this.byId("p2_Business_Partner_data").setVisible(false);
				this.byId("page3").setTitle("Risk Value Range");
				this.byId("searchRiskValueRange").setValue("");
				tablename = 'Risk_Value_Range';
				updateTablename = tablename;
				this.fetchData(tablename);
			}

			if (window.globalVariable === 8 || this._sObjectId === 8) {

				this.byId("p3_Industry").setVisible(false);
				this.byId("p3_Customer_subtype").setVisible(false);
				this.byId("p3_Country").setVisible(false);
				// this.byId("p3_Industry_hierarchy").setVisible(false);
				this.byId("p3_Riskweightage").setVisible(false);
				this.byId("p3_RiskValue").setVisible(false);
				this.byId("P3_RiskValueRange").setVisible(false);
				// this.byId("p2_Business_Partner_data").setVisible(true);
				// this.byId("p2_Business_Partner_data").setBusy(true);
				this.byId("page3").setTitle("Business Partner Data");

			}
		},

		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined || sPreviousHash === "") {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				// oRouter.navTo("overview", {}, true);
				oRouter.navTo("customize", {}, true);
			}
		},


		onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value");
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
		},

		//new code start 

		getAccessToken: function () {

			const tokenUrl = 'https://chg-meridian-dev-qa-5gwjbubw.authentication.eu20.hana.ondemand.com/oauth/token';
			// const clientId = 'sb-1b807827-5cef-4be7-a28f-a5cd04937a57!b64479|it-rt-chg-meridian-dev-qa-5gwjbubw!b18631';
			// const clientSecret = '589a2f4c-bf3c-4481-8402-92b0943a09ba$_e-GrL4Ve9hLn1637qzrLuptGCz-XwjwOR4vKdzHTHA=';


			// const TOKEN_URL = 'https://chg-meridian-dev-qa-5gwjbubw.authentication.eu20.hana.ondemand.com/oauth/token';
			const clientId = 'sb-ec1b7c71-fc1a-4482-80ed-11d22a81be2f!b64479|it-rt-chg-meridian-dev-qa-5gwjbubw!b18631'
			const clientSecret = '1e90e551-c183-42d2-844c-9a85010019a3$vUY618ctdWUYiED_MUmJeZr5zN1ZBoeXg-l4AQ4voYQ=';

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

		fetchData: function (tablename) {
			var tablename = tablename;
			var that = this;
			let dquery;
			dquery = `SELECT * FROM ${tablename}`;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
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
				const query = dquery; // `SELECT * FROM ${tablename}`;
				jQuery.ajax({
					// url: apiUrl,
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
						that.byId("p3_Industry").setBusy(false);
						that.byId("p3_Customer_subtype").setBusy(false);
						that.byId("p3_Country").setBusy(false);
						that.byId("p3_Riskweightage").setBusy(false);
						that.byId("p3_RiskValue").setBusy(false);
						that.byId("P3_RiskValueRange").setBusy(false);
						// new code 
						window.globalVariable === 1
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
						if (rowData[0] != undefined) {
							// Industry code hierarcy
							if (window.globalVariable === 1 || that._sObjectId === 1) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.editableRisk = false;
									value.editableParent = false;
									value.editablelevel = false;
									value.isSelected = false;
									value.editableIndustry_desc = false;


									if (value.Industry_description === "undefined") {
										value.Industry_description = "";
									}

									if (
										value.Industry_code &&
										typeof value.Industry_code === "object" &&
										Object.keys(value.Industry_code).length === 0
									) {
										value.Industry_code = ""; // or " " if you prefer a space
									}

									if (
										value.Industry_description &&
										typeof value.Industry_description === "object" &&
										Object.keys(value.Industry_description).length === 0
									) {
										value.Industry_description = ""; // or " " if you prefer a space
									}

									if (
										value.Level &&
										typeof value.Level === "object" &&
										Object.keys(value.Level).length === 0
									) {
										value.Level = ""; // or " " if you prefer a space
									}

									if (
										value.Risk_Level &&
										typeof value.Risk_Level === "object" &&
										Object.keys(value.Risk_Level).length === 0
									) {
										value.Risk_Level = ""; // or " " if you prefer a space
									}
									if (
										value.Level &&
										typeof value.Level === "object" &&
										Object.keys(value.Level).length === 0
									) {
										value.Level = ""; // or " " if you prefer a space
									}
									if (
										value.Parent &&
										typeof value.Parent === "object" &&
										Object.keys(value.Parent).length === 0
									) {
										value.Parent = ""; // or " " if you prefer a space
									}
									if (
										value.Category_type &&
										typeof value.Category_type === "object" &&
										Object.keys(value.Category_type).length === 0
									) {
										value.Category_type = ""; // or " " if you prefer a space
									}
									if (
										value.Created_by &&
										typeof value.Created_by === "object" &&
										Object.keys(value.Created_by).length === 0
									) {
										value.Created_by = ""; // or " " if you prefer a space
									}
									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}
									if (
										value.Created_on &&
										typeof value.Created_on === "object" &&
										Object.keys(value.Created_on).length === 0
									) {
										value.Created_on = ""; // or " " if you prefer a space
									}
									if (value.Created_on === "1900-01-01") {
										value.Created_on = "";
									}
									if (value.Updated_on === "1900-01-01") {
										value.Updated_on = "";
									}
									if (
										value.Updated_on &&
										typeof value.Updated_on === "object" &&
										Object.keys(value.Updated_on).length === 0
									) {
										value.Updated_on = ""; // or " " if you prefer a space
									}
									if (!isNaN(new Date(value.Created_on).getTime())) {
										value.Created_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_on))
									}

									if (!isNaN(new Date(value.Updated_on))) {
										value.Updated_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_on));
									}


								});

								rowData = that.sortByIndustryCode(rowData);
							}
							// Customer_subtype
							if (window.globalVariable === 2 || that._sObjectId === 2) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.isSelected = false;
									if (
										value.Customer_subtype &&
										typeof value.Customer_subtype === "object" &&
										Object.keys(value.Customer_subtype).length === 0
									) {
										value.Customer_subtype = ""; // or " " if you prefer a space
									}

									if (
										value.Description &&
										typeof value.Description === "object" &&
										Object.keys(value.Description).length === 0
									) {
										value.Description = ""; // or " " if you prefer a space
									}

									if (
										value.Risk_level &&
										typeof value.Risk_level === "object" &&
										Object.keys(value.Risk_level).length === 0
									) {
										value.Risk_level = ""; // or " " if you prefer a space
									}
									if (
										value.Created_By &&
										typeof value.Created_By === "object" &&
										Object.keys(value.Created_By).length === 0
									) {
										value.Created_By = ""; // or " " if you prefer a space
									}
									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}

									if (
										value.Created_On &&
										typeof value.Created_On === "object" &&
										Object.keys(value.Created_On).length === 0
									) {
										value.Created_On = ""; // or " " if you prefer a space
									}
									if (value.Created_On === "1900-01-01") {
										value.Created_On = "";
									}
									if (value.Updated_On === "1900-01-01") {
										value.Updated_On = "";
									}

									if (
										value.Updated_On &&
										typeof value.Updated_On === "object" &&
										Object.keys(value.Updated_On).length === 0
									) {
										value.Updated_On = ""; // or " " if you prefer a space
									}

									if (!isNaN(new Date(value.Created_On).getTime())) {
										value.Created_On = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_On))
									}

									if (!isNaN(new Date(value.Updated_On))) {
										value.Updated_On = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_On));
									}
								});
							}
							// Country code
							if (window.globalVariable === 3 || that._sObjectId === 3) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.isSelected = false;
									if (
										value.Country_code &&
										typeof value.Country_code === "object" &&
										Object.keys(value.Country_code).length === 0
									) {
										value.Country_code = ""; // or " " if you prefer a space
									}

									if (
										value.Country_description &&
										typeof value.Country_description === "object" &&
										Object.keys(value.Country_description).length === 0
									) {
										value.Country_description = ""; // or " " if you prefer a space
									}

									if (
										value.Risk_level &&
										typeof value.Risk_level === "object" &&
										Object.keys(value.Risk_level).length === 0
									) {
										value.Risk_level = ""; // or " " if you prefer a space
									}

									if (
										value.Created_by &&
										typeof value.Created_by === "object" &&
										Object.keys(value.Created_by).length === 0
									) {
										value.Created_by = ""; // or " " if you prefer a space
									}

									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}

									if (
										value.Created_on &&
										typeof value.Created_on === "object" &&
										Object.keys(value.Created_on).length === 0
									) {
										value.Created_on = ""; // or " " if you prefer a space
									}

									if (value.Created_on === "1900-01-01") {
										value.Created_on = "";
									}
									if (value.Updated_on === "1900-01-01") {
										value.Updated_on = "";
									}

									if (
										value.Updated_on &&
										typeof value.Updated_on === "object" &&
										Object.keys(value.Updated_on).length === 0
									) {
										value.Updated_on = ""; // or " " if you prefer a space
									}

									if (!isNaN(new Date(value.Created_on).getTime())) {
										value.Created_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_on))
									}

									if (!isNaN(new Date(value.Updated_on))) {
										value.Updated_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_on));
									}


								});
							}
							// Risk field weightage
							if (window.globalVariable === 5 || that._sObjectId === 5) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.isSelected = false;
									if (
										value.Risk_field &&
										typeof value.Risk_field === "object" &&
										Object.keys(value.Risk_field).length === 0
									) {
										value.Risk_field = ""; // or " " if you prefer a space
									}

									if (
										value.Weightage &&
										typeof value.Weightage === "object" &&
										Object.keys(value.Weightage).length === 0
									) {
										value.Weightage = ""; // or " " if you prefer a space
									}

									if (
										value.Created_by &&
										typeof value.Created_by === "object" &&
										Object.keys(value.Created_by).length === 0
									) {
										value.Created_by = ""; // or " " if you prefer a space
									}

									if (
										value.Created_on &&
										typeof value.Created_on === "object" &&
										Object.keys(value.Created_on).length === 0
									) {
										value.Created_on = ""; // or " " if you prefer a space
									}

									if (value.Created_on === "1900-01-01") {
										value.Created_on = "";
									}
									if (value.Updated_on === "1900-01-01") {
										value.Updated_on = "";
									}

									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}
									if (
										value.Updated_on &&
										typeof value.Updated_on === "object" &&
										Object.keys(value.Updated_on).length === 0
									) {
										value.Updated_on = ""; // or " " if you prefer a space
									}

									if (!isNaN(new Date(value.Created_on).getTime())) {
										value.Created_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_on))
									}

									if (!isNaN(new Date(value.Updated_on))) {
										value.Updated_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_on));
									}

								});
							}
							// Risk Value
							if (window.globalVariable === 6 || that._sObjectId === 6) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.isSelected = false;
									if (
										value.Risk &&
										typeof value.Risk === "object" &&
										Object.keys(value.Risk).length === 0
									) {
										value.Risk = ""; // or " " if you prefer a space
									}

									if (
										value.Value &&
										typeof value.Value === "object" &&
										Object.keys(value.Value).length === 0
									) {
										value.Value = ""; // or " " if you prefer a space
									}

									if (
										value.Created_by &&
										typeof value.Created_by === "object" &&
										Object.keys(value.Created_by).length === 0
									) {
										value.Created_by = ""; // or " " if you prefer a space
									}

									if (
										value.Created_on &&
										typeof value.Created_on === "object" &&
										Object.keys(value.Created_on).length === 0
									) {
										value.Created_on = ""; // or " " if you prefer a space
									}

									if (value.Created_on === "1900-01-01") {
										value.Created_on = "";
									}
									if (value.Updated_on === "1900-01-01") {
										value.Updated_on = "";
									}

									if (
										value.Updated_on &&
										typeof value.Updated_on === "object" &&
										Object.keys(value.Updated_on).length === 0
									) {
										value.Updated_on = ""; // or " " if you prefer a space
									}

									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}

									if (!isNaN(new Date(value.Created_on).getTime())) {
										value.Created_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_on))
									}

									if (!isNaN(new Date(value.Updated_on))) {
										value.Updated_on = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_on));
									}

								});
							}
							//Risk Value Range
							if (window.globalVariable === 7 || that._sObjectId === 7) {

								Object.entries(rowData).forEach(([key, value]) => {
									value.isSelected = false;
									if (
										value.AML_Risk_Value_Low &&
										typeof value.AML_Risk_Value_Low === "object" &&
										Object.keys(value.AML_Risk_Value_Low).length === 0
									) {
										value.AML_Risk_Value_Low = ""; // or " " if you prefer a space
									}

									if (
										value.AML_Risk_Value_High &&
										typeof value.AML_Risk_Value_High === "object" &&
										Object.keys(value.AML_Risk_Value_High).length === 0
									) {
										value.AML_Risk_Value_High = ""; // or " " if you prefer a space
									}

									if (
										value.AML_Risk &&
										typeof value.AML_Risk === "object" &&
										Object.keys(value.AML_Risk).length === 0
									) {
										value.AML_Risk = ""; // or " " if you prefer a space
									}

									if (
										value.Created_By &&
										typeof value.Created_By === "object" &&
										Object.keys(value.Created_By).length === 0
									) {
										value.Created_By = ""; // or " " if you prefer a space
									}

									if (
										value.Created_On &&
										typeof value.Created_On === "object" &&
										Object.keys(value.Created_On).length === 0
									) {
										value.Created_On = ""; // or " " if you prefer a space
									}

									if (value.Created_On === "1900-01-01") {
										value.Created_On = "";
									}
									if (value.Updated_On === "1900-01-01") {
										value.Updated_On = "";
									}
									if (
										value.Updated_by &&
										typeof value.Updated_by === "object" &&
										Object.keys(value.Updated_by).length === 0
									) {
										value.Updated_by = ""; // or " " if you prefer a space
									}
									if (
										value.Updated_On &&
										typeof value.Updated_On === "object" &&
										Object.keys(value.Updated_On).length === 0
									) {
										value.Updated_On = ""; // or " " if you prefer a space
									}

									if (!isNaN(new Date(value.Created_On).getTime())) {
										value.Created_On = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Created_On))
									}

									if (!isNaN(new Date(value.Updated_On))) {
										value.Updated_On = sap.ui.core.format.DateFormat.getDateInstance({
											pattern: "dd.MM.yyyy"
										}).format(new Date(value.Updated_On));
									}
								});
							}

						}
						// Create JSON Model
						let oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({ rows: rowData });

						// Set Model to View
						if (tablename === 'UpdateHistory') {
							that.getView().setModel(oModel, "HistoryModel");
						}
						else {
							that.getView().setModel(oModel, "tableModel");
							if (rowData.length > 10) {
								that.getView().getModel("view").setProperty("/Visiblecount", 10);
								that.getView().getModel("view").setProperty("/Indsurtycount", rowData.length)
							} else {
								that.getView().getModel("view").setProperty("/Visiblecount", rowData.length);
								that.getView().getModel("view").setProperty("/Indsurtycount", rowData.length)
							}

							// default row selection and enabled 
							var oTable = this.getView().byId("p3_Industry");
							var oModelen = this.getView().getModel("tableModel");
							var aItems = oTable.getBinding("rows");
							var aRows = oModelen.getProperty("/rows") || [];

							// Reset all to not editable
							if (aRows[0] !== undefined) {
								aRows.forEach(row => row.editable = false);
							}

							oModelen.refresh(true);
							this.byId("Bdelete").setEnabled(false);
							this.byId("Bupdate").setEnabled(false);
							this.byId("idUpdateHistory").setEnabled(true);

							// code end here 
						}
						that.oOriginalData = JSON.parse(JSON.stringify(that.getView().getModel("tableModel").getData())); // Deep copy original data

						//that.getJson(Response);
					},
					error: (error) => {
						that.byId("p3_Industry").setBusy(false);
						that.byId("p3_Customer_subtype").setBusy(false);
						that.byId("p3_Country").setBusy(false);
						that.byId("p3_Riskweightage").setBusy(false);
						that.byId("p3_RiskValue").setBusy(false);
						that.byId("P3_RiskValueRange").setBusy(false);
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				MessageBox.error("Failed to obtain access token.");
			});
		},
		sortByIndustryCode: function (data) {
			return [...data].sort((a, b) => {
				const aParts = a.Industry_code.split('.').map(Number);
				const bParts = b.Industry_code.split('.').map(Number);

				const maxLength = Math.max(aParts.length, bParts.length);

				for (let i = 0; i < maxLength; i++) {
					const aVal = aParts[i] ?? 0;
					const bVal = bParts[i] ?? 0;

					if (aVal !== bVal) {
						return aVal - bVal;
					}
				}

				return 0;
			});
		},

		fetchHistoryData: function (tablename) {
			var tablename = tablename;
			var that = this;
			let dquery;
			dquery = `SELECT * FROM ${tablename}`;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
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
						that.byId("p3_Industry").setBusy(false);
						that.byId("p3_Customer_subtype").setBusy(false);
						that.byId("p3_Country").setBusy(false);
						that.byId("p3_Riskweightage").setBusy(false);
						that.byId("p3_RiskValue").setBusy(false);
						that.byId("P3_RiskValueRange").setBusy(false);
						// new code 
						window.globalVariable === 1
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

						} else {
							rowData.sort((a, b) => {
								const todayStr = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

								const getValidTime = (dateStr) => {
									const date = new Date(dateStr);
									return isNaN(date) ? null : date.getTime();
								};

								const isToday = (dateStr) => {
									if (!dateStr) return false;
									return dateStr.startsWith(todayStr);
								};

								const createdA = getValidTime(a.Created_On);
								const createdB = getValidTime(b.Created_On);
								const updatedA = getValidTime(a.Updated_On);
								const updatedB = getValidTime(b.Updated_On);

								const createdIsTodayA = isToday(a.Created_On);
								const createdIsTodayB = isToday(b.Created_On);

								const updatedIsValidA = updatedA !== null;
								const updatedIsValidB = updatedB !== null;

								const createdUpdatedDifferentA = createdA !== updatedA;
								const createdUpdatedDifferentB = createdB !== updatedB;

								// ✅ Rule 1 & 2: Created today & Updated blank or different → sort by Created_On descending
								if (createdIsTodayA && (!updatedIsValidA || createdUpdatedDifferentA) &&
									!(createdIsTodayB && (!updatedIsValidB || createdUpdatedDifferentB))) {
									return -1; // A comes first
								}
								if (createdIsTodayB && (!updatedIsValidB || createdUpdatedDifferentB) &&
									!(createdIsTodayA && (!updatedIsValidA || createdUpdatedDifferentA))) {
									return 1; // B comes first
								}

								// ✅ Rule 3: Sort by Updated_On if valid
								if (updatedIsValidA && updatedIsValidB) {
									if (updatedA !== updatedB) {
										return updatedB - updatedA; // Descending
									}
								}

								// ✅ Fallback: Sort by Created_On
								if (createdA !== null && createdB !== null) {
									return createdB - createdA; // Descending
								}

								return 0;
							});

							// rowData.sort((a, b) => {
							// 	const createdA = new Date(a.Created_On);
							// 	const createdB = new Date(b.Created_On);
							// 	const updatedA = new Date(a.Updated_On);
							// 	const updatedB = new Date(b.Updated_On);

							// 	const createdTimeA = createdA.getTime();
							// 	const createdTimeB = createdB.getTime();
							// 	const updatedTimeA = updatedA.getTime();
							// 	const updatedTimeB = updatedB.getTime();

							// 	const isValidDate = (d) => d instanceof Date && !isNaN(d);

							// 	const createdValidA = isValidDate(createdA);
							// 	const createdValidB = isValidDate(createdB);
							// 	const updatedValidA = isValidDate(updatedA);
							// 	const updatedValidB = isValidDate(updatedB);

							// 	// 🆕 Priority Rule: If Updated_On is invalid, sort by Created_On descending
							// 	if (!updatedValidA && updatedValidB) {
							// 		return 1; // b has valid updated date, a doesn't → b comes first
							// 	} else if (updatedValidA && !updatedValidB) {
							// 		return -1; // a has valid updated date, b doesn't → a comes first
							// 	} else if (!updatedValidA && !updatedValidB) {
							// 		// Both updated dates invalid → compare created dates
							// 		if (createdValidA && createdValidB) {
							// 			return createdTimeB - createdTimeA;
							// 		} else if (createdValidA && !createdValidB) {
							// 			return -1;
							// 		} else if (!createdValidA && createdValidB) {
							// 			return 1;
							// 		}
							// 		return 0;
							// 	}

							// 	// ✅ If we get here, both updated dates are valid

							// 	// Prefer Updated_On descending if different
							// 	if (updatedTimeA !== updatedTimeB) {
							// 		return updatedTimeB - updatedTimeA;
							// 	}

							// 	// If Updated_On is same, fallback to Created_On descending
							// 	if (createdValidA && createdValidB) {
							// 		if (createdTimeA !== createdTimeB) {
							// 			return createdTimeB - createdTimeA;
							// 		}
							// 	} else if (createdValidA && !createdValidB) {
							// 		return -1;
							// 	} else if (!createdValidA && createdValidB) {
							// 		return 1;
							// 	}

							// 	return 0;
							// }); 

							//   rowData.sort((a, b) => { 
							// 	const dateA = new Date(a.Updated_On);
							// 	const dateB = new Date(b.Updated_On);
							// 	return dateB - dateA; // Descending (newest first)
							// });

							Object.entries(rowData).forEach(([key, value]) => {
								if (value.Created_On.split(" ")[0] === "1900-01-01") {
									value.Created_On = "";
								}
								if (value.Updated_On.split(" ")[0] === "1900-01-01") {
									value.Updated_On = "";
								}
								if (!isNaN(new Date(value.Created_On).getTime())) {
									value.Created_On = sap.ui.core.format.DateFormat.getDateInstance({
										pattern: "dd.MM.yyyy"
									}).format(new Date(value.Created_On))
								}

								if (!isNaN(new Date(value.Updated_On))) {
									value.Updated_On = sap.ui.core.format.DateFormat.getDateInstance({
										pattern: "dd.MM.yyyy"
									}).format(new Date(value.Updated_On));
								}


							});
							if (rowData.length > 10) {
								that.getView().getModel("view").setProperty("/HistoryCount", rowData.length)
							} else {
								that.getView().getModel("view").setProperty("/HistoryCount", rowData.length);
							}
						}



						// Create JSON Model
						let oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({ rows: rowData });
						that.getView().setModel(oModel, "HistoryModel");
					},
					error: (error) => {
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
		//Code to edit Table  
		onEditIndustry: function (oEvent) {
			var oSelectedRadio = oEvent.getSource();
			var oContext = oSelectedRadio.getBindingContext("tableModel");
			var sPath = oContext.getPath(); // e.g., "/rows/1"

			var oModel = this.getView().getModel("tableModel");
			var aRows = oModel.getProperty("/rows") || [];

			// Reset selection and editable flags on all rows
			aRows.forEach(function (row) {
				row.isSelected = false;
				row.editable = false;
				row.editableRisk = false;
				row.editableParent = false;
				row.editablelevel = false;
				row.editableIndustry_desc = false;
			});

			// Mark current row as selected
			var oSelectedRow = oModel.getProperty(sPath);
			oSelectedRow.isSelected = true;
			oSelectedRow.editable = true;

			// Apply custom editability logic
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				if (oSelectedRow.Risk_Level === "" && oSelectedRow.Level !== "5") {
					if (oSelectedRow.Level !== "1") {
						oSelectedRow.editableRisk = false;
						oSelectedRow.editableParent = true;
						oSelectedRow.editablelevel = true;
						oSelectedRow.editableIndustry_desc = true;
					} else {
						oSelectedRow.editableRisk = false;
						oSelectedRow.editableParent = false;
						oSelectedRow.editablelevel = true;
						oSelectedRow.editableIndustry_desc = true; // Provide an edit option for Level 1
					}
				} else if (oSelectedRow.Category_type === "NAICS" && oSelectedRow.Level === "5") {
					oSelectedRow.editableRisk = true;
					oSelectedRow.editableParent = false;
					oSelectedRow.editablelevel = false;
					oSelectedRow.editableIndustry_desc = false;
				} else {
					oSelectedRow.editableRisk = true;
					oSelectedRow.editableParent = true;
					oSelectedRow.editablelevel = true;
					oSelectedRow.editableIndustry_desc = true;
				}
			}

			// Update model with changes
			oModel.setProperty("/rows", aRows);

			// Enable relevant buttons
			this.byId("Bdelete").setEnabled(true);
			this.byId("Bupdate").setEnabled(true);
			this.byId("idUpdateHistory").setEnabled(true);
		},

		onEditIndustry1: function (oEvent) {
			var oModel = this.getView().getModel("tableModel");

			// Get the selected item
			var oSelectedItem = oEvent.mParameters.listItems[0];
			if (!oSelectedItem) {
				return;
			}

			// Get binding context and row path
			var oContext = oSelectedItem.getBindingContext("tableModel");
			var sPath = oContext.getPath();

			// Reset 'editable' on all rows
			var aRows = oModel.getProperty("/rows") || [];
			aRows.forEach(row => {
				row.editable = false;
				row.editableRisk = false;
				row.editableParent = false;
				row.editablelevel = false;
				row.editableIndustry_desc = false;
			});

			// Set selected row as editable
			var oSelectedRow = oModel.getProperty(sPath);
			oSelectedRow.editable = true;
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				// aRows.forEach(row => row.editableRisk = false);
				if (oSelectedRow.Risk_Level === "" && oSelectedRow.Level !== "5") {
					if (oSelectedRow.Level !== "1") {
						oSelectedRow.editableRisk = false;
						oSelectedRow.editableParent = true;
						oSelectedRow.editablelevel = true;
						oSelectedRow.editableIndustry_desc = true;
					} else {
						oSelectedRow.editableRisk = false;
						oSelectedRow.editableParent = false;
						oSelectedRow.editablelevel = true;
						oSelectedRow.editableIndustry_desc = false;
					}

				} else if (oSelectedRow.Category_type === "NAICS" && oSelectedRow.Level === "5") {
					oSelectedRow.editableRisk = true;
					oSelectedRow.editableParent = false;
					oSelectedRow.editablelevel = false;
					oSelectedRow.editableIndustry_desc = false;
				} else {
					oSelectedRow.editableRisk = true;
					oSelectedRow.editableParent = true;
					oSelectedRow.editablelevel = true;
					oSelectedRow.editableIndustry_desc = true;
				}
			}
			// Update model
			oModel.setProperty("/rows", aRows);
			this.byId("Bdelete").setEnabled(true);
			this.byId("Bupdate").setEnabled(true);
			this.byId("idUpdateHistory").setEnabled(true);

		},
		//End Code to edit Table
		enableedit: function () {
			this.byId("p3_Industry").setEnabled(true);
		},
		updatequery: function () {
			let tablename, tablehistoryname;
			let query, querystep1, queryhistory;
			let oTable;
			let oSelectedItem;
			let oContext;
			let oSelectedRowData;
			let tablenameCNG, createdOnt1;
			let userInfo, UserId;
			var oData = "";
			let aRows;
			let formattedDate;
			if (this.getView().byId("p3_Industry").getModel("tableModel") !== undefined) {
				oData = this.getView().byId("p3_Industry").getModel("tableModel").oData.rows;
			}

			// Fetching User details
			if (sap.ushell.Container) {
				userInfo = sap.ushell.Container.getService("UserInfo");
				UserId = userInfo.getId();
			} else {
				UserId = "KPR";
			}
			for (var i = 1; i < 3; i++) {
				if (i == 1) {
					// Determine table name based on your global flag
					if (window.globalVariable === 1 || this._sObjectId === 1) {
						tablename = 'Industry_Hierarchy';
						var flag = true;

						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);

						if (typeof oSelectedRowData.Created_by === "object") {
							oSelectedRowData.Created_by = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}

						createdOnt1 = oSelectedRowData.Created_on;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}
						if (
							createdOnt1 === null ||
							createdOnt1 === undefined ||
							createdOnt1 === '' ||
							(Array.isArray(createdOnt1) && createdOnt1.length === 0) ||
							(typeof createdOnt1 === 'object' && Object.keys(createdOnt1).length === 0)
						) {

							// createdOnt1 = globaldate;
						}


						if (oSelectedRowData.Level === "5" && oSelectedRowData.Risk_Level === "") {
							MessageBox.error("Please select Risk level");
							return;
						}
						if (oSelectedRowData.Level === "2" || oSelectedRowData.Level === "3" || oSelectedRowData.Level === "4" || oSelectedRowData.Level === "5") {
							if (oSelectedRowData.Parent === oSelectedRowData.Industry_code) {
								MessageBox.error("Same industry code can't be assigned to the same parent field");
								return;
							}
						}
						// Checking Industry is available.then We can not create same record again.
						if (oSelectedRowData.Category_type === "NACE") {
							if (oSelectedRowData.Level !== "1") {
								if (oData[0] !== undefined) {
									oData.forEach((each) => {
										if (each.Industry_code === oSelectedRowData.Parent) {
											flag = false;
										}

									});
									if (flag) {
										MessageBox.error("Parent is missing, or the same industry code cannot be assigned to the same parent field");
										return;
									}

								}
								if (oSelectedRowData.Industry_description.trim() === "") {
									MessageBox.error("Please provide Industry description");
									return;
								}
							}

						}

						if (oSelectedRowData.Category_type === "NAICS" && oSelectedRowData.Risk_Level === "") {
							MessageBox.error("Please select Risk value");
							return;
						}
						if (oSelectedRowData.Category_type === "NAICS" && oSelectedRowData.Industry_description.trim() === "") {
							MessageBox.error("Please provide Industry description");
							return;
						}

						// Build SQL update query
						query = `UPDATE "${tablename}"
						SET 
						"Category type" = '${oSelectedRowData.Category_type}',
						"Created by" =  '${oSelectedRowData.Created_by}',
						"Created on" = '${formattedDate}',
						"Industry code" = '${oSelectedRowData.Industry_code}',
						"Industry description" = '${oSelectedRowData.Industry_description}',
						"Level" = '${oSelectedRowData.Level}',
						"Parent" = '${oSelectedRowData.Parent}',
						"Risk Level" = '${oSelectedRowData.Risk_Level}',
						"Updated by" = '${UserId}',
						"Updated on" = '${globaldate}'  
						WHERE "Industry code" = '${oSelectedRowData.Industry_code}';`;
						//Logic for Automation 

						// querystep1 = `UPDATE "AMLChangeLog"
						// SET 
						// "TableName" = '${tablename}',
						// "FName" = 'Industry_code',
						// "FValue" = '${oSelectedRowData.Industry_code}',
						// "date" ='${globaldate}'  
						// WHERE "TableName" = '${tablename}';`;
						querystep1 = `INSERT INTO "AMLChangeLog" (
									[TableName], [FName], [FValue],[date] ) VALUES (
							       '${tablename}','${oSelectedRowData.Industry_description}','${oSelectedRowData.Industry_code}',
												'${globaldate}'
											);`;

						// Update Industry History table
						tablehistoryname = "Industry_History";

						queryhistory = `INSERT INTO Industry_History 
								([Industry_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Industry_description]
								,[Level],[Risk_Level],[Parent],[Category_type]) 
								VALUES ('${oSelectedRowData.Industry_code}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.Industry_description}',
								'${oSelectedRowData.Level}',
								'${oSelectedRowData.Risk_Level}',
								'${oSelectedRowData.Parent}',
								'${oSelectedRowData.Category_type}');`;


					} else if (window.globalVariable === 2 || this._sObjectId === 2) {
						tablename = 'Customer_Subtype';
						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);

						if (typeof oSelectedRowData.Created_By === "object") {
							oSelectedRowData.Created_By = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}

						createdOnt1 = oSelectedRowData.Created_On;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_On.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}
						if (
							createdOnt1 === null ||
							createdOnt1 === undefined ||
							createdOnt1 === '' ||
							(Array.isArray(createdOnt1) && createdOnt1.length === 0) ||
							(typeof createdOnt1 === 'object' && Object.keys(createdOnt1).length === 0)
						) {

							createdOnt1 = globaldate;
						}
						// Build SQL update query
						query = `UPDATE "${tablename}"
						SET 
						"Customer_subtype" = '${oSelectedRowData.Customer_subtype}',
						"Description" = '${oSelectedRowData.Description}',
						"Risk_level" = '${oSelectedRowData.Risk_level}',
						"Created_By" =  '${oSelectedRowData.Created_By}',
						"Created_On" = '${formattedDate}',
						"Updated_by" = '${UserId}',
						"Updated_On" = '${globaldate}'
						WHERE "Customer_subtype" = '${oSelectedRowData.Customer_subtype}';`;

						//Logic for Automation 

						// querystep1 = `UPDATE "AMLChangeLog"
						// SET 
						// "TableName" = '${tablename}',
						// "FName" = 'Customer_subtype',
						// "FValue" = '${oSelectedRowData.Customer_subtype}',
						// "date" = '${globaldate}' 
						// WHERE "TableName" = '${tablename}';`;
						querystep1 = `INSERT INTO "AMLChangeLog" (
									[TableName], [FName], [FValue],[date] ) VALUES (
							       '${tablename}', '${oSelectedRowData.Description}','${oSelectedRowData.Customer_subtype}',
												'${globaldate}'
											);`;
						// Customer Type History
						queryhistory = `INSERT INTO Customer_Type_History 
								([Customer_Type], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Description],
								 [Risk_level]) 
								VALUES ('${oSelectedRowData.Customer_subtype}',				
								'${oSelectedRowData.Created_By}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.Description}',
								'${oSelectedRowData.Risk_level}' );`;
						//Logic end for Automation 
					} else if (window.globalVariable === 3 || this._sObjectId === 3) {
						tablename = 'Country';
						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);
						if (typeof oSelectedRowData.Created_by === "object") {
							oSelectedRowData.Created_by = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}
						let createdOnt1 = oSelectedRowData.Created_on;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}

						// Check for null, undefined, empty string, empty array, or empty object
						if (
							createdOnt1 === null ||
							createdOnt1 === undefined ||
							createdOnt1 === '' ||
							(Array.isArray(createdOnt1) && createdOnt1.length === 0) ||
							(typeof createdOnt1 === 'object' && Object.keys(createdOnt1).length === 0)
						) {
							// createdOnt1 = globaldate;
						}


						// Build SQL update query
						query = `UPDATE "${tablename}"
						SET 
						"Country code" = '${oSelectedRowData.Country_code}',
						"Country description" = '${oSelectedRowData.Country_description}',
						"Risk level" = '${oSelectedRowData.Risk_level}',
						"Created by" = '${oSelectedRowData.Created_by}',
						"Created on" = '${formattedDate}',
						"Updated by" = '${UserId}',
						"Updated on" = '${globaldate}'
						WHERE "Country code" = '${oSelectedRowData.Country_code}';`;

						//Logic for Automation 

						// querystep1 = `UPDATE "AMLChangeLog"
						// SET 
						// "TableName" = '${tablename}',
						// "FName" = 'Country_code',
						// "FValue" = '${oSelectedRowData.Country_code}',
						// "date" = '${globaldate}'	
						// WHERE "TableName" = '${tablename}';`;
						querystep1 = `INSERT INTO "AMLChangeLog" (
									[TableName], [FName], [FValue],[date] ) VALUES (
							       '${tablename}', '${oSelectedRowData.Country_description}','${oSelectedRowData.Country_code}',
												'${globaldate}'
											);`;
						// Country Code History
						tablehistoryname = "Country_History";
						queryhistory = `INSERT INTO Country_History 
								([Country_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Country_decription],
								 [Risk_level]) 
								VALUES ('${oSelectedRowData.Country_code}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.Country_description}',
								'${oSelectedRowData.Risk_level}' );`;
						//Logic end for Automation 
					} else if (window.globalVariable === 5 || this._sObjectId === 5) {
						tablename = 'Risk_Weightage';
						// Get the selected table row 
						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);
						if (typeof oSelectedRowData.Created_by === "object") {
							oSelectedRowData.Created_by = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}

						if (parseFloat(oSelectedRowData.Weightage) >= 100) {
							MessageBox.error("Weightage value can't exceed more than 100");
							return;
						}

						//Calculate overall weightage % and it should not be more than 100.
						var totalweightage = 0;
						oData.forEach((each) => {
							totalweightage = totalweightage + parseFloat(each.Weightage);
						});

						if (totalweightage > 100) {
							MessageBox.error("Overall Weightage value of the table can't exceed more than 100");
							return;
						}
						createdOnt1 = oSelectedRowData.Created_on;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}
						// Build SQL update query
						// "Risk level" = '${oSelectedRowData.Risk_level}', removed on 16.06.2025
						query = `UPDATE "${tablename}"
						SET 
						"Risk field" = '${oSelectedRowData.Risk_field}',
						"Weightage" = '${oSelectedRowData.Weightage}', 
						"Created by" = '${oSelectedRowData.Created_by}',
						"Created on" = '${formattedDate}',
						"Updated by" = '${UserId}',
						"Updated on" =  '${globaldate}'
						WHERE "Risk field" = '${oSelectedRowData.Risk_field}';`;

						//Logic for Automation 

						querystep1 = `UPDATE "AMLChangeLog"
						SET 
						"TableName" = '${tablename}',
						"FName" = 'Risk_field',
						"FValue" = '${oSelectedRowData.Risk_field}',
						"date" = '${globaldate}'
						WHERE "TableName" = '${tablename}';`;

						// Risk weightage History
						tablehistoryname = "Risk_weightage_History";
						queryhistory = `INSERT INTO Risk_weightage_History 
								([Risk_field], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Weightage]) 
								VALUES ('${oSelectedRowData.Risk_field}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.Weightage}');`;
						//Logic end for Automation 

					} else if (window.globalVariable === 6 || this._sObjectId === 6) {
						tablename = 'Risk_Value';
						// Get the selected table row 
						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);
						if (typeof oSelectedRowData.Created_by === "object") {
							oSelectedRowData.Created_by = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}
						createdOnt1 = oSelectedRowData.Created_on;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}
						// Build SQL update query
						query = `UPDATE "${tablename}"
						SET 
						"Risk" = '${oSelectedRowData.Risk}',
						"Value" = '${oSelectedRowData.Value}',
						"Created by" = '${oSelectedRowData.Created_by}',
						"Created on" = '${formattedDate}',
						"Updated by" = '${UserId}',
						"Updated on" = '${globaldate}'
						WHERE "Risk" = '${oSelectedRowData.Risk}';`;

						//Logic for Automation 

						querystep1 = `UPDATE "AMLChangeLog"
						SET 
						"TableName" = '${tablename}',
						"FName" = 'Risk',
						"FValue" = '${oSelectedRowData.Risk}',
						"date" ='${globaldate}'
						WHERE "TableName" = '${tablename}';`;

						// Risk value History
						tablehistoryname = "Risk_Value_History";
						queryhistory = `INSERT INTO Risk_Value_History 
								([Risk], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Value]) 
								VALUES ('${oSelectedRowData.Risk}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.Value}');`;

						//Logic end for Automation 
					} else if (window.globalVariable === 7 || this._sObjectId === 7) {
						tablename = 'Risk_Value_Range';
						// Get the selected table row 
						aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
						oSelectedRowData = aRows.find(r => r.isSelected);

						if (typeof oSelectedRowData.Created_By === "object") {
							oSelectedRowData.Created_By = "";
						}
						if (typeof oSelectedRowData.Updated_by === "object") {
							oSelectedRowData.Updated_by = "";
						}
						createdOnt1 = oSelectedRowData.Created_On;
						if (createdOnt1) {
							formattedDate = oSelectedRowData.Created_On.split('.').reverse().join('.');
						} else {
							formattedDate = '';
						}
						// Build SQL update query
						query = `UPDATE "${tablename}"
						SET 
						"AML_Risk_Value_Low" = '${oSelectedRowData.AML_Risk_Value_Low}',
						"AML_Risk_Value_High" = '${oSelectedRowData.AML_Risk_Value_High}',
						"AML_Risk" = '${oSelectedRowData.AML_Risk}',
						"Created_By" = '${oSelectedRowData.Created_By}',
						"Created_On" = '${formattedDate}',
						"Updated_by" = '${UserId}',
						"Updated_On" = '${globaldate}'
						WHERE "AML_Risk_Value_Low" = '${oSelectedRowData.AML_Risk_Value_Low}';`;

						//Logic for Automation 

						querystep1 = `UPDATE "AMLChangeLog"
						SET 
						"TableName" = '${tablename}',
						"FName" = 'AML_Risk_Value_Low',
						"FValue" = '${oSelectedRowData.AML_Risk_Value_Low}',
						"date" = '${globaldate}'
						WHERE "TableName" = '${tablename}';`;
						// Risk Range History
						tablehistoryname = "AML_Range_History";
						queryhistory = `INSERT INTO AML_Range_History 
								([Risk_Range_Low],[Risk_Range_High], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [AML_Risk]) 
								VALUES ('${oSelectedRowData.AML_Risk_Value_Low}',
							      '${oSelectedRowData.AML_Risk_Value_High}',				
								'${oSelectedRowData.Created_By}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Updated' ,
								'${oSelectedRowData.AML_Risk}');`;
					}
					this.updateData(query);
					this.updateData(querystep1);
					this.updateData(queryhistory);
				}
				// if (i == 2) {
				// 	const now = new Date(); const updatedate = now.toISOString().split('T')[0];
				// 	const nowtime = new Date(); const updatetime = nowtime.toTimeString().split(' ')[0];

				// 	// Check for null, undefined, empty string, empty array, or empty object
				// 	if (
				// 		createdOnt1 === null ||
				// 		createdOnt1 === undefined ||
				// 		createdOnt1 === '' ||
				// 		(Array.isArray(createdOnt1) && createdOnt1.length === 0) ||
				// 		(typeof createdOnt1 === 'object' && Object.keys(createdOnt1).length === 0)
				// 	) {
				// 		createdOnt1 = globaldate;
				// 	}

				// 	let query2 = `INSERT INTO UpdateHistory 
				// 				([Table_Name], [Created_by], [Created_on], [Updated_by], [Updated_on]) 
				// 				VALUES ('${tablename}', '${UserId}', '${createdOnt1}', '${UserId}', '${updatedate}');`;

				// 	// Call your function to execute the query
				// 	this.updateData(query2);

				// }
			}
		},

		updateData: function (query) {
			var that = this;
			var updateQuery = query;
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
				const query = updateQuery; // Adjust query as needed
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
					success: (response) => {
						if (count === 0) {
							sap.m.MessageToast.show("Data updated successfully", {
								duration: 1000 // time in milliseconds
							});
							that.onCustomizing();
						} else {
							count--;
						}

					},
					error: (error) => {
						if (count === 0) {
							MessageBox.error("Failed to fetch data from the server.");
							that.onCustomizing();
						} else {
							count--;
						}

					}
				});
			}).catch((error) => {
				console.error('Error fetching token:', error);
				MessageBox.error("Failed to obtain access token.");
			});
		},

		//code for delete operation

		deletequery: function () {
			let tablename;
			let query, queryhistory;
			let oTable, userInfo, UserId;
			let oSelectedItem;
			let oContext;
			let oSelectedRowData;
			let aRows, createdOnt1, formattedDate;
			let parentcount = 1;
			// Fetching User details
			if (sap.ushell.Container) {
				userInfo = sap.ushell.Container.getService("UserInfo");
				UserId = userInfo.getId();
			} else {
				UserId = "KPR";
			}
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				tablename = 'Industry_Hierarchy';
				// Get the selected table row	 
				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				aRows.forEach(element => {
					if (oSelectedRowData.Industry_code === element.Parent) {
						parentcount++;
					}
				});
				if (parentcount === 1) {
					// Build SQL update query
					query = `DELETE FROM ${tablename} WHERE [Industry code] = '${oSelectedRowData.Industry_code}';`;
					createdOnt1 = oSelectedRowData.Created_on;
					if (createdOnt1) {
						formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
					} else {
						formattedDate = '';
					}
					queryhistory = `INSERT INTO Industry_History 
								([Industry_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Industry_description]
								,[Level],[Risk_Level],[Parent],[Category_type]) 
								VALUES ('${oSelectedRowData.Industry_code}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.Industry_description}',
								'${oSelectedRowData.Level}',
								'${oSelectedRowData.Risk_Level}',
								'${oSelectedRowData.Parent}',
								'${oSelectedRowData.Category_type}');`;
				} else {
					MessageBox.error("The industry code is used as a parent and therefore cannot be deleted.");
					return;
				}



			} else if (window.globalVariable === 2 || this._sObjectId === 2) {
				tablename = 'Customer_Subtype';

				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				createdOnt1 = oSelectedRowData.Created_On;
				if (createdOnt1) {
					formattedDate = oSelectedRowData.Created_On.split('.').reverse().join('.');
				} else {
					formattedDate = '';
				}
				// Build SQL update query

				query = `DELETE FROM ${tablename} WHERE [Customer_subtype] = '${oSelectedRowData.Customer_subtype}';`;
				queryhistory = `INSERT INTO Customer_Type_History 
								([Customer_Type], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Description],
								 [Risk_level]) 
								VALUES ('${oSelectedRowData.Customer_subtype}',				
								'${oSelectedRowData.Created_By}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.Description}',
								'${oSelectedRowData.Risk_level}' );`;
			} else if (window.globalVariable === 3 || this._sObjectId === 3) {
				tablename = 'Country';

				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				if (oSelectedRowData.Created_on) {
					formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
				} else {
					formattedDate = '';
				}
				// Build SQL update query

				query = `DELETE FROM ${tablename} WHERE [Country code] = '${oSelectedRowData.Country_code}';`;
				queryhistory = `INSERT INTO Country_History 
								([Country_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Country_decription],
								 [Risk_level]) 
								VALUES ('${oSelectedRowData.Country_code}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.Country_description}',
								'${oSelectedRowData.Risk_level}' );`;
			} else if (window.globalVariable === 5 || this._sObjectId === 5) {
				tablename = 'Risk_Weightage';

				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				if (oSelectedRowData.Created_on) {
					formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
				} else {
					formattedDate = '';
				}
				// Build SQL update query 
				query = `DELETE FROM ${tablename} WHERE [Risk field] = '${oSelectedRowData.Risk_field}';`;
				queryhistory = `INSERT INTO Risk_weightage_History 
								([Risk_field], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Weightage]) 
								VALUES ('${oSelectedRowData.Risk_field}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.Weightage}');`;

			} else if (window.globalVariable === 6 || this._sObjectId === 6) {
				tablename = 'Risk_Value';

				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				if (oSelectedRowData.Created_on) {
					formattedDate = oSelectedRowData.Created_on.split('.').reverse().join('.');
				} else {
					formattedDate = '';
				}
				// Build SQL update query 
				query = `DELETE FROM ${tablename} WHERE [Risk] = '${oSelectedRowData.Risk}';`;
				queryhistory = `INSERT INTO Risk_Value_History 
								([Risk], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Value]) 
								VALUES ('${oSelectedRowData.Risk}',				
								'${oSelectedRowData.Created_by}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.Value}');`;
			} else if (window.globalVariable === 7 || this._sObjectId === 7) {
				tablename = 'Risk_Value_Range';

				aRows = this.getView().getModel("tableModel").getProperty("/rows") || [];
				oSelectedRowData = aRows.find(r => r.isSelected);
				if (oSelectedRowData.Created_On) {
					formattedDate = oSelectedRowData.Created_On.split('.').reverse().join('.');
				} else {
					formattedDate = '';
				}
				// Build SQL update query 
				query = `DELETE FROM ${tablename} WHERE [AML_Risk_Value_Low] = '${oSelectedRowData.AML_Risk_Value_Low}';`;
				queryhistory = `INSERT INTO AML_Range_History 
								([Risk_Range_Low],[Risk_Range_High], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [AML_Risk]) 
								VALUES ('${oSelectedRowData.AML_Risk_Value_Low}',
							      '${oSelectedRowData.AML_Risk_Value_High}',				
								'${oSelectedRowData.Created_By}',
								'${formattedDate}',
								'${UserId}',
								'${globaldate}',
								'Delete' ,
								'${oSelectedRowData.AML_Risk}');`;
			}
			this.deleteData(query, tablename);
			this.updateData(queryhistory);
		},
		deleteData: function (query, tablename) {
			var that = this;
			var updateQuery = query;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
				const query = updateQuery; // Adjust query as needed
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
 
				jQuery.ajax({
					// url: proxyUrl + apiUrl,
					// url: apiUrl,
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
						console.log("Response:", response);
						// Handle success response here
						MessageBox.success("Data Deleted successfully");
						that.onCustomizing();
					},
					error: (error) => {
						MessageBox.error("Failed to fetch data from the server.");
						that.onCustomizing();
					}
				});
			}).catch((error) => {
				console.error('Error fetching token:', error);
				MessageBox.error("Failed to obtain access token.");
			});
		},
		//create records

		async CreateRecord() {
			this.oDialog ??= await this.loadFragment({
				name: "zaml.view.createRecord"
			});
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				// tablename = 'Industry_Hierarchy';
				this.getView().byId("L1").setText("Industry code");
				this.getView().byId("inputID").setVisible(true);
				this.getView().byId("L1").setVisible(true);
				this.getView().byId("inputID").setMaxLength(10);
				this.getView().byId("L2").setText("Industry description");
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setEditable(true); //Provide an edit option for Level 1 17.10.2025
				this.getView().byId("inputCol1").setMaxLength(100);
				this.getView().byId("inputID3").setEditable(false);
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L3").setText("Level");
				this.getView().byId("Idlevel").setVisible(true);
				this.getView().byId("L3").setVisible(true);
				this.getView().byId("L4").setText("Risk Level");
				this.getView().byId("L4").setRequired(false);
				this.getView().byId("L4").setVisible(true);
				this.getView().byId("L5").setText("Parent");
				this.getView().byId("L5").setRequired(false);
				this.getView().byId("L5").setVisible(true);
				this.getView().byId("L6").setText("Category type");
				this.getView().byId("L6").setVisible(true);
				this.getView().byId("inputCol21").setVisible(true);
				this.getView().byId("inputCol21").setEditable(false);
				this.getView().byId("inputCol2").setVisible(false);
				this.getView().byId("inputID3").setVisible(true);
				this.getView().byId("inputCol3").setVisible(true);
				this.getView().byId("L7").setVisible(false);
				this.getView().byId("riskID").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				this.getView().byId("Idlevel").setEnabled(true);
				this.getView().byId("inputweighte").setVisible(false);
				this.getView().byId("L111").setVisible(false);

			}
			else if (window.globalVariable === 2 || this._sObjectId === 2) {
				// tablename = 'Customer_Subtype';
				this.getView().byId("L1").setText("Customer Type");
				this.getView().byId("inputID").setVisible(true);
				this.getView().byId("inputID").setMaxLength(2);
				this.getView().byId("L2").setText("Description");
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setMaxLength(50);
				this.getView().byId("L4").setText("Risk Level");
				this.getView().byId("L4").setRequired(true);
				this.getView().byId("inputCol2").setVisible(true);
				this.getView().byId("L3").setVisible(false);
				this.getView().byId("L5").setVisible(false);
				this.getView().byId("L6").setVisible(false);
				this.getView().byId("inputID3").setVisible(false);
				this.getView().byId("inputCol3").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				// this.getView().byId("L3").setVisible(true);
				this.getView().byId("L7").setVisible(false);
				this.getView().byId("riskID").setVisible(false);
				this.getView().byId("Idlevel").setVisible(false);
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("inputweighte").setVisible(false);
				this.getView().byId("L111").setVisible(false);

			} else if (window.globalVariable === 3 || this._sObjectId === 3) {
				// tablename = 'Country';';
				this.getView().byId("L1").setText("Country code");
				this.getView().byId("L1").setVisible(true);
				this.getView().byId("inputID").setVisible(true);
				this.getView().byId("inputID").setMaxLength(2);
				this.getView().byId("L2").setText("Country description");
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setMaxLength(50);
				this.getView().byId("L4").setText("Risk level");
				this.getView().byId("L4").setVisible(true);
				this.getView().byId("L4").setRequired(true);
				this.getView().byId("inputCol2").setVisible(true);
				this.getView().byId("L3").setVisible(false);
				this.getView().byId("L5").setVisible(false);
				this.getView().byId("L6").setVisible(false);
				this.getView().byId("inputID3").setVisible(false);
				this.getView().byId("inputCol3").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				// this.getView().byId("L3").setVisible(true);
				this.getView().byId("L7").setVisible(false);
				this.getView().byId("riskID").setVisible(false);
				this.getView().byId("Idlevel").setVisible(false);
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("inputweighte").setVisible(false);
				this.getView().byId("L111").setVisible(false);
			}
			else if (window.globalVariable === 5 || this._sObjectId === 5) {
				// tablename= 'Risk_Weightage';
				this.getView().byId("L1").setText("Risk field");
				this.getView().byId("L1").setVisible(false);
				this.getView().byId("L111").setVisible(true);
				this.getView().byId("inputID").setMaxLength(25);
				this.getView().byId("inputID").setVisible(false);
				this.getView().byId("inputweighte").setVisible(true);
				this.getView().byId("L2").setText("Weightage");
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setMaxLength(5)
				this.getView().byId("L3").setVisible(false);
				this.getView().byId("L4").setVisible(false);
				this.getView().byId("L5").setVisible(false);
				this.getView().byId("L6").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				this.getView().byId("inputCol2").setVisible(false);
				this.getView().byId("inputID3").setVisible(false);
				this.getView().byId("inputCol3").setVisible(false);
				this.getView().byId("L7").setVisible(false);
				this.getView().byId("riskID").setVisible(false);
				this.getView().byId("Idlevel").setVisible(false);
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
			}
			else if (window.globalVariable === 6 || this._sObjectId === 6) {
				// tablename= 'Risk_Value';
				this.getView().byId("L2").setText("Value");
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setMaxLength(2);
				this.getView().byId("L7").setText("Risk");
				this.getView().byId("L7").setVisible(true);
				this.getView().byId("riskID").setVisible(true);
				this.getView().byId("L4").setVisible(false);
				this.getView().byId("inputCol2").setVisible(false);
				this.getView().byId("L1").setVisible(false);
				this.getView().byId("L3").setVisible(false);
				this.getView().byId("L5").setVisible(false);
				this.getView().byId("L6").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				this.getView().byId("inputID3").setVisible(false);
				this.getView().byId("inputCol3").setVisible(false);
				this.getView().byId("inputID").setVisible(false);
				this.getView().byId("Idlevel").setVisible(false);
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("inputweighte").setVisible(false);
				this.getView().byId("L111").setVisible(false);
			}
			else if (window.globalVariable === 7 || this._sObjectId === 7) {
				// 	tablename= 'Risk_Value_Range';
				this.getView().byId("L1").setText("AML Risk Value Low");
				this.getView().byId("L1").setVisible(true);
				this.getView().byId("inputID").setVisible(true);
				this.getView().byId("inputID").setMaxLength(8)
				// this.getView().byId("inputID").setMaxLength(2);
				this.getView().byId("L2").setText("AML Risk Value High");
				this.getView().byId("L2").setVisible(true);
				this.getView().byId("L2").setRequired(true);
				this.getView().byId("inputCol1").setVisible(true);
				this.getView().byId("inputCol1").setMaxLength(8)
				// this.getView().byId("inputCol1").setMaxLength(3);
				this.getView().byId("L4").setText("AML Risk");
				this.getView().byId("L4").setVisible(true);
				this.getView().byId("L4").setRequired(true);
				this.getView().byId("inputCol2").setVisible(true);
				this.getView().byId("L3").setVisible(false);
				this.getView().byId("L5").setVisible(false);
				this.getView().byId("L6").setVisible(false);
				this.getView().byId("inputID3").setVisible(false);
				this.getView().byId("inputCol3").setVisible(false);
				this.getView().byId("inputID2").setVisible(false);
				this.getView().byId("L7").setVisible(false);
				this.getView().byId("riskID").setVisible(false);
				this.getView().byId("Idlevel").setVisible(false);
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("inputweighte").setVisible(false);
				this.getView().byId("L111").setVisible(false);
			}
			this.oDialog.open();
		},

		oncreateCloseDialog() {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.getView().byId("inputCol1").setValue('');
			this.getView().byId("inputID").setValue('');
			// this.getView().byId("inputCol2").setValue('Low');
			this.getView().byId("inputCol2").setSelectedKey("Low");
			this.getView().byId("Idlevel").setSelectedKey("");
			this.getView().byId("riskID").setSelectedKey("No");
			this.getView().byId("inputID3").setValue('');
			this.getView().byId("inputCol3").setSelectedKey('NACE');
			this.getView().byId("inputID2").setValue('');
			this.getView().byId("L4").setRequired(true);
			this.getView().byId("L2").setRequired(true);
			this.getView().byId("L5").setRequired(true);
			this.getView().byId("inputCol1").setEditable(true);
			this.getView().byId("inputID3").setEditable(true);
			this.getView().byId("Idlevel").setEnabled(true);
			this.getView().byId("inputweighte").setSelectedKey('Beneficial Owner Risk');
			this.byId("createRecorsid").close();
			this.onCustomizing();
		},
		onCatagory: function (oEVent) {
			var that = this;
			var sQry = oEVent.mParameters.selectedItem.mProperties.key;
			var Category = that.getView().byId("Idlevel").getSelectedKey();
			if (sQry === "NAICS") {
				that.getView().byId("inputCol1").setEditable(true);
				that.getView().byId("inputCol1").setValue("");
				that.getView().byId("inputID").setValue("");
				that.getView().byId("Idlevel").setEnabled(false);
				that.getView().byId("Idlevel").setSelectedKey("5");
				that.getView().byId("inputCol21").setVisible(false);
				that.getView().byId("inputCol2").setVisible(true);
				that.getView().byId("L2").setRequired(true);  // Industry Description
				that.getView().byId("L5").setRequired(false);  // Parent
				that.getView().byId("inputID3").setEditable(false); // Parent
				that.getView().byId("inputID3").setValue("");
				this.getView().byId("inputCol2").setSelectedKey("Low");
			} else if (sQry === "NAICS" && Category === "5") {
				that.getView().byId("inputCol1").setEditable(true);
				that.getView().byId("inputCol1").setValue("");
				that.getView().byId("inputID").setValue("");
				that.getView().byId("Idlevel").setEnabled(false);
				that.getView().byId("Idlevel").setSelectedKey("5");
				that.getView().byId("inputCol21").setVisible(false);
				that.getView().byId("inputCol2").setVisible(true);
				that.getView().byId("L2").setRequired(true);  // Industry Description
				that.getView().byId("L5").setRequired(false); // Parent
				that.getView().byId("inputID3").setEditable(false); // Parent
				that.getView().byId("inputID3").setValue("");
				this.getView().byId("inputCol2").setSelectedKey("Low");
			} else {
				that.getView().byId("inputCol1").setEditable(true); //Provide an edit option for Level 1 17.10.2025
				that.getView().byId("inputCol1").setValue("");
				that.getView().byId("inputID").setValue("");
				that.getView().byId("Idlevel").setEnabled(true);
				that.getView().byId("Idlevel").setSelectedKey("1");
				that.getView().byId("inputCol21").setVisible(true);
				that.getView().byId("inputCol2").setVisible(false);
				that.getView().byId("L2").setRequired(true);  // Industry Description
				that.getView().byId("inputID3").setEditable(false); // Parent
				that.getView().byId("inputID3").setValue("");
				this.getView().byId("inputCol2").setSelectedKey("Low");
			}
		},
		onLevel: function (oEVent) {
			var sQry = oEVent.mParameters.selectedItem.mProperties.key;
			if (sQry === "1") {
				this.getView().byId("inputCol21").setValue("");
				this.getView().byId("inputCol21").setVisible(true);
				this.getView().byId("inputCol21").setEditable(false);
				this.getView().byId("inputCol2").setVisible(false);
				this.getView().byId("inputCol2").setSelectedKey("Low");
				this.getView().byId("inputCol1").setEditable(false);
				this.getView().byId("inputCol1").setValue("");
				this.getView().byId("inputID3").setEditable(false);
				this.getView().byId("inputID3").setValue("");
				this.getView().byId("L4").setRequired(false); // Risk Level
				this.getView().byId("L5").setRequired(false);  // Parent
				this.getView().byId("L2").setRequired(false);  // Industry Description
			} else if (sQry === "2" || sQry === "3" || sQry === "4") {
				this.getView().byId("inputCol21").setValue("");
				this.getView().byId("inputCol21").setVisible(true);
				this.getView().byId("inputCol21").setEditable(false);
				this.getView().byId("inputCol2").setVisible(false);
				this.getView().byId("inputCol2").setSelectedKey("Low");
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("L4").setRequired(false); // Risk Level
				this.getView().byId("L5").setRequired(true);  // Parent
				this.getView().byId("L2").setRequired(true);  // Industry Description
			} else {
				this.getView().byId("inputCol21").setVisible(false);
				this.getView().byId("inputCol2").setVisible(true);
				this.getView().byId("inputCol21").setEditable(false);
				this.getView().byId("inputCol1").setEditable(true);
				this.getView().byId("inputID3").setEditable(true);
				this.getView().byId("L4").setRequired(true);  // Risk Level
				this.getView().byId("L5").setRequired(true);   // Parent
				this.getView().byId("L2").setRequired(true); // Industry Description
			}
		},
		onLevelitem: function (oEVent) {
			var that = this;
			var sQry = oEVent.mParameters.selectedItem.mProperties.key;
			var sPath = parseInt(oEVent.getSource().getParent().getBindingContext("tableModel").getPath().split("/")[2]);
			var Category = that.getView().getModel("tableModel").oData.rows[sPath].Category_type;
			if (sQry === "1") {
				that.getView().getModel("tableModel").oData.rows[sPath].Risk_Level = "";
				that.getView().getModel("tableModel").oData.rows[sPath].Parent = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableRisk = false;
				that.getView().getModel("tableModel").oData.rows[sPath].editableParent = false;
				that.getView().getModel("tableModel").oData.rows[sPath].Industry_description = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableIndustry_desc = false;

			} else if (sQry === "2" || sQry === "3" || sQry === "4") {
				that.getView().getModel("tableModel").oData.rows[sPath].Risk_Level = "";
				that.getView().getModel("tableModel").oData.rows[sPath].Parent = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableRisk = false;
				that.getView().getModel("tableModel").oData.rows[sPath].editableParent = true;
				that.getView().getModel("tableModel").oData.rows[sPath].Industry_description = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableIndustry_desc = true;
			} else if (sQry === "5" && Category === "NAICS") {
				that.getView().getModel("tableModel").oData.rows[sPath].Parent = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableRisk = true;
				that.getView().getModel("tableModel").oData.rows[sPath].editablelevel = false;
				that.getView().getModel("tableModel").oData.rows[sPath].editableParent = false;
				that.getView().getModel("tableModel").oData.rows[sPath].Industry_description = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableIndustry_desc = false;
			} else {
				that.getView().getModel("tableModel").oData.rows[sPath].Parent = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableRisk = true;
				that.getView().getModel("tableModel").oData.rows[sPath].editableParent = true;
				that.getView().getModel("tableModel").oData.rows[sPath].Industry_description = "";
				that.getView().getModel("tableModel").oData.rows[sPath].editableIndustry_desc = true;
			}
		},

		createquery: function () {
			const now = new Date(); const updatedate = now.toISOString().split('T')[0];
			// Fetching User details
			let userInfo, UserId;
			if (sap.ushell.Container) {
				userInfo = sap.ushell.Container.getService("UserInfo");
				UserId = userInfo.getId();
			} else {
				UserId = "KPR";
			}
			var ID, Col1, Level, RiskLevel, Parent, Category_type;
			var UpdatedOn = "";
			var CreatedBy = UserId;
			var CreatedOn = updatedate;
			var UpdatedBy = "";
			let query, tablename, queryhistory;
			var oData = "";
			if (this.getView().byId("p3_Industry").getModel("tableModel") !== undefined) {
				oData = this.getView().byId("p3_Industry").getModel("tableModel").oData.rows;
			}

			var flag = false;
			if (window.globalVariable === 1 || this._sObjectId === 1) {
				tablename = 'Industry_Hierarchy';
				Level = this.getView().byId("Idlevel").getSelectedKey();
				if (!Level) {
					MessageBox.error("Please provide a valid integer value for Level.");
					return;
				}
				ID = this.getView().byId("inputID").getValue();
				if (!ID) {
					// Show error message
					MessageBox.error("Please provide the Industry Code.");
					return;
				}
				Category_type = Category_type = this.getView().byId("inputCol3").getSelectedKey();
				// this.getView().byId("inputCol3").getValue();
				if (!Category_type) {
					// Show error message
					MessageBox.error("Please provide the Category type.");
					return;
				}
				if (Level === "1") {
					// Provide an edit option for Level 1 17.10.2025
					Col1 = this.getView().byId("inputCol1").getValue();
					if (!Col1) {
						// Show error message
						MessageBox.error("Please provide the Industry description.");
						return;
					}
				} else if (Category_type === "NAICS" && Level === "5") {
					Col1 = this.getView().byId("inputCol1").getValue();
					if (!Col1) {
						// Show error message
						MessageBox.error("Please provide the Industry description.");
						return;
					}
				} else {
					Col1 = Col1 = this.getView().byId("inputCol1").getValue();
				}

				if (Category_type === "NACE") {
					if (Level === "1" || Level === "2" || Level === "3" || Level === "4") {
						RiskLevel = this.getView().byId("inputCol21").getValue();
					} else {
						RiskLevel = this.getView().byId("inputCol2").getSelectedKey();
					}
				} else {
					RiskLevel = this.getView().byId("inputCol2").getSelectedKey();
				}


				Parent = this.getView().byId("inputID3").getValue();
				if (Category_type === "NACE") {
					if (Level !== "1") {
						if (!Parent) {
							// Show error message
							MessageBox.error("Please provide the Parent.");
							return;
						}
					}
				}


				// Checking Industry is available.then We can not create same record again.
				if (Level !== "1") {
					if (Category_type === "NACE") {
						if (oData[0] !== undefined) {
							oData.forEach((each) => {
								if (each.Industry_code === ID.trim()) {
									flag = false;
									return;
								} else if (each.Industry_code === Parent.trim()) {
									flag = true;
									return;
								}
							});
							if (!flag) {
								MessageBox.error("The record already exists, or the parent record is missing.")
								return;
							}
						}
					}
				} else {
					if (oData[0] !== undefined) {
						for (var i = 0; i < oData.length; i++) {
							if (oData[i].Industry_code === ID.trim()) {
								MessageBox.error("The record already exists");
								return;
							}
						}
					}
				}

				query = `INSERT INTO ${tablename}
            ([Industry code], [Industry description],[Level],[Risk Level],[Parent],[Category type],[Updated on], [Created by], [Created on], [Updated by]) 
            VALUES ('${ID}', '${Col1}', '${Level}', '${RiskLevel}','${Parent}','${Category_type}','${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;

				queryhistory = `INSERT INTO Industry_History 
								([Industry_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Industry_description]
								,[Level],[Risk_Level],[Parent],[Category_type]) 
								VALUES ('${ID}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${Col1}',
								'${Level}',
								'${RiskLevel}',
								'${Parent}',
								'${Category_type}');`;

			}
			else if (window.globalVariable === 2 || this._sObjectId === 2) {
				tablename = 'Customer_Subtype';
				ID = this.getView().byId("inputID").getValue();
				if (!ID) {
					// Show error message
					MessageBox.error("Please provide the Customer Subtype.");
					return;
				}
				Col1 = this.getView().byId("inputCol1").getValue();
				if (!Col1) {
					// Show error message
					MessageBox.error("Please provide Description.");
					return;
				}
				RiskLevel = this.getView().byId("inputCol2").getSelectedKey();
				// this.getView().byId("inputCol2").getValue();
				if (!RiskLevel) {
					// Show error message
					MessageBox.error("Please provide the Risk Level.");
					return;
				}
				// Checking Customer_subtype is available.then We can not create same record again.
				if (oData[0] !== undefined) {
					oData.forEach((each) => {
						if (each.Customer_subtype === ID.trim()) {
							flag = true;
						}
					});
					if (flag) {
						MessageBox.warning("The record already exists");
						return;
					}
				}

				query = `INSERT INTO ${tablename}
            ([Customer_subtype], [Description],[Risk_level],[Updated_On], [Created_By], [Created_On], [Updated_by]) 
            VALUES ('${ID}', '${Col1}', '${RiskLevel}','${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;


				queryhistory = `INSERT INTO Customer_Type_History 
								([Customer_Type], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Description],
								 [Risk_level]) 
								VALUES ('${ID}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${Col1}',
								'${RiskLevel}' );`;

			}
			else if (window.globalVariable === 3 || this._sObjectId === 3) {
				tablename = 'Country';
				ID = this.getView().byId("inputID").getValue();  // key field
				Col1 = this.getView().byId("inputCol1").getValue();
				Level = this.getView().byId("inputCol2").getSelectedKey();
				// Checking Country_code is available.then We can create same record again.
				if (oData[0] !== undefined) {
					oData.forEach((each) => {
						if (each.Country_code === ID.trim()) {
							flag = true;
						}
					});
					if (flag) {
						MessageBox.warning("The record already exists");
						return;
					}
				}
				query = `INSERT INTO ${tablename}
			 ([Country code], [Country description],[Risk level],[Updated on], [Created by], [Created on], [Updated by]) 
			 VALUES ('${ID}', '${Col1}', '${Level}','${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;


				queryhistory = `INSERT INTO Country_History 
								([Country_code], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],[Country_decription],
								 [Risk_level]) 
								VALUES ('${ID}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${Col1}',
								'${Level}' );`;
			}
			else if (window.globalVariable === 5 || this._sObjectId === 5) {
				tablename = 'Risk_Weightage';
				ID = this.getView().byId("inputweighte").getSelectedKey(); //key field
				Col1 = this.getView().byId("inputCol1").getValue();
				var totalweightage = 0 + parseFloat(Col1);

				// Checking Risk_field is available.then We can create same record again.
				if (oData[0] !== undefined) {
					oData.forEach((each) => {
						if (each.Risk_field === ID.trim()) {
							flag = true;
						}
						totalweightage = totalweightage + parseFloat(each.Weightage);
					});
					if (flag) {
						MessageBox.warning("The record already exists");
						return;
					}
				}
				if (totalweightage > 100) {
					MessageBox.error("Overall Weightage value of the table can't exceed more than 100");
					return;
				}

				if (parseFloat(Col1) >= 100) {
					MessageBox.error("Weightage value can't exceed more than 100");
					return;
				}

				query = `INSERT INTO ${tablename}
			 ([Risk field], [Weightage],[Updated on], [Created by], [Created on], [Updated by]) 
			 VALUES ('${ID}', '${Col1}', '${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;

				queryhistory = `INSERT INTO Risk_weightage_History 
								([Risk_field], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Weightage]) 
								VALUES ('${ID}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${Col1}');`;
			}
			else if (window.globalVariable === 6 || this._sObjectId === 6) {
				tablename = 'Risk_Value';
				ID = this.getView().byId("inputCol1").getValue();
				Col1 = this.getView().byId("riskID").getSelectedKey(); //Key field
				// Checking Risk is available.then We can create same record again.
				if (oData[0] !== undefined) {
					oData.forEach((each) => {
						if (each.Risk === Col1) {
							flag = true;
						}
					});
					if (flag) {
						MessageBox.warning("The record already exists");
						return;
					}
				}

				query = `INSERT INTO ${tablename}
				 ([Risk], [Value],[Updated on], [Created by], [Created on], [Updated by]) 
				 VALUES ('${Col1}', '${ID}', '${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;

				queryhistory = `INSERT INTO Risk_Value_History 
								([Risk], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [Value]) 
								VALUES ('${Col1}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${ID}');`;
			} else if (window.globalVariable === 7 || this._sObjectId === 7) {
				tablename = 'Risk_Value_Range';
				ID = this.getView().byId("inputID").getValue(); // key field
				Col1 = this.getView().byId("inputCol1").getValue(); // key field
				Level = this.getView().byId("inputCol2").getSelectedKey();

				// Checking Industry is available.then We can create same record again.
				if (oData[0] !== undefined) {
					oData.forEach((each) => {
						if (parseFloat(each.AML_Risk_Value_Low) === parseFloat(ID) && parseFloat(each.AML_Risk_Value_High) === parseFloat(Col1)) {
							flag = true;
						}
					});
					if (flag) {
						MessageBox.warning("The record already exists");
						return;
					}
				}

				query = `INSERT INTO ${tablename}
            ([AML_Risk_Value_Low], [AML_Risk_Value_High],[AML_Risk],[Updated_On], [Created_By], [Created_On], [Updated_by]) 
            VALUES ('${ID}', '${Col1}', '${Level}','${UpdatedOn}', '${CreatedBy}', '${CreatedOn}', '${UpdatedBy}');`;


				queryhistory = `INSERT INTO AML_Range_History 
								([Risk_Range_Low],[Risk_Range_High], [Created_by], [Created_On], [Updated_by], [Updated_On],[Action],
								 [AML_Risk]) 
								VALUES ('${ID}',
							    '${Col1}',				
								'${CreatedBy}',
								'${CreatedOn}',
								'${''}',
								'${''}',
								'Created' ,
								'${Level}');`;
			}
			this.createData(query);
			this.updateData(queryhistory);
		},
		createData: function (query) {
			var that = this;
			var updateQuery = query;
			let oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/bc/ui2/start_up?", "", false);
			let systemid = oModel.getProperty("/system");
			let client = oModel.getProperty("/client");
			let nodeUrl;

			this.getAccessToken().then((token) => {
				const proxyUrl = "https://cors-anywhere.herokuapp.com/";
				const apiUrl = "https://chg-meridian-dev-qa-5gwjbubw.it-cpi023-rt.cfapps.eu20-001.hana.ondemand.com/http/dbconnect";
				const query = updateQuery; // Adjust query as needed
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

				jQuery.ajax({
					// url: proxyUrl + apiUrl,
					// url: apiUrl,
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
						// Handle success response here
						MessageBox.success("Record has inserted successfully");
						that.oncreateCloseDialog();
					},
					error: (error) => {
						MessageBox.error("Failed to fetch data from the server.");
					}
				});
			}).catch((error) => {
				console.error('Error fetching token:', error);
				MessageBox.error("Failed to obtain access token.");
			});
		},
		onExpandPress: async function () {
			if (this._sObjectId === 1) {
				if (!this.oUpdateHistoryDialog) {
					this.oUpdateHistoryDialog = await this.loadFragment({
						name: "zaml.view.Industry_History"
					});
				}
				var tablename = 'Industry_History';
				this.fetchHistoryData(tablename);
				this.oUpdateHistoryDialog.open();
			} else if (this._sObjectId === 2) {
				if (!this.oCustomerTypeHistoryDialog) {
					this.oCustomerTypeHistoryDialog = await this.loadFragment({
						name: "zaml.view.CustomerType_History"
					});
				}
				var tablename = 'Customer_Type_History';
				this.fetchHistoryData(tablename);
				this.oCustomerTypeHistoryDialog.open();
			} else if (this._sObjectId === 3) {
				if (!this.oCountryHistoryDialog) {
					this.oCountryHistoryDialog = await this.loadFragment({
						name: "zaml.view.Country_History"
					});
				}
				var tablename = 'Country_History';
				this.fetchHistoryData(tablename);
				this.oCountryHistoryDialog.open();
			} else if (this._sObjectId === 5) {
				if (!this.oRiskWeightageHistoryDialog) {
					this.oRiskWeightageHistoryDialog = await this.loadFragment({
						name: "zaml.view.Risk_weightage_History"
					});
				}
				var tablename = 'Risk_weightage_History';
				this.fetchHistoryData(tablename);
				this.oRiskWeightageHistoryDialog.open();
			} else if (this._sObjectId === 6) {
				if (!this.oRiskValueHistoryDialog) {
					this.oRiskValueHistoryDialog = await this.loadFragment({
						name: "zaml.view.Risk_value_History"
					});
				}
				var tablename = 'Risk_Value_History';
				this.fetchHistoryData(tablename);
				this.oRiskValueHistoryDialog.open();
			} else if (this._sObjectId === 7) {
				if (!this.oAMLRangeHistoryDialog) {
					this.oAMLRangeHistoryDialog = await this.loadFragment({
						name: "zaml.view.Risk_Range_History"
					});
				}
				var tablename = 'AML_Range_History';
				this.fetchHistoryData(tablename);
				this.oAMLRangeHistoryDialog.open();
			}

		},

		onUpdateHistoryCloseDiolog() {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			if (this._sObjectId === 1) {
				this.oUpdateHistoryDialog.close();
			} else if (this._sObjectId === 2) {
				this.oCustomerTypeHistoryDialog.close();
			} else if (this._sObjectId === 3) {
				this.oCountryHistoryDialog.close();
			} else if (this._sObjectId === 5) {
				this.oRiskWeightageHistoryDialog.close();
			} else if (this._sObjectId === 6) {
				this.oRiskValueHistoryDialog.close();
			} else if (this._sObjectId === 7) {
				this.oAMLRangeHistoryDialog.close();
			}
		},
		onIndustrySearch: function (oEvent) {
			var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query");
			var oTable = this.byId("p3_Industry");
			var oBinding = oTable.getBinding("rows");

			if (!sQuery) {
				oBinding.filter([]); // clear filters
				return;
			}

			var aFilters = [
				new sap.ui.model.Filter("Industry_code", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Industry_description", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Risk_Level", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Parent", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Level", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Created_by", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, sQuery),
				new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, sQuery)
				// Add more filters if you want to search in additional fields
			];

			var oGlobalFilter = new sap.ui.model.Filter({
				filters: aFilters,
				and: false // OR condition
			});

			oBinding.filter([oGlobalFilter]);
		},
		onDataExport: function () {
			var oTable = this.byId("p3_Industry");
			var oBinding = oTable.getBinding("rows");
			var aColumns = [
				{ label: "Industry Code", property: "Industry_code", type: "string" },
				{ label: "Industry Description", property: "Industry_description", type: "string" },
				{ label: "Level", property: "Level", type: "string" },
				{ label: "Risk Level", property: "Risk_Level", type: "string" },
				{ label: "Parent", property: "Parent", type: "string" },
				{ label: "Category Type", property: "Category_type", type: "string" },
				{ label: "Created By", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'dd.MM.yyyy'" },
				{ label: "Updated By", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];
			// Ensure all contexts are fetched
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Industry_Code_Hierarchy_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onDataExport_cust: function () {
			var oTable = this.byId("p3_Customer_subtype");
			var oBinding = oTable.getBinding("rows");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Customer Type", property: "Customer_subtype", type: "string" },
				{ label: "Description", property: "Description", type: "string" },
				{ label: "Risk Level", property: "Risk_level", type: "string" },
				{ label: "Created By", property: "Created_By", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated By", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Customer_Type_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onDataExport_code: function () {
			var oTable = this.byId("p3_Country");
			var oBinding = oTable.getBinding("rows");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Country Code", property: "Country_code", type: "string" },
				{ label: "Country Description", property: "Country_description", type: "string" },
				{ label: "Risk Level", property: "Risk_level", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Country_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onDataExport_wighatge: function () {
			var oTable = this.byId("p3_Riskweightage");
			var oBinding = oTable.getBinding("rows");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Risk field", property: "Risk_field", type: "string" },
				{ label: "Weightage", property: "Weightage", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_weightage_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onDataExport_Risk: function () {
			var oTable = this.byId("p3_Riskweightage");
			var oBinding = oTable.getBinding("rows");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Risk", property: "Risk", type: "string" },
				{ label: "Value", property: "Value", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_on", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_Value_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onDataExport_Range: function () {
			var oTable = this.byId("p3_Riskweightage");
			var oBinding = oTable.getBinding("rows");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "AML Risk Value Low", property: "AML_Risk_Value_Low", type: "string" },
				{ label: "AML Risk Value High", property: "AML_Risk_Value_High", type: "string" },
				{ label: "AMl Risk", property: "AML_Risk", type: "string" },
				{ label: "Created by", property: "Created_By", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_Range_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportIndustryHistory: function (oEvent) {
			var oTable = this.getView().byId("IndustryHistoydetails");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Industry Code", property: "Industry_code", type: "string" },
				{ label: "Industry Description", property: "Industry_description", type: "string" },
				{ label: "Level", property: "Level", type: "string" },
				{ label: "Risk Level", property: "Risk_Level", type: "string" },
				{ label: "Parent", property: "Parent", type: "string" },
				{ label: "Category Type", property: "Category_type", type: "string" },
				{ label: "Created By", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'dd.MM.yyyy'" },
				{ label: "Updated By", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Industry_Hierarchy_History",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportCustomerHistory: function (oEvent) {
			var oTable = this.getView().byId("CustomerTypehistorydetails");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Customer Type", property: "Customer_Type", type: "string" },
				{ label: "Description", property: "Description", type: "string" },
				{ label: "Risk Level", property: "Risk_level", type: "string" },
				{ label: "Created By", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated By", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];

			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Customer_Type_History_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportCountryHistory: function (oEVent) {
			var oTable = this.getView().byId("Countrycodedetailshistory");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Country Code", property: "Country_code", type: "string" },
				{ label: "Country Description", property: "Country_decription", type: "string" },
				{ label: "Risk Level", property: "Risk_level", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Country_History_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportRiskWeighatgeHistory: function (oEvent) {
			var oTable = this.getView().byId("Riskweightagehistoryid");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Risk field", property: "Risk_field", type: "string" },
				{ label: "Weightage", property: "Weightage", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_Weightage_History_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportRiskValueHistory: function (oEvent) {
			var oTable = this.getView().byId("Riskvaluedetailshistoryid");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "Risk", property: "Risk", type: "string" },
				{ label: "Value", property: "Value", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_Value_History_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onExportRiskRangeHistory: function (oEvent) {
			var oTable = this.getView().byId("Riskrangehistoryid");
			var oBinding = oTable.getBinding("items");
			var aContexts = oBinding.getContexts(0, oBinding.getLength());
			var aColumns = [
				{ label: "AML Risk Value Low", property: "Risk_Range_Low", type: "string" },
				{ label: "AML Risk Value High", property: "Risk_Range_High", type: "string" },
				{ label: "AML Risk", property: "AML_Risk", type: "string" },
				{ label: "Created by", property: "Created_by", type: "string" },
				{ label: "Created On", property: "Created_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Updated by", property: "Updated_by", type: "string" },
				{ label: "Updated On", property: "Updated_On", type: "sap.ui.model.type.Date', formatOptions: { pattern: 'yyyy-MM-dd' }" },
				{ label: "Action", property: "Action", type: "string" }
			];
			var oExport = new sap.ui.export.Spreadsheet({
				workbook: {
					columns: aColumns
				},
				dataSource: aContexts.map(function (oContext) {
					return oContext.getObject();
				}),
				fileName: "Risk_Range_History_table",
				worker: false
			});

			oExport.build().then(function () {
				sap.m.MessageToast.show("Export complete");
			}).catch(function (oError) {
				sap.m.MessageBox.error("Export failed: " + oError.message);
			});
		},
		onCountrySearch: function (oEvent) {
			const sQuery = oEvent.getParameter("newValue")?.trim();
			const oTable = this.byId("p3_Country");
			var oBinding = oTable.getBinding("rows");
			var date = "";
			var oFilter;
			if (!sQuery) {
				oBinding.filter([]); // clear filter
				return;
			}
			// if (!isNaN(new Date(sQuery))) {
			// 	var dd = new Date(sQuery).getDate();
			// 	if (dd < 10) {
			// 		dd = "0" + dd;
			// 	}

			// 	var mm = new Date(sQuery).getMonth() + 1;
			// 	if (mm < 10) {
			// 		mm = "0" + mm;
			// 	}

			// 	let yyyy = new Date(sQuery).getFullYear();

			// 	date = `${yyyy}-${mm}-${dd}`;

			// 	oFilter = new sap.ui.model.Filter({
			// 		filters: [
			// 			new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Country_code", sap.ui.model.FilterOperator.Contains, sQuery),
			// 			new sap.ui.model.Filter("Country_description", sap.ui.model.FilterOperator.Contains, sQuery),
			// 		],
			// 		and: false // OR condition
			// 	});

			// } else {
			oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Country_code", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Country_description", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Risk_level", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Created_by", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery)
				],
				and: false // OR condition
			});
			// }
			oBinding.filter(oFilter);
		},
		onCustometSubtype: function (oEvent) {
			var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query");
			var oTable = this.byId("p3_Customer_subtype");
			var oBinding = oTable.getBinding("rows");


			var oFilter;
			var date = "";
			if (!sQuery) {
				oBinding.filter([]); // clear filter
				return;
			}
			// if (!isNaN(new Date(sQuery))) {
			// 	var dd = new Date(sQuery).getDate();
			// 	if (dd < 10) {
			// 		dd = "0" + dd;
			// 	}

			// 	var mm = new Date(sQuery).getMonth() + 1;
			// 	if (mm < 10) {
			// 		mm = "0" + mm;
			// 	}

			// 	let yyyy = new Date(sQuery).getFullYear();

			// 	date = `${yyyy}-${mm}-${dd}`;

			// 	oFilter = new sap.ui.model.Filter({
			// 		filters: [
			// 			new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Updated_On", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Customer_subtype", sap.ui.model.FilterOperator.Contains, sQuery)
			// 		],
			// 		and: false // OR condition
			// 	});
			// } else {
			oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_On", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Customer_subtype", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Created_By", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Risk_level", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery)
				],
				and: false // OR condition
			});
			// }
			oBinding.filter(oFilter);
		},
		onRiskweightage: function (oEvent) {
			const sQuery = oEvent.getParameter("newValue")?.trim();
			const oTable = this.byId("p3_Riskweightage");
			var oBinding = oTable.getBinding("rows");
			var oFilter;
			var date = "";
			if (!sQuery) {
				oBinding.filter([]); // clear filter
				return;
			}
			// if (!isNaN(new Date(sQuery))) {
			// 	var dd = new Date(sQuery).getDate();
			// 	if (dd < 10) {
			// 		dd = "0" + dd;
			// 	}

			// 	var mm = new Date(sQuery).getMonth() + 1;
			// 	if (mm < 10) {
			// 		mm = "0" + mm;
			// 	}

			// 	let yyyy = new Date(sQuery).getFullYear();

			// 	date = `${yyyy}-${mm}-${dd}`;

			// 	oFilter = new sap.ui.model.Filter({
			// 		filters: [
			// 			new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Risk_field", sap.ui.model.FilterOperator.Contains, sQuery),
			// 			new sap.ui.model.Filter("Weightage", sap.ui.model.FilterOperator.Contains, sQuery)
			// 		],
			// 		and: false // OR condition
			// 	});
			// } else {
			oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Risk_field", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Weightage", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Created_by", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery)
				],
				and: false // OR condition
			});
			// }
			oBinding.filter(oFilter);
		},
		onRiskValue: function (oEvent) {
			const sQuery = oEvent.getParameter("newValue")?.trim();
			const oTable = this.byId("p3_RiskValue");
			var oBinding = oTable.getBinding("rows");
			var oFilter;
			var date = "";
			if (!sQuery) {
				oBinding.filter([]); // clear filter
				return;
			}
			// if (!isNaN(new Date(sQuery))) {
			// 	var dd = new Date(sQuery).getDate();
			// 	if (dd < 10) {
			// 		dd = "0" + dd;
			// 	}

			// 	var mm = new Date(sQuery).getMonth() + 1;
			// 	if (mm < 10) {
			// 		mm = "0" + mm;
			// 	}

			// 	let yyyy = new Date(sQuery).getFullYear();

			// 	date = `${yyyy}-${mm}-${dd}`;

			// 	oFilter = new sap.ui.model.Filter({
			// 		filters: [
			// 			new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sQuery),
			// 			new sap.ui.model.Filter("Risk", sap.ui.model.FilterOperator.Contains, sQuery)
			// 		],
			// 		and: false // OR condition
			// 	});
			// } else {
			oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Created_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_on", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Risk", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Created_by", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery)
				],
				and: false // OR condition
			});
			// }
			oBinding.filter(oFilter);
		},
		onRiskValueRange: function (oEvent) {
			const sQuery = oEvent.getParameter("newValue")?.trim();
			const oTable = this.byId("P3_RiskValueRange");
			var oBinding = oTable.getBinding("rows");
			var oFilter;
			var date = "";
			if (!sQuery) {
				oBinding.filter([]); // clear filter
				return;
			}
			// if (!isNaN(new Date(sQuery))) {
			// 	var dd = new Date(sQuery).getDate();
			// 	if (dd < 10) {
			// 		dd = "0" + dd;
			// 	}

			// 	var mm = new Date(sQuery).getMonth() + 1;
			// 	if (mm < 10) {
			// 		mm = "0" + mm;
			// 	}

			// 	let yyyy = new Date(sQuery).getFullYear();

			// 	date = `${yyyy}-${mm}-${dd}`;

			// 	oFilter = new sap.ui.model.Filter({
			// 		filters: [
			// 			new sap.ui.model.Filter("Created_On", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("Updated_On", sap.ui.model.FilterOperator.Contains, date),
			// 			new sap.ui.model.Filter("AML_Risk_Value_Low", sap.ui.model.FilterOperator.Contains, sQuery),
			// 			new sap.ui.model.Filter("AML_Risk_Value_High", sap.ui.model.FilterOperator.Contains, sQuery)
			// 		],
			// 		and: false // OR condition
			// 	});
			// } else {
			oFilter = new sap.ui.model.Filter({
				filters: [
					new sap.ui.model.Filter("Created_On", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_On", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("AML_Risk_Value_Low", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("AML_Risk_Value_High", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("AML_Risk", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Created_By", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("Updated_by", sap.ui.model.FilterOperator.Contains, sQuery),
					// new sap.ui.model.Filter("Created_On", sap.ui.model.FilterOperator.Contains, sQuery),
					// new sap.ui.model.Filter("Updated_On", sap.ui.model.FilterOperator.Contains, sQuery)
				],
				and: false // OR condition
			});
			// }
			oBinding.filter(oFilter);
		}

	});
});
