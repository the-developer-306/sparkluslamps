const settings = window.wc.wcSettings.getSetting("phonepe_data", {});
const Content = () => {
	return window.wp.htmlEntities.decodeEntities( settings.description || '' );
};

const PPEX_Block_Gateway = {
  name: "phonepe",
  label: "PhonePe Payment Solutions",
  content: Object( window.wp.element.createElement )( Content, null ),
  edit: Object( window.wp.element.createElement )( Content, null ),
  canMakePayment: () => true,
  ariaLabel: "PhonePe Payment Solutions",
  supports: {
    features: settings.supports,
  },
};

window.wc.wcBlocksRegistry.registerPaymentMethod(PPEX_Block_Gateway);
