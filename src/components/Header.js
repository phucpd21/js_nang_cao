import categoryAPI from "../api/categoryAPI"

const Header = {
  async render(){
    const { data : categories} = await categoryAPI.getAll()
    const result = categories.map(category => {
      return `
        <a class="p-2 text-dark" href="/#/categories/${category.id}">${category.name}</a>
      `
    }).join("")
    return /*html*/`
        <p class="h5 my-0 me-md-auto fw-normal">Company name</p>
        <nav class="my-2 my-md-0 me-md-3">
        <a class="p-2 text-dark" href="/#/">Home Page</a>
        <a class="p-2 text-dark" href="/#/products">All Products</a>
          ${result}
        </nav>
        <a class="btn btn-outline-primary" href="#">Sign up</a>
      `
  }
}
export default Header