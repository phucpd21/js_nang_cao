import categoryAPI from "../../../api/categoryAPI"
import { $, parseRequestUrl } from "../../../utils"
import SidebarMenu from "../components/SideBarMenu"
import Header from "../components/Header"

const CategoryEditPage = {
  async render(){
    const { id } = parseRequestUrl()
    const { data:category } = await categoryAPI.get(id)
    
    return `

    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
      ${ await Header.render()}
    </header>

    <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        ${SidebarMenu.render()}
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h2>Danh sách sản phẩm</h2>
        <div class="table-responsive">

        <form id="form-update-category" class="w-50 mx-auto">
        <h2>Cập nhật danh mục sản phẩm</h2>
          <div class="form-group">
            <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Category name</label>
            <input type="text" value='${category.name}' placeholder="Tên sản phẩm" id="category-name" class="form-control"/>
          </div>
          <input type="submit" class="btn btn-primary float-end mt-2"/>
        </form>

        </div>
      </main>

    </div>
  </div>

  <script src="https://getbootstrap.com/docs/5.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"></script>
        `
  },
  async afterRender(){
    const { id } = parseRequestUrl()
    const { data:category } = await categoryAPI.get(id)
    const {data: categories} = await categoryAPI.getAll()
    
    $('#form-update-category').addEventListener('submit', e => {
      e.preventDefault();

      if($("#category-name").value == ''){
        alert('Hãy điền thông tin')
      } else {
        const model = categories.filter(item => item.name == $("#category-name").value)
        if(model[0] && model[0].name != category.name) {
            alert('Tên danh mục sản phẩm đã tồn tại')
        } else {
          const newCategory = {
            ...category,
            name: $('#category-name').value,
          }
          console.log(newCategory)
          categoryAPI.update(id,newCategory)
          window.location.hash = '/listcategory'
        }
      }

    })
  }
}

export default CategoryEditPage