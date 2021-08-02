import categoryAPI from "../../../api/categoryAPI"
import ProductAPI from '../../../api/productAPI'
import CART from '../../../pages/client/carts/CART';

const Header = {
  async render(){
    CART.init()
    const { data : categories} = await categoryAPI.getAll()
    const result = categories.map(category => {
      return `<li><a href="/#/categories/${category.id}">${category.name}</a></li>`
    }).join("")


    return /*html*/`
    <header id="htc__header" class="htc__header__area header--one">
    <!-- Start Mainmenu Area -->
    <div id="sticky-header-with-topbar" class="mainmenu__wrap sticky__header" style='box-shadow: 1px 1px 2px #ccc;'>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-3 col-5">
                    <div class="logo">
                        <a href="index.html"><img src="./lib/images/logo/4.png" alt="logo ./lib/images"></a>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-7 d-none d-lg-block">
                    <nav class="main__menu__nav">
                        <ul class="main__menu">
                            <li class="drop"><a href="index.html">Home</a></li>
                            <li class="drop"><a href="#">Product</a>
                                <ul class="dropdown">
                                      ${result}
                                </ul>
                            </li>
                            <li class="drop"><a href="blog.html">blog</a>
                                <ul class="dropdown">
                                    <li><a href="blog.html">Blog Grid</a></li>
                                    <li><a href="blog-details.html">Blog Details</a></li>
                                </ul>
                            </li>
                            <li class="drop"><a href="#">Pages</a>
                                <ul class="dropdown">
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="blog-details.html">Blog Details</a></li>
                                </ul>
                            </li>
                            <li><a href="#/contact">contact</a></li>
                        </ul>
                    </nav>

                    <div class="mobile-menu d-block d-lg-none">
                        <nav id="mobile_dropdown">
                            <ul>
                                <li><a href="index.html">Home</a>
                                    <ul>
                                        <li><a href="index.html">Home Version 01</a></li>
                                        <li><a href="index-2.html">Home Version 02</a></li>
                                        <li><a href="index-3.html">Home Box Layout</a></li>
                                    </ul>
                                </li>
                                <li><a href="blog.html">blog</a></li>
                                <li><a href="#">pages</a>
                                    <ul>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="blog-details.html">Blog Details</a></li>
                                        <li><a href="cart.html">Cart page</a></li>
                                        <li><a href="checkout.html">checkout</a></li>
                                        <li><a href="contact.html">contact</a></li>
                                        <li><a href="product-grid.html">product grid</a></li>
                                        <li><a href="product-list.html">product list</a></li>
                                        <li><a href="product-details.html">product details</a></li>
                                        <li><a href="wishlist.html">wishlist</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-sm-8 col-6">
                    <div class="header__right">
                        <div class="header__search search search__open">
                            <a href="#"><i class="icon-magnifier icons"></i></a>
                        </div>
                        <div class="header__account">
                            <a href="#"><i class="icon-user icons"></i></a>
                        </div>
                        <div class="htc__shopping__cart">
                            <a class="cart__menu" href="#/cart"><i class="icon-handbag icons"></i></a>
                            <a href="#"><span class="htc__qua" id='qtyCart'>${CART.countQuantity()}</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-area d-flex"></div>
        </div>
      </div>
      <!-- End Mainmenu Area -->
    </header>
      `
  },
  afterRender(){
    // const { data:PRODUCTS } = await ProductAPI.getAll();
    CART.init();
  }
}
export default Header