const callback = (response) => {
  if (response == "CONCLUDED") {
    var img = document.createElement("img");
    img.src = ppex_data.img_src;
    img.classList.add("pp_pay_loader");
    var html = img;

    jQuery("body").addClass("pp_loader");
    jQuery(".woocommerce-order-pay ul.order_details").append(html);
    window.location.replace(ppex_data.defult_callback_url);
  }
  if (response == "USER_CANCEL") {
    var img = document.createElement("img");
    img.src = ppex_data.img_src;
    img.classList.add("pp_pay_loader");
    var html = img;
    jQuery("body").addClass("pp_loader");
    jQuery(".woocommerce-order-pay ul.order_details").append(html);

    window.location.replace(ppex_data.checkout_url);
  }
};
document.querySelectorAll("li.method strong")[0].innerHTML = ppex_data.payment_method_name;
console.log('ppex_data.paypage_loading_mode', ppex_data.paypage_loading_mode);
window.PhonePeCheckout.transact({
  tokenUrl: ppex_data.redirect_pay_url,
  callback,
  type: ppex_data.paypage_loading_mode
});
