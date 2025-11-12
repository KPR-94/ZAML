sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zaml.controller.App", {
     onInit() {
      // var flight="";
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
  });
});