sap.ui.define([], () => {
	"use strict";

	return {
		// formatDateMMDDYYYY: function (sDate) {
		// 	// If it's an object, try to extract the actual date value
		// 	if (typeof sDate === 'object' && sDate !== null) {
		// 		if (sDate instanceof Date) {
		// 			// Already a valid Date
		// 		} else if (sDate.hasOwnProperty("Updated_on")) {
		// 			sDate = sDate.Updated_on;
		// 		} else if (Object.keys(sDate).length === 0) {
		// 			return "";
		// 		} else {
		// 			// Try to extract a likely date field
		// 			const possibleDate = Object.values(sDate)[0];
		// 			sDate = possibleDate;
		// 		}
		// 	}

		// 	if (
		// 		sDate === null ||
		// 		sDate === undefined ||
		// 		sDate === '' ||
		// 		sDate === 'NULL'
		// 	) {
		// 		return "";
		// 	}

		// 	const date = new Date(sDate);
		// 	if (isNaN(date.getTime())) return "";

		// 	const mm = String(date.getMonth() + 1).padStart(2, '0');
		// 	const dd = String(date.getDate()).padStart(2, '0');
		// 	const yyyy = date.getFullYear();


		// 	return sap.ui.core.format.DateFormat.getDateInstance({
		// 		pattern: "dd.MM.yyyy",
		// 		strictParsing: true,
		// 		UTC: true
		// 	}).format(date);
		// 	// return `${mm}-${dd}-${yyyy}`;
		// 	// return `${yyyy}-${mm}-${dd}`;
		// 	// return `${dd}-${mm}-${yyyy}`;
		// },

		formatDateMMDDYYYY: function (sDate) {
			if (typeof sDate === 'object' && sDate !== null) {
				if (sDate instanceof Date) {
					// already a date object, use as is
				} else if (sDate.hasOwnProperty("Updated_on")) {
					sDate = sDate.Updated_on;
				} else if (Object.keys(sDate).length === 0) {
					return "";
				} else {
					sDate = Object.values(sDate)[0];
				}
			}

			if (!sDate || sDate === 'NULL') {
				return "";
			}

			let date;

			// If input is a Date object, use it
			if (sDate instanceof Date) {
				date = sDate;
			} else {
				// Try to parse string in dd.MM.yyyy format
				const oDateFormat = sap.ui.core.format.DateFormat.getInstance({
					pattern: "dd.MM.yyyy",
					strictParsing: true
				});

				date = oDateFormat.parse(sDate);

				if (!date) {
					// Fallback: try native Date parsing (e.g. ISO format)
					date = new Date(sDate);
				}
			}

			if (!date || isNaN(date.getTime())) {
				return "";
			}

			// Format date to dd.MM.yyyy
			return sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			}).format(date);
		},





		formatCleanText: function (value) {
			// Return empty string if value is null, undefined, empty string, or an object
			if (!value || typeof value === "object" || value === "undefined" || value === "") {
				return "";
			}
			return value;
		},

		formatI18nCount: function (sText, iCount) {
			return sText.replace("{0}", iCount || 0);
		},


		getRiskStatus: function (sValue) {
			if (!sValue) return "None";
			switch (sValue.toLowerCase()) {
				case "high": return "Error";     // red
				case "medium": return "Warning"; // yellow
				case "low": return "Success";    // green
				default: return "None";
			}
		},
		getActionStatus: function (sValue) {
			if (!sValue) return "None";
			switch (sValue) {
				case "Updated": return "Success";     // green
				case "Created": return "Success";     // green
				case "Delete": return "Error"; // red 
				default: return "None";
			}
		},
		formatIndustryCodes: function (aIndustryCodes) {
			if (!Array.isArray(aIndustryCodes)) {
				const industry = aIndustryCodes?.Industry?.["#text"] || "";
				// const desc = aIndustryCodes?.Description?.["#text"] || "";
				return industry ? `${industry}` : "";
			} else {
				return aIndustryCodes.map(code => {
					const industry = code.Industry?.["#text"] || "";
					return industry ? `${industry}` : "";
					// const desc = code.Description?.["#text"] || "";
					// return industry && desc ? `${industry} - ${desc}` : "";
				}).filter(Boolean).join(", ");
			}
		},
		formatCustomertype: function (aIndustryCodes) {
			if (!Array.isArray(aIndustryCodes)) {
				const industry = aIndustryCodes?.Industry?.["#text"] || "";
				// const desc = aIndustryCodes?.Description?.["#text"] || "";
				return industry ? `${industry}` : "";
			} else {
				return aIndustryCodes.map(code => {
					const industry = code.Industry?.["#text"] || "";
					return industry ? `${industry}` : "";
					// const desc = code.Description?.["#text"] || "";
					// return industry && desc ? `${industry} - ${desc}` : "";
				}).filter(Boolean).join(", ");
			}
		},
		formatCountryCodes: function (aIndustryCodes) {
			if (!Array.isArray(aIndustryCodes)) {
				const industry = aIndustryCodes?.Industry?.["#text"] || "";
				// const desc = aIndustryCodes?.Description?.["#text"] || "";
				return industry ? `${industry}` : "";
			} else {
				return aIndustryCodes.map(code => {
					const industry = code.Industry?.["#text"] || "";
					return industry ? `${industry}` : "";
					// const desc = code.Description?.["#text"] || "";
					// return industry && desc ? `${industry} - ${desc}` : "";
				}).filter(Boolean).join(", ");
			}
		}

	};
});
