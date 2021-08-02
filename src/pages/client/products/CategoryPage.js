import ProductAPI from "../../../api/productAPI"
import categoryAPI from "../../../api/categoryAPI"
import { parseRequestUrl } from "../../../utils"
import Head from '../../../pages/client/components/Head'
import Header from '../../../pages/client/components/Header'
import Footer from '../../../pages/client/components/Footer'
import JsFile from '../../../pages/client/components/JsFile'
import ComponentsTop from '../../../pages/client/components/ComponentTop'

const CategoryPage = {
  async render(){

    const { id } = parseRequestUrl()
    const products = (await ProductAPI.getAll()).data;
    const category_name = (await categoryAPI.get(id)).data.name;

    const products_cate = [];
    products.map(item => {
      if(item.categoryId == id && item.status == true ){
        products_cate.push(item); 
      }
    })
    const result = products_cate.map(product => {
      return `
  
      <!-- Start Single Category -->
        <div class="col-xl-3 col-md-4 item-product">
            <div class="category">
                <div class="ht__cat__thumb">
                    <a href="#/products/${product.id}">
                        <img src="${product.image}" alt="${product.image}">
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
                    <h4><a href="#/products/${product.id}">${product.name}</a></h4>
                    <ul class="fr__pro__prize">
                        <li class="old__prize">$${product.price_old}</li>
                        <li>$<span class='new-price'>${product.price_new}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Single Category -->
  
      `;
    }).join("");
    
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
                                ${category_name}</h2>
                          </div>
                      </div>
                  </div>
                        ${await ComponentsTop.render()}
                  <div class="row product-list-area mt--30">
                  
                        ${result}
  
                  </div>
              </div>
          </section>
          <!-- End Category Area -->
  
          
          
          
          <!-- Start Top Rated Area -->
          <section class="top__rated__area bg__white pt--100 pb--110">
              <div class="container">
                  <div class="row">
                      <div class="col-lg-12">
                          <div class="section__title--2 text-center">
                              <h2 class="title__line">Top Rated</h2>
                              <p>But I must explain to you</p>
                          </div>
                      </div>
                  </div>
                  <div class="row mt--20">
                      <!-- Start Single Product -->
                      <div class="col-xl-4 col-md-6">
                          <div class="htc__best__product">
                              <div class="htc__best__pro__thumb">
                                  <a href="product-details.html">
                                      <img src="./lib/images/product-2/sm-img-2/1.jpg" alt="small product">
                                  </a>
                              </div>
                              <div class="htc__best__product__details">
                                  <h2><a href="product-details.html">dummy Product title</a></h2>
                                  <ul class="rating">
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                  </ul>
                                  <ul class="top__pro__prize">
                                      <li class="old__prize">$82.5</li>
                                      <li>$75.2</li>
                                  </ul>
                                  <div class="best__product__action">
                                      <ul class="product__action--dft">
                                          <li><a href="wishlist.html"><i class="icon-heart icons"></i></a></li>
                                          <li><a href="cart.html"><i class="icon-handbag icons"></i></a></li>
                                          <li><a href="#"><i class="icon-shuffle icons"></i></a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- End Single Product -->
                      <!-- Start Single Product -->
                      <div class="col-xl-4 col-md-6">
                          <div class="htc__best__product">
                              <div class="htc__best__pro__thumb">
                                  <a href="product-details.html">
                                      <img src="./lib/images/product-2/sm-img-2/2.jpg" alt="small product">
                                  </a>
                              </div>
                              <div class="htc__best__product__details">
                                  <h2><a href="product-details.html">dummy Product title</a></h2>
                                  <ul class="rating">
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                  </ul>
                                  <ul class="top__pro__prize">
                                      <li class="old__prize">$82.5</li>
                                      <li>$75.2</li>
                                  </ul>
                                  <div class="best__product__action">
                                      <ul class="product__action--dft">
                                          <li><a href="wishlist.html"><i class="icon-heart icons"></i></a></li>
                                          <li><a href="cart.html"><i class="icon-handbag icons"></i></a></li>
                                          <li><a href="#"><i class="icon-shuffle icons"></i></a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- End Single Product -->
                      <!-- Start Single Product -->
                      <div class="col-xl-4 col-md-6">
                          <div class="htc__best__product">
                              <div class="htc__best__pro__thumb">
                                  <a href="product-details.html">
                                      <img src="./lib/images/product-2/sm-img-2/3.jpg" alt="small product">
                                  </a>
                              </div>
                              <div class="htc__best__product__details">
                                  <h2><a href="product-details.html">dummy Product title</a></h2>
                                  <ul class="rating">
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                      <li class="old"><i class="icon-star icons"></i></li>
                                  </ul>
                                  <ul class="top__pro__prize">
                                      <li class="old__prize">$82.5</li>
                                      <li>$75.2</li>
                                  </ul>
                                  <div class="best__product__action">
                                      <ul class="product__action--dft">
                                          <li><a href="wishlist.html"><i class="icon-heart icons"></i></a></li>
                                          <li><a href="cart.html"><i class="icon-handbag icons"></i></a></li>
                                          <li><a href="#"><i class="icon-shuffle icons"></i></a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- End Single Product -->
                  </div>
              </div>
          </section>
          <!-- End Top Rated Area -->
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
      `},
    async afterRender(){
        await ComponentsTop.afterRender();
    }
}

export default CategoryPage 