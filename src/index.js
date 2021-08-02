import HomePage from './pages/HomePage.js'
import Header from './components/Header.js'
import ProductsPage from './pages/client/products/ProductsPage.js'
import ProductDetail from './pages/client/products/ProductDetail.js'
import Error from './pages/Error'
import {parseRequestUrl, $} from './utils.js'
import CategoryPage from './pages/client/products/CategoryPage.js'
import ProductAddPage from './pages/admin/products/ProductAddPage.js'
import AdminProductPage from './pages/admin/products/AdminProductPage.js'
import ProductEditPage from './pages/admin/products/ProductEditPage.js'
import AdminCategoryPage from './pages/admin/categories/AdminCategoryPage.js'
import CategoryAddPage from './pages/admin/categories/CategoryAddPage.js'
import CategoryEditPage from './pages/admin/categories/CategoryEditPage.js'
import CartPage from './pages/client/carts/CartPage.js'
import Contact from './pages/client/other_pages/Contact'
import CheckOut from './pages/client/carts/CheckOut'
import Invoice from './pages/client/carts/Invoice.js'


const routers = {
  '/': HomePage,
  '/products': ProductsPage,
  '/products/:id': ProductDetail,
  '/categories/:id': CategoryPage,
  '/addproduct': ProductAddPage,
  '/listproduct': AdminProductPage,
  '/editproduct/:id': ProductEditPage,
  '/addcategory': CategoryAddPage, 
  '/listcategory': AdminCategoryPage,
  '/editcategory/:id': CategoryEditPage, 
  '/cart': CartPage, 
  '/checkout': CheckOut, 
  '/invoice/:id': Invoice, 
  '/contact': Contact, 

}
const router = async () => {
  const { resource, id } = parseRequestUrl()
  const parseUrl = (resource ? `/${resource}` : '/') + (id ? `/:id` : '')
  const page = routers[parseUrl] ? routers[parseUrl] : Error
  // $('#header').innerHTML = await Header.render()
  $('#main-content').innerHTML = await page.render()
  await page.afterRender()
}
window.addEventListener('DOMContentLoaded', router)
window.addEventListener('hashchange', router)