import categoryAPI from "../../../api/categoryAPI"
import ProductAPI from "../../../api/productAPI"
import { $, reRender } from '../../../utils'
const ListCategory = {
  async render(){
    const {data:products} = await ProductAPI.getAll()
    const {data:categories} = await categoryAPI.getAll()
    // console.log(categories)
    return /*html*/`
    <table class="table table-striped table-sm" id="list-categories">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th width="200">Action</th>
      </tr>
    </thead>
    <tbody>
      ${categories.map((category, index) => {
        // let category = categories.filter(item => item.id == product.categoryId)
        return `
            <tr>
              <td>${index+1}</td>
              <td>${category.name}</td>
              
              <td>
                <a href="/#/editcategory/${category.id}" class="btn btn-primary btn-edit">Edit</a>
                <button class="btn btn-danger btn-remove"  data-id="${category.id} ">Remove</button>
              </td>
            </tr>
          `
      }).join("")}
        
    </tbody>
  </table>
    `
  },

  async afterRender(){
      const btns = $('#list-categories .btn-remove')
      btns.forEach(btn => {
        const id =  btn.dataset.id
        btn.addEventListener("click", async function(){
          if(confirm('Xác nhận xóa')){
            const products = (await ProductAPI.getAll()).data;
            products.map(item => {
              if(item.categoryId == id){
                  ProductAPI.remove(id)
              }
            });
            await categoryAPI.remove(id)

            await reRender(ListCategory, "#list-categories")
          }
      })
    });
  }
}
export default ListCategory