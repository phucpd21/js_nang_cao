import categoryAPI from "../../../api/categoryAPI"

const Header = {
  async render(){
    const { data : categories} = await categoryAPI.getAll()
    const result = categories.map(category => {
      return `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
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