sap.ui.define([
    "sap/ui/core/UIComponent",
    "zaml/model/models",
    "sap/ui/Device",
	"sap/ui/model/json/JSONModel",
], (UIComponent, models,Device,JSONModel) => {
    "use strict";

    return UIComponent.extend("zaml.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        	init() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments); 

			// set data model on view
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			window.globalVariable = 0;
			this.setModel(oModel);

			// set device model
			const oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		getContentDensityClass() {
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
    });
});