import categoryAPI from "../../../api/categoryAPI"
import ProductAPI from "../../../api/productAPI"
import { $, reRender } from '../../../utils'
const ListProduct = {
  async render(){
    const {data:products} = await ProductAPI.getAll()
    const {data:categories} = await categoryAPI.getAll()
    // console.log(categories)
    return /*html*/`
    <table class="table table-striped table-sm" id="list-products">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price old</th>
        <th>Price new</th>
        <th>Star</th>
        <th>Trạng thái</th>
        <th width="200">Action</th>
      </tr>
    </thead>
    <tbody>
      ${products.map((product, index) => {
        let category = categories.filter(item => item.id == product.categoryId)
        if(product.status == true){
          status = `Còn hàng`
        } else{
          status = `Hết hàng`
        }
        return `
            <tr>
              <td>${index+1}</td>
              <td>${product.name}</td>
              <td>${category[0].name}</td>
              <td>${product.price_old}$</td>
              <td>${product.price_new}$</td>
              <td>${product.star} ⭐</td>
              <td>${status}</td>
              <td>
                <a href="/#/editproduct/${product.id}" class="btn btn-primary btn-edit">Edit</a>
                <button class="btn btn-danger btn-remove"  data-id="${product.id} ">Remove</button>
              </td>
            </tr>
          `
      }).join("")}
        
    </tbody>
  </table>
    `
  },

  async afterRender(){
      const btns = $('#list-products .btn-remove')
      btns.forEach(btn => {
        const id =  btn.dataset.id
        btn.addEventListener("click", async function(){
          if(confirm('Xác nhận xóa')){
            await ProductAPI.remove(id)
            await reRender(ListProduct, "#list-products")
          }
      })
    });
  }
}
export default ListProduct