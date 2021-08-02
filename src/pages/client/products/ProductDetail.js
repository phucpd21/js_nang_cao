// import data from '../data.js'
import { parseRequestUrl } from '../../../utils.js'
import Head from '../../../pages/client/components/Head'
import Header from '../../../pages/client/components/Header'
import Footer from '../../../pages/client/components/Footer'
import JsFile from '../../../pages/client/components/JsFile'
import ProductAPI from '../../../api/productAPI'
import categoryAPI from '../../../api/categoryAPI'
import CART from '../../../pages/client/carts/CART';

const ProductDetail = {
  async render(){
    const { id } = parseRequestUrl()
    const { data : product } = await ProductAPI.get(id);
    const { data : products } = await ProductAPI.getAll();

    // Sản phẩm liên quan
    const product_relate = [];
    products.map(item => {
      if(item.categoryId == product.categoryId && item.status == true){
        product_relate.push(item); 
      }
    })

    // Sản phẩm liên quan
    const result_relate = product_relate.map(item => {
      return `
      <!-- Start Single Product -->
      <div class="col-lg-3 col-md-6">
      <div class="category">
          <div class="ht__cat__thumb">
              <a href='#/products/${item.id}'> 
                <img src="${item.image}" alt="product images"> 
              </a>
          </div>
          <div class="fr__hover__info">
              <ul class="product__action">
                  <li><a href="wishlist.html"><i class="icon-heart icons"></i></a></li>

                  <li><a href="cart.html"><i class="icon-handbag icons"></i></a></li>

                  <li><a href="#"><i class="icon-shuffle icons"></i></a></li>
              </ul>
          </div>
          <div class="fr__product__inner">
              <h4><a href="#/products/${item.id}">${item.name}</a></h4>
              <ul class="fr__pro__prize">
                  <li class="old__prize">$${item.price_old}</li>
                  <li>$${item.price_new}</li>
              </ul>
            </div>
          </div>
      </div>
      <!-- End Single Product -->
      `;
    }).join("");

    // Tạo html rating
    let startSring = '';
    for(let i = 1; i <= 5; i++){
        if(i <= product.star){
            startSring+='<li><i class="icon-star icons"></i></li>';
        } else {
            startSring+='<li class="old"><i class="icon-star icons"></i></li>';
        }
    }

    // Tạo giá trị trạng thái kho hàng
    if(product.status == true){
        status = `In stock`
      } else{
        status = `Out of stock`
      }

    // Lấy tên danh mục sản phẩm
    const {data: category} = await categoryAPI.get(product.categoryId);
    
    const result_detail = `
    <div class="row">
    <div class="col-lg-5">
        <div class="htc__product__details__tab__content">

            <!-- Start Product Big Images -->
            <div class="product__big__images">
                <div class="portfolio-full-image tab-content">
                    <div role="tabpanel" class="tab-pane fade show active" id="img-tab-1">
                        <img src="${product.image}" alt="full-image">
                    </div>
                </div>
            </div>
            <!-- End Product Big Images -->

        </div>
    </div>
    <div class="col-lg-7 smt-40 xmt-40">
        <div class="ht__product__dtl">
            <h2 style='font-size:30px'>${product.name}</h2>
            <h6>Model: <span>${product.id}</span></h6>
            <ul class="rating">
                ${startSring}
            </ul>
            <ul class="pro__prize">
                <li class="old__prize" style='text-decoration: line-through;'>$${product.price_old}</li>
                <li>$${product.price_new}</li>
            </ul>
            <p class="pro__info">
                ${product.desc}
            </p>
            <div class="ht__pro__desc">
                <div class="sin__desc">
                    <p><span>Availability:</span> ${status}</p>
                </div>
                <div class="sin__desc align--left">
                    <p><span>Categories:</span></p>
                    <ul class="pro__cat__list">
                        <li><a href="#/categories/${category.id}">${category.name}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div style='display:flex; flex-direction: row; align-items:flex-center; margin-top:10px'> 
            <div><input id='quantityInput' type='number' min=1 value=1 style='width:50px; padding:1px 0px'></div>
            <div>
                <button id='addToCart' type='button' style='border-radius:1px;font-size:13px; margin-left:5px;
                font-family:arial; padding:1px 5px; cursor:pointer;'>
                    Add to cart
                </button> 
            </div>
        </div>
    </div>
</div>
    `;


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

        
        <!-- Start Offset Wrapper -->
        <div class="offset__wrapper">
            
            <!-- Start Cart Panel -->
            <div class="shopping__cart">
                <div class="shopping__cart__inner">
                    <div class="offsetmenu__close__btn">
                        <a href="#"><i class="zmdi zmdi-close"></i></a>
                    </div>
                    <div class="shp__cart__wrap">
                        <div class="shp__single__product">
                            <div class="shp__pro__thumb">
                                <a href="#">
                                    <img src="./lib/images/product-2/sm-smg/1.jpg" alt="product ./lib/images">
                                </a>
                            </div>
                            <div class="shp__pro__details">
                                <h2><a href="product-details.html">BO&Play Wireless Speaker</a></h2>
                                <span class="quantity">QTY: 1</span>
                                <span class="shp__price">$105.00</span>
                            </div>
                            <div class="remove__btn">
                                <a href="#" title="Remove this item"><i class="zmdi zmdi-close"></i></a>
                            </div>
                        </div>
                        <div class="shp__single__product">
                            <div class="shp__pro__thumb">
                                <a href="#">
                                    <img src="./lib/images/product-2/sm-smg/2.jpg" alt="product ./lib/images">
                                </a>
                            </div>
                            <div class="shp__pro__details">
                                <h2><a href="product-details.html">Brone Candle</a></h2>
                                <span class="quantity">QTY: 1</span>
                                <span class="shp__price">$25.00</span>
                            </div>
                            <div class="remove__btn">
                                <a href="#" title="Remove this item"><i class="zmdi zmdi-close"></i></a>
                            </div>
                        </div>
                    </div>
                    <ul class="shoping__total">
                        <li class="subtotal">Subtotal:</li>
                        <li class="total__price">$130.00</li>
                    </ul>
                    <ul class="shopping__btn">
                        <li><a href="cart.html">View Cart</a></li>
                        <li class="shp__checkout"><a href="checkout.html">Checkout</a></li>
                    </ul>
                </div>
            </div>
            <!-- End Cart Panel -->


        </div>
        <!-- End Offset Wrapper -->
        
        <!-- Start Category Area -->
        <section class="htc__category__area ptb--100">
            <div class="container">
                ${result_detail}
            </div>
        </section>
        <!-- End Category Area -->

        
        
        
        <!-- Start Relate Area -->
        <section class="top__rated__area bg__white pt--100 pb--110">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section__title--2 text-center">
                            <h2 class="title__line">Product Relate</h2>
                        </div>
                    </div>
                </div>
                <div class="row mt--20">
                    ${result_relate}
                </div>
            </div>
        </section>
        <!-- End Relate Area -->
        <!-- Start Brand Area -->
        <div class="htc__brand__area bg__cat--4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ht__brand__inner">
                            <ul class="brand__list owl-carousel clearfix">
                                <li><a href="#"><img src="./lib/images/brand/1.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/2.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/3.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/4.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/5.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/5.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/1.png" alt="brand ./lib/images"></a></li>
                                <li><a href="#"><img src="./lib/images/brand/2.png" alt="brand ./lib/images"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Brand Area -->
       
        <!-- End Banner Area -->
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
    `
  },
  async afterRender(){
      const { id } = parseRequestUrl()
      const { data: PRODUCTS }  = await ProductAPI.getAll();
      const { data : product } = await ProductAPI.get(id);

    document.querySelector('#addToCart').addEventListener('click', async ()=>{
        const inputVa = document.querySelector('#quantityInput').value;
        console.log(inputVa);
        if(isNaN(inputVa) || inputVa == '' || inputVa <= 0){
            alert('Số lượng sản phẩm không hợp lệ');
        } else {
            CART.add(id,inputVa,PRODUCTS);
            document.querySelector('#qtyCart').innerHTML = CART.countQuantity();
            CART.logContents('thêm');
            alert('Đã thêm vào giỏ hàng');
        }
    });
  }
}
export default ProductDetail