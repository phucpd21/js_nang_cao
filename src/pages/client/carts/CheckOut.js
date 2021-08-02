import Head from "../../../pages/client/components/Head";
import Header from "../../../pages/client/components/Header";
import Footer from "../../../pages/client/components/Footer";
import JsFile from "../../../pages/client/components/JsFile";
import Cart from './CART'
import ClientAPI from '../../../api/clientAPI'
import OrderAPI from '../../../api/orderAPI'
import OrderDetailAPI from '../../../api/orderDetailAPI'
// import 
const CheckOut = {
  async render(){
    Cart.init();
    const result = Cart.contents.map(item=> {
      return `

        <div class="single-item">
          <div class="single-item__thumb">
              <img src="${item.image}" alt="ordered item">
          </div>
          <div class="single-item__content">
              <a href="#">${item.name}</a>
              <span class="price">$${item.itemPrice} x ${item.quantity}</span>
          </div>
          <div class="single-item__remove">
            ${Cart.countMoneyOne(item.id)}$
          </div>
        </div>

      `;
    }).join('');

    return `

    <!doctype html>
    <html class="no-./lib/js" lang="en">


    <!-- Mirrored from demo.hasthemes.com/asbab-preview/asbab/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 03 Mar 2021 10:12:26 GMT -->
        ${await Head.render()}

    <body>
        <!-- Body main wrapper start -->
        <div class="wrapper">
            <!-- Start Header Style -->
            ${await Header.render()}
            <!-- End Header Area -->

            <!-- Start Category Area -->
            <section class="htc__category__area ptb--100">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title--2 text-center">
                            <h2 class="title__line" style='font-family: arial;text-transform: uppercase; font-size:35px'>
                            Check out</h2>
                        </div>
                    </div>
                </div>
                
                <div id='containCart'>

                <div class="checkout-wrap ptb--100">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="checkout__inner">
                            <div class="accordion-list">
                                <div class="accordion">
                                    <div class="accordion__title active">
                                        Checkout Method
                                    </div>
                                   
                                    <div class="accordion__body">
                                        <div class="bilinfo">
                                            <form action="#">
                                                <div class="row">
                                                  <div class="col-md-12">
                                                    <div class="single-input">
                                                            <input type="text" placeholder="Your fullname" id='name'>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="single-input">
                                                            <input type="text" placeholder="Delivery address " id='address'>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="single-input">
                                                            <input type="text" placeholder="City/State" id='city'>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="single-input">
                                                            <input type="text" placeholder="Post code/ zip" id='post_zip'>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="single-input">
                                                            <input type="email" placeholder="Email address" id='email'>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="single-input">
                                                            <input type="text" placeholder="Phone number" id='phone'>
                                                        </div>
                                                    </div>
                                                    <div class="accordion__title active" style='margin:15px 15px; width:100%'>
                                                      <span>Payment method: Cash<span>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="order-details">
                            <h5 class="order-details__title">Your Order (${Cart.countQuantity()} item)</h5>
                            <div class="order-details__item">
                                ${result}
                                
                            </div>
                            <div class="order-details__count">
                                <div class="order-details__count__single">
                                    <h5>sub total</h5>
                                    <span class="price">${Cart.countMoneyAll()}$</span>
                                </div>
                                <div class="order-details__count__single">
                                    <h5>Tax</h5>
                                    <span class="price">0</span>
                                </div>
                                <div class="order-details__count__single">
                                    <h5>Shipping</h5>
                                    <span class="price">0</span>
                                </div>
                            </div>
                            <div class="ordre-details__total">
                                <h5>Order total</h5>
                                <span class="price">${Cart.countMoneyAll()}$</span>
                            </div>
                        </div>
                        <ul class="dark-btn" style='width:100%' id='order_now'>
                            <li class="active"><a href="" style='width:100%; margin-top:15px'>
                            Order Now</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

                </div>
                
                </div>
            </section>
            <!-- End Category Area -->

            <!-- Start Footer Area -->
              ${await Footer.render()}
            <!-- End Footer Style -->
        </div>
        <!-- Body main wrapper end -->

        <!-- Placed ./lib/js at the end of the document so the pages load faster -->

        <!-- js -->
        ${await JsFile.render()}

    </body>


    </html>
    
    `;

  },
  async afterRender(){
    document.querySelector('#order_now').addEventListener('click',async e => {
      e.preventDefault();
     
      Cart.init();
      if(Cart.contents == []){
        window.location.hash('#/')
      }else{
        let err = false;
        const name = document.querySelector('#name').value;
        const address = document.querySelector('#address').value;
        const city = document.querySelector('#city').value;
        const post_zip = document.querySelector('#post_zip').value;
        const email = document.querySelector('#email').value;
        const phone = document.querySelector('#phone').value;
  
        if(!name || !address || !city || !post_zip || !email || !phone){
          err = true;
          alert('Hãy điền đầy đủ thông tin');
        }
        if(err == false){
          const infoClient = {
            id: Math.random().toString(36).substring(2,9),
            name: name,
            address: address,
            city: city,
            address: address,
            post_zip: post_zip,
            email: email,
            phone: phone,
          }
          const order = {
            id: Math.random().toString(36).substring(2,9),
            client_id: infoClient.id,
            created_at: new Date()
          }

          await ClientAPI.add(infoClient);
          await OrderAPI.add(order);
          Cart.contents.map(async item => {
            await OrderDetailAPI.add({
              id_order: order.id,
              id_product: item.id,
              name_product: item.name,
              price_product: item.itemPrice,
              quantity_product: item.quantity,
              image_product: item.image
            })
          })
          console.log('Đặt hàng xong')
          window.location.hash  = `#/invoice/${order.id}`
        //   setTimeout(()=>{
        //   },2000)
        }
      }

    });
  }
}
export default CheckOut;