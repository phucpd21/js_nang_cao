import ListCategory from "./ListCategory"
import SidebarMenu from "../components/SideBarMenu"
import Header from "../components/Header"

const AdminCategoryPage = {
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
        <h2>Danh sách danh mục sản phẩm</h2>
        <div class="table-responsive">
          ${await ListCategory.render()}
        </div>
      </main>
    </div>
  </div>
  <script src="https://getbootstrap.com/docs/5.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"></script>
    `
  },
  async afterRender(){
    return `${await ListCategory.afterRender()}`
  }
}
export default AdminCategoryPage