import { $ } from '../../../utils.js'
import categoryAPI from '../../../api/categoryAPI.js'
import SidebarMenu from "../components/SideBarMenu"
import Header from "../components/Header"

const CategoryAddPage = {
  async render(){
    return /*html*/`
    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
      ${ await Header.render()}
    </header>

    <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        ${SidebarMenu.render()}
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h2>Tạo mới danh mục sản phẩm</h2>
        <div class="table-responsive">
        <form id="form-add" class="w-50 mx-auto">
        <div class="form-group">
          <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Category Name</label>
          <input type="text" placeholder="Tên danh mục sản phẩm" id="category-name" class="form-control"/>
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
  
  async  afterRender(){
    const {data: categories} = await categoryAPI.getAll()
    $("#form-add").addEventListener('submit', e => {
      e.preventDefault()

      if($("#category-name").value == ''){
        alert('Hãy điền thông tin')
      } else {
        const model = categories.filter(item => item.name == $("#category-name").value)
        if(model[0]) {
          alert('Tên danh mục sản phẩm đã tồn tại')
        } else {
          const category = {
            id: Math.random().toString(36).substr(2,9),
            name: $("#category-name").value,
          }
          console.log(category)
          categoryAPI.add(category)
          window.location.hash = '/listCategory'
        }
      }
    })
  }
}
export default CategoryAddPage