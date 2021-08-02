import ProductAPI from "../../../api/productAPI";
import Head from "../../../pages/client/components/Head";
import Header from "../../../pages/client/components/Header";
import Footer from "../../../pages/client/components/Footer";
import JsFile from "../../../pages/client/components/JsFile";
import CART from "./CART";
import { $ } from "../../../utils";
const CartPage = {
    async render() {
        const { data: PRODUCTS } = await ProductAPI.getAll();
        await CART.init();

        CART.logContents("Load lại");
        
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
                                <div class="section__title--2 text-center" style='margin-bottom:30px'>
                                <h2 class="title__line" style='font-family: arial;text-transform: uppercase; font-size:35px'>
                                Giỏ hàng</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div id='containCart'>
                        ${await CartPage.ChildRender()}
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
    async ChildRender(){
        let resultCart = "";
        if (CART.contents == "") {
            resultCart = "Giỏ hàng trống";
        } else {
            console.log(CART.contents);
            const resultTr = CART.contents.map((item) => {
                return `
            <tr style='font-family:Poppins' class='itemProductCart' data-id=${item.id}>
              <td class="product-thumbnail"><a href="#"><img src="${item.image}" alt="product img"></a></td>
              <td class="product-name" style='font-weight:600'> ${item.name}</td>
              <td class="product-price"><span class="amount">$${item.itemPrice}</span></td>
              <td class="product-quantity" >
                <div style='display:flex; flex-direction:row; justify-content:center; align-content:center'>
                <div class='btnReduceP' style='cursor:pointer; font-size:15px; background-color:#ccc'>➖</div>
                <div class='quantityP' style='margin:0 15px; font-size:15px; color:black'>${item.quantity}</div>
                <div class='btnIncreaseP' style='cursor:pointer; font-size:15px; background-color:#ccc'>➕</div>
                </div>
              </td>
              <td class="product-subtotal totalOne">$${CART.countMoneyOne(item.id)}</td>
              <td class="product-remove">
                <div class='btnRemoveP' style='display:inline-block; cursor:pointer'>
                  <i class="icon-trash icons"></i>
                </div>
              </td>
            </tr>
          `;
            }).join('');
            resultCart = `

          <div class="row">
            <div class="col-lg-12" >
              <form action="#">               
                  <div class="table-content table-responsive">
                      <table>
                          <thead>
                              <tr>
                                  <th class="product-thumbnail">products</th>
                                  <th class="product-name">name of products</th>
                                  <th class="product-price">Price</th>
                                  <th class="product-quantity">Quantity</th>
                                  <th class="product-subtotal">Total</th>
                                  <th class="product-remove">Remove</th>
                              </tr>
                          </thead>
                          <tbody>
                              
                          ${resultTr}
                              
                          </tbody>
                      </table>
                  </div>

                  <div class="row">
                    <div class="col-lg-12">
                        <div class="buttons-cart--inner">
                            <div class="buttons-cart">
                                <a href="#">Continue Shopping</a>
                                
                            </div>

                            <div class="col-lg-6 smt-40 xmt-40">
                                <div class="htc__cart__total">
                                    <h6>cart total</h6>
                                    <div class="cart__desk__list">
                                        <ul class="cart__desc">
                                            <li>cart total</li>
                                            <li>tax</li>
                                            <li>shipping</li>
                                        </ul>
                                        <ul class="cart__price">
                                            <li class='cartTotal'>$${CART.countMoneyAll()}</li>
                                            <li>$0</li>
                                            <li>$0</li>
                                        </ul>
                                    </div>
                                    <div class="cart__total">
                                        <span>order total</span>
                                        <span class='moneyPay'>$${CART.countMoneyAll()}</span>
                                    </div>
                                    <ul class="payment__btn">
                                        <li class="active"><a href="#/checkout">Check Out</a></li>
                                      
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                  
              </form> 
            </div>
          </div>

        `;
        }
        return resultCart;
    },
    async afterRender() {
        document.querySelector("#qtyCart").innerHTML = CART.countQuantity();
        let itemProductCart = document.getElementsByClassName("itemProductCart");
        itemProductCart = [...itemProductCart];
        // console.log(itemProductCart)
        itemProductCart.map((item) => { 
            let id = item.dataset.id;
            // Tăng
            item.getElementsByClassName('btnIncreaseP')[0].addEventListener('click', ()=>{
                CART.increase(id);
                item.getElementsByClassName('totalOne')[0].innerHTML = '$'+CART.countMoneyOne(id);
                document.querySelector("#qtyCart").innerHTML = CART.countQuantity();
                item.getElementsByClassName('quantityP')[0].innerHTML = (CART.contents.filter(i => i.id == id)[0]).quantity;
                // console.log(document.getElementsByClassName('cartTotal'))
                document.getElementsByClassName('cartTotal')[0].innerHTML = `$${CART.countMoneyAll()}`;
                document.getElementsByClassName('moneyPay')[0].innerHTML = `$${CART.countMoneyAll()}`;
            });
            // Giảm
            item.getElementsByClassName('btnReduceP')[0].addEventListener('click', async()=>{
                if(await CART.reduce(id) == true){
                    item.getElementsByClassName('totalOne')[0].innerHTML = '$'+CART.countMoneyOne(id);
                    item.getElementsByClassName('quantityP')[0].innerHTML = (CART.contents.filter(i => i.id == id)[0]).quantity;
                    document.getElementsByClassName('cartTotal')[0].innerHTML = `$${CART.countMoneyAll()}`;
                    document.getElementsByClassName('moneyPay')[0].innerHTML = `$${CART.countMoneyAll()}`;
                }else{
                    document.getElementById('containCart').innerHTML = await CartPage.ChildRender();
                    await CartPage.afterRender();
                };
                document.querySelector("#qtyCart").innerHTML = CART.countQuantity();
            });
            // Xóa 
            item.getElementsByClassName('btnRemoveP')[0].addEventListener('click', async ()=>{
                CART.remove(id);
                document.getElementById('containCart').innerHTML = await CartPage.ChildRender();
                await CartPage.afterRender();
            });
            
        });

        
    },
    
};
export default CartPage;
