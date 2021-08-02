import ProductAPI from '../../../api/productAPI.js';
import Header from '../components/Header';

const ProductsPage = {
  async render(){
    try {
      const {data : products} = await ProductAPI.getAll()
      // const products = data
      // const response = await  axios('http://localhost:3000/products')
      // const products = await response.data
      const result = products.map(product => {
        return `
            <div class="col-4">
              <div class="card" style="margin-bottom:20px">
              <img src="${product.image}" class="card-img-top" alt="${products.name}" height="300px" style="object-fit:cover">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <h5 class="card-title text-danger">${product.price} đồng</h5>
                  <p class="card-text"></p>
                  <a href="/#/products/${product.id}" class="btn btn-primary">Chi tiết sản phẩm</a>
                </div>
              </div>
            </div>
            `
      }).join("")
      return `
      <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm" id="header">
        ${ await Header.render()}
      </header>
      <h1>Product Page</h1>
        <div class="row">
          ${result}
        </div>
      </div>
    `

    } catch (error) {
      console.log(error)
    }
    
  },
  async afterRender(){
    
  }
}

export default ProductsPage