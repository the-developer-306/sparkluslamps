document.addEventListener('DOMContentLoaded', () => {
     function appHeight() {
          const doc = document.documentElement;
          doc.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
     }

     window.addEventListener('resize', appHeight);
     appHeight();
     let pickrrContainer = document.createElement('div');
     pickrrContainer.id = 'pickrr-container';
     pickrrContainer.style.display = 'none';
     pickrrContainer.style.zIndex = '9999';
     pickrrContainer.style.position = 'fixed';
     pickrrContainer.style.top = '0';
     pickrrContainer.style.left = '0';
     pickrrContainer.style.height = '-webkit-fill-available';
     pickrrContainer.style.width = '100vw';
     pickrrContainer.style.justifyContent = 'center';
     pickrrContainer.style.alignItems = 'center';
     pickrrContainer.style.background = 'rgba(0,0,0,0.5)';

     let pickrrDiv = document.createElement('div');
     pickrrDiv.id = 'pickrr-div';
     if (window.innerWidth > 576) {
          pickrrDiv.style.height = '90vh';
     } else {
          pickrrDiv.style.height = '-webkit-fill-available';
     }
     if (window.innerWidth > 576) {
          pickrrDiv.style.width = '90vw';
     } else {
          pickrrDiv.style.width = '100vw';
     }
     pickrrDiv.style.opacity = '1';

     pickrrContainer.appendChild(pickrrDiv);

     let pickrrBtnContainer = document.createElement('div');
          pickrrBtnContainer.style.display = 'flex';
          pickrrBtnContainer.style.flexDirection = 'column';
     if (window.innerWidth > 576) {
          pickrrBtnContainer.style.height = '50px';
     } else {
          pickrrBtnContainer.style.height = '36px';
     }
     pickrrBtnContainer.style.padding = '10px 0';
     pickrrBtnContainer.style.boxSizing = 'border-box';
     pickrrBtnContainer.style.backgroundColor = '#f2f3fb';
     if (window.innerWidth > 576) {
          pickrrBtnContainer.style.borderRadius = '10px 10px 0px 0px';
     } else {
          pickrrBtnContainer.style.borderRadius = '0px';
     }

     pickrrDiv.appendChild(pickrrBtnContainer);

  if (window.innerWidth > 576) {
     let pickrrCloseBtn = document.createElement('img');
     pickrrCloseBtn.src ='https://d10srchmli830n.cloudfront.net/1639572185094_cross.png';
     pickrrCloseBtn.style.cursor = 'pointer';
     pickrrCloseBtn.style.marginRight = '10px';
     pickrrCloseBtn.style.alignSelf = 'flex-end';
     pickrrCloseBtn.style.height = '30px';
     pickrrCloseBtn.addEventListener('click', () => {
          document.getElementById('pickrr-container').style.display = 'none';
          document.getElementById('pickrr-iframe').remove();
     });

     pickrrBtnContainer.appendChild(pickrrCloseBtn);
  } else {

     let pickrrBackButton = document.createElement('img');
     pickrrBackButton.src ='https://d10srchmli830n.cloudfront.net/1639056105214_arrow1.svg';
     pickrrBackButton.style.cursor = 'pointer';
     pickrrBackButton.style.marginLeft = '10px';
     pickrrBackButton.style.alignSelf = 'flex-start';
     pickrrBackButton.addEventListener('click', () => {
          document.getElementById('pickrr-container').style.display = 'none';
          document.getElementById('pickrr-iframe').remove();
     });

     pickrrBtnContainer.appendChild(pickrrBackButton);
  }

  document.body.appendChild(pickrrContainer);

     if (new URLSearchParams(window.location.search).get('checkout_id')) {
          openAbandonedCheckout(
               new URLSearchParams(window.location.search).get('checkout_id')
          );
     }
});
const postData = async (data) => {
  const config = {
    method: 'POST',
    //body: JSON.stringify(data),
    body: data,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Api URL
  const response = await fetch(
    // 'https://checkout-dev.pickrr.com/users/checkout/init/',
    'https://pickout.pickrr.com/users/checkout/init/',
    config
  );
  const json = await response.json();
  return json;
};

const product_details = async (url) => {
    var product_details_get = await fetch("https://" + url,{
          method: 'GET'
      }
    );
    const arr = await product_details_get.json();
    return arr;
    //return await product_details_get.json();
    //console.log(json_product);

    jQuery.each(arr, function(product_id, product_details) {
      // jQuery.each(val.get_data, function(i, get_data) {
      //   console.log(get_data);
      // });
    });
    return '';
}
function call_fasterr_popup() {
  let pickrrIframe = document.createElement('iframe');
  pickrrIframe.id = 'pickrr-iframe';
  pickrrIframe.frameBorder = '0';
  if (window.innerWidth > 576) {
      pickrrIframe.style.height = 'calc(90vh - 50px)';
  } else {
      pickrrIframe.style.height = 'calc(calc(var(--vh, 1vh) * 100) - 36px)';
  }
  if (window.innerWidth > 576) {
      pickrrIframe.style.width = '90vw';
  } else {
      pickrrIframe.style.width = '100vw';
  }
      pickrrIframe.style.margin = '0';
  if (window.innerWidth > 576) {
      pickrrIframe.style.borderRadius = '0px 0px 10px 10px';
  } else {
      pickrrIframe.style.borderRadius = '0px';
  }
  pickrrIframe.style.backgroundColor = '#fff';
  document.getElementById('pickrr-div').appendChild(pickrrIframe);
}
const openCheckoutOutsideCart = () => {
    call_fasterr_popup();
    const getProductDetails = async () => {
          // cart clear
        const clearCart = document.getElementById('fastrr-checkout-btn-2').dataset.cart;
        const productResponse = await fetch(clearCart, {
            method: 'GET',
        });
        // add to cart start
        const formData = new FormData();
        //  cart form values get
        const form = document.getElementById('fastrr-checkout-btn-2').form;
        const checkout_info = [];
        for (let i = 0; i < form.length; i++) {
            if (form.elements[i].name != '') {
                checkout_info[form.elements[i].name] = form.elements[i].value;
                formData.append(form.elements[i].name, form.elements[i].value);
            }
        }

        //console.log(checkout_info, "cart form values get");
        const addtocartUrl = document.getElementById('fastrr-checkout-btn-2').dataset.addtocart;
        const productResponse_wew = await fetch(addtocartUrl, {
            method: 'POST',
            body: formData
        });
        // add to cart end

        const domain_name = document.getElementById('fastrr-checkout-btn-2').dataset.domain;
        // refreshed_fragments start
        const datetimestamp = new FormData();
        datetimestamp.append("time", Date.now());
        const get_refreshed_fragments = await fetch(domain_name + "/?wc-ajax=get_refreshed_fragments", {
            method: 'POST',
            body: datetimestamp
        });
        // refreshed_fragments end

          var variation_id = 0;
          if (checkout_info.variation_id != undefined) {
               variation_id = checkout_info.variation_id;
          }
          var product_ids = checkout_info['add-to-cart'];

          // get product info rest_api start ***********************************************************
          /*
          var url = domain_name + "/wp-json/wc/v3/product/" + product_ids + "/variation/" + variation_id + "";
          const product_data_json = await product_details(url);
          if (jQuery.isEmptyObject(product_data_json) || product_data_json.error != undefined) {
               return '';
          }
          // get product info rest_api end

          const getId = checkout_info['add-to-cart'];
          const img = product_data_json[getId].get_data.img;//document.getElementById('product_info').dataset.img;
          const title = product_data_json[getId].get_data.name;//document.getElementById('product_info').dataset.title;
          const quantity = checkout_info.quantity;
          const token = document.getElementById('product_info').dataset.token;
          const sku = product_data_json[getId].get_data.sku//document.getElementById('product_info').dataset.sku;

          var price = 0;//document.getElementById('product_info').dataset.price;
          var original_price = 0;//document.getElementById('product_info').dataset.price;

          if (product_data_json[getId] != undefined && product_data_json[getId].get_data != undefined && product_data_json[getId].get_data.price != undefined) {
               price = product_data_json[getId].get_data.price;
               original_price = product_data_json[getId].get_data.price;;
          }
          if (price == 0) {
               console.log("Invalid price.");
               return '';
          }
          //  end ***********************************************************

          */

          const getId = checkout_info['add-to-cart'];
          const img = document.getElementById('product_info').dataset.img;
          const title = document.getElementById('product_info').dataset.title;
          const quantity = checkout_info.quantity;
          const token = document.getElementById('product_info').dataset.token;
          const sku = document.getElementById('product_info').dataset.sku;

          var price = document.getElementById('product_info').dataset.price;
          var original_price = document.getElementById('product_info').dataset.price;


          let dimensions = '';
          /*
          const weight = document.getElementById('product_info').dataset.weight;
          const length = document.getElementById('product_info').dataset.length;
          const breadth = document.getElementById('product_info').dataset.breadth;
          const height = document.getElementById('product_info').dataset.height;
          if (weight != undefined && weight != '') {
               dimensions += `"weight":` + weight + ` ,`;
          }
          if (length != undefined && length != '') {
               dimensions += `"length":` + length + ` ,`;
          }
          if (breadth != undefined && breadth != '') {
               dimensions += `"breadth":` + breadth + ` ,`;
          }
          if (height != undefined && height != '') {
               dimensions += `"height":` + height.toString() + ` ,`;
          }
          */

          const data = `{
           "order_details": {
             "token": "` + token + `",
             "note": null,
             "attributes": {},
             "original_total_price": ` + original_price + `,
             "total_price": ` + (price * 100) * quantity + `,
             "total_discount": 0,
             "total_weight": 0,
             "item_count": 1,
             "taxes_included": false,
             "items": [{
               "id": ` + getId + `,
               "properties": null,
               "quantity": ` + quantity + `,
               "variant_id": ` + getId + `,
               "variation_id": ` + variation_id + `,
               "product_id": ` + getId + `,
               "key": "39538580717670:f35ab36bca5cc742fdbdfc5b806684a6",
               "title": "` + title + `",
               "price": ` + price * 100 + `,
               "original_price": ` + original_price * 100 + `,
               "discounted_price": 0,
               "line_price": 0,
               "original_line_price": 100,
               "total_discount": 100,
               "discounts": [{
                 "amount": 100,
                 "title": "auto"
               }],
               "sku": "` + sku + `",
               "grams": 0,
               "vendor": "",
               "taxable": true,
               "product_has_only_default_variant": false,
               "gift_card": false,
               "final_price": 100,
               "final_line_price": 100,
               "url": "/products/rupa-shirts?variant=39538580717670",
               "featured_image": {
                 "aspect_ratio": 1,
                 "alt": "Cap",
                 "height": 300,
                 "url": "` + img + `",
                 "width": 300
               },
               ` + dimensions + `
               "image": "` + img + `",
               "handle": "rupa-shirts",
               "requires_shipping": true,
               "product_type": "",
               "product_title": "Cap",
               "product_description": "",
               "variant_title": "small",
               "variant_options": ["small"],
               "options_with_values": [{
                 "name": "Size",
                 "value": "small"
               }],
               "line_level_discount_allocations": [],
               "line_level_total_discount": 0
             }],
             "requires_shipping": true,
             "currency": "INR",
             "items_subtotal_price": 100
           },
           "domain": "` + domain_name + `"
         }`;
        // Api URL
        const postResponse = await postData(data);
        if (postResponse.success == true) {
            document.getElementById(
                'pickrr-iframe'
            ).src = `https://checkout-pickrr.netlify.app/?checkoutId=${postResponse.data.checkout_id}`;
            //.src = `https://checkout-dev.netlify.app/?checkoutId=${postResponse.data.checkout_id}`;
        }
        document.getElementById('pickrr-container').style.display = 'flex';
     };
    getProductDetails();
};
