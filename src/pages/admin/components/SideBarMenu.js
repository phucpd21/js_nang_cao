const SidebarMenu = {
  render(){
    return /*html*/`
    <div class="position-sticky pt-3">
    <ul class="nav flex-column">

      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#/listProduct">
          <span data-feather="home"></span>
          Dashboard
        </a>
      </li>

      <li class='nav-link'>PRODUCTS</li>
      <li class="nav-item" style='margin-left:15px'>
        <a class="nav-link" href="#/listProduct">
          <span data-feather="shopping-cart"></span>
          List products
        </a>
      </li>
      <li class="nav-item" style='margin-left:15px'>
        <a class="nav-link" href="#/addProduct">
          <span data-feather="shopping-cart"></span>
          New Product
        </a>
      </li>
      
      <li class='nav-link'>CATEGORIES</li>
      <li class="nav-item" style='margin-left:15px'>
        <a class="nav-link" href="#/listCategory">
          <span data-feather="shopping-cart"></span>
          List Categories
        </a>
      </li>
      <li class="nav-item" style='margin-left:15px'>
        <a class="nav-link" href="#/addCategory">
          <span data-feather="shopping-cart"></span>
          New Category
        </a>
      </li>

    </ul>
  </div>
    `
  }
}
export default SidebarMenu