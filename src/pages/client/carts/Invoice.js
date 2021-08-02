import Head from "../../../pages/client/components/Head";
import Header from "../../../pages/client/components/Header";
import Footer from "../../../pages/client/components/Footer";
import JsFile from "../../../pages/client/components/JsFile";
import Cart from './CART'
import { parseRequestUrl } from '../../../utils'
import ClientAPI from '../../../api/clientAPI'
import OrderAPI from '../../../api/orderAPI'
import OrderDetailAPI from '../../../api/orderDetailAPI'

const Invoice = {
  async render(){
    Cart.init();
    const {id} = parseRequestUrl();
    const {data:orders } =  await OrderAPI.getAll();
    

    const order = orders.find(item => item.id == id);
    console.log('order',order);
    
    

    if(!order){
        window.location.hash = '/';
    }else{
        const {data:orderproducts} = await OrderDetailAPI.getAll();
        const {data:clients} = await ClientAPI.getAll();
        const orderdetails = orderproducts.filter(item => item.id_order == id);
        // console.log('orderdetails',orderdetails)
        
        const client = clients.find(item => item.id == order.client_id);
        // console.log('client',client);
        
        const DATE = new Date(order.created_at);
        const year =  DATE.getFullYear()
        const month =  DATE.getMonth()
        const day =  DATE.getDay()
        const hours =  DATE.getHours()
        const minutes =  DATE.getMinutes()
        const time = `${day}-${month}-${year} ${hours}h:${minutes}`
        console.log('năm:',time)

        let count = 0;
    const result = orderdetails.map(item=> {
        count += item.price_product*item.quantity_product;
        
      return `

        <tr>
            <td>${item.id_product}</td>
            <td class="">${item.name_product}</td>
            <td class="text-center">$${item.price_product}</td>
            <td class="text-center">${item.quantity_product}</td>
            <td class="text-right">$${item.price_product*item.quantity_product}</td>
        </tr>

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
                

                <!-- Content -->
                <br>
                <div style='width:80%; margin: 0 auto'>
                  <div class="row">
                    <div class="" style='width:100%'>
                        <div class="invoice-title">
                            <h2>Invoice</h2>
                            <h3 class="pull-right">Order # 12345</h3>
                        </div>
                        <hr>
                        <div class="" style="display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 20px;">
                            <div class="">
                                <address>
                                    <strong>Billed To:</strong><br>
                                    ${client.name}<br>
                                    ${client.address}<br>
                                </address>
                            </div>
                            <div class="" style="text-align: right;">
                                <address>
                                    <strong>Shipped To:</strong><br>
                                    ${client.name}<br>
                                    ${client.address}<br>
                                </address>
                            </div>
                        </div>
                
                        <div class="" style="display: grid; grid-template-columns: 1fr 1fr;">
                            <div class="col-xs-6">
                                <address>
                                    <strong>Payment Method:</strong><br>
                                    Visa ending **** 4242<br>
                                    jsmith@email.com
                                </address>
                            </div>
                            <div class="col-xs-6 text-right"  style="text-align: right;" >
                                <address>
                                    <strong>Order Date:</strong><br>
                                    ${time}<br><br>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="" style='width:100%'>
                        <div class="panel panel-default">
                
                            <div class="panel-heading">
                                <h3 class="panel-title"><strong>Order summary</strong></h3>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table style="width: 100%; color:black" class=" table table-condensed">
                                        <thead>
                                            <tr>
                                                <td><strong>Mã SP</strong></td>
                                                <td><strong>Tên SP</strong></td>
                                                <td class="text-center"><strong>Đơn giá</strong></td>
                                                <td class="text-center"><strong>Số lượng</strong></td>
                                                <td class="text-right"><strong>Tổng</strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- foreach ($order->lineItems as $line) or some such thing here -->
                                            ${result}
                                            <tr >
                                                <td style='border-top:1px solid black'></td>
                                                <td style='border-top:1px solid black'></td>
                                                <td style='border-top:1px solid black'></td>
                                                <td style='border-top:1px solid black'  class="text-center">Tổng phụ</td>
                                                <td style='border-top:1px solid black' class='text-right'>$${count}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td class=""></td>
                                                <td class="text-center"></td>
                                                <td class="text-center">Vận chuyển</td>
                                                <td class="text-right"></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td class=""></td>
                                                <td class="text-center"></td>
                                                <td class="text-center">Tổng Chính</td>
                                                <td class="text-right">$${count}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                
                          </div>
                      </div>
                  </div>
                  </div>
                <!-- End-content -->
                

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
    }

  },
  async afterRender(){

  }
}
export default Invoice;