import categoryAPI from "../../../api/categoryAPI"
import ProductAPI from "../../../api/productAPI"
import firebase from "../../../firebase/index"
import { $, parseRequestUrl } from "../../../utils"
import Header from "../components/Header"
import SidebarMenu from "../components/SideBarMenu"

const ProductEditPage = {
  async render(){
    const { id } = parseRequestUrl()
    const { data:product } = await ProductAPI.get(id)
    const {data: categories} = await categoryAPI.getAll()
    // console.log(typeof parseInt(product.star))
    // console.log(parseInt(product.star))
    if(product.status == true){
      status =  ` 
                <div class="form-group">
                  <input type="radio" id="status" checked name="status" value='true'> 
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Còn hàng</label>
                </div>
                <div class="form-group">
                  <input type="radio" id="status"  name="status" value=''>
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Hết hàng</label>
                </div>
                `
    }else {
      status =  ` 
                <div class="form-group">
                  <input type="radio" id="status" name="status" value='true'> 
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Còn hàng</label>
                </div>
                <div class="form-group">
                  <input type="radio" id="status" checked name="status" value=''>
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Hết hàng</label>
                </div>
                `
    }
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
              <form id="form-update-product" class="w-50 mx-auto" style='margin-bottom:50px'>
              <h2>Cập nhật sản phẩm</h2>
                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Name product</label>
                  <input type="text" value='${product.name}' placeholder="Tên sản phẩm" id="product-name" class="form-control"/>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Category product</label>
                  <select name="category-id" id="category-id" class='form-control'>
                  ${categories.map(item => {
                    let result = '';
                    if(item.id == product.categoryId){
                      result += `<option selected value="${item.id}">${item.name}</option>`;
                    } else {
                      result += `<option value="${item.id}">${item.name}</option>`;
                    }
                    return result
                    }).join('')
                  }
                  </select>
                </div>
                
                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Price old</label>
                  <input type="number" value='${product.price_old}' id="price-old" class="form-control"/>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Price new</label>
                  <input type="number" value='${product.price_new}' id="price-new" class="form-control"/>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">star</label>
                  <select name="star" id="star" class='form-control'>
                    <option ${ (product.star == 5) ? 'selected' : ''} value=5 >5 ⭐</option>
                    <option ${ (product.star == 4) ? 'selected' : ''} value=4 >4 ⭐</option>
                    <option ${ (product.star == 3) ? 'selected' : ''} value=3 >3 ⭐</option>
                    <option ${ (product.star == 2) ? 'selected' : ''} value=2 >2 ⭐</option>
                    <option ${ (product.star == 1) ? 'selected' : ''} value=1 >1 ⭐</option>
                    <option ${ (product.star == 0) ? 'selected' : ''} value=0 >0 ⭐</option>
                  </select>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Describer</label>
                  <textarea id="desc" name="desc" rows="4" cols="80" placeholder='Nhập miêu tả sản phẩm'>${product.desc}</textarea>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for=""> Status Product</label><br>
                  ${status} 
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Quantity</label>
                  <input type="number"  value='${product.countInstock}' id="quantity" class="form-control"/>
                </div>

                <div class="form-group">
                  <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Image product</label>    
                  <input type="file" id="product-image" class="form-control"/>
                </div>
                <div class="form-group text-end">
                  <input type="submit" class="btn btn-primary mt-2" value='Cập nhật sản phẩm'/>
                </div>
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
    const { data:product } = await ProductAPI.get(id)
    const { data:products } = await ProductAPI.getAll()

    $('#form-update-product').addEventListener('submit', e => {
      e.preventDefault();
      
      if(
          $("#category-id").value == '' 
          || $("#product-name").value == '' 
          || $("#price-old").value == '' 
          || $("#price-new").value == '' 
          || $("#star").value == '' 
          || $("#desc").value == '' 
          || $("#quantity").value == ''){
          alert('Hãy điền đầy đủ thông tin')
      } else {
          let arr_name1 = [];
          ($("#product-name").value).split(' ').map(item => {if(item != '')arr_name1.push(item)});
          const name_input = arr_name1.join(' ');

          let arr_name2 = [];
          (product.name).split(' ').map(item => {if(item != '')arr_name2.push(item)});
          const name_present = arr_name2.join(' ');

          const model = products.filter(item => item.name == name_input)

          if(Boolean(model[0]) == true && name_input != name_present){
            alert('Tên danh phẩm đã tồn tại')
          } else {
            let isErr = false;
            
            if( isNaN($("#price-old").value) || $("#price-old").value <= 0){
              alert('Giá sản phẩm cũ không hợp lệ')
              isErr = true;
            }
            if( isNaN($("#price-new").value) || $("#price-new").value <= 0){
              alert('Giá sản phẩm mới không hợp lệ')
              isErr = true;
            }
            if( isNaN($("#star").value) ||  $("#star").value < 0 || $("#star").value > 5 ){
              alert('Số sao không hợp lệ')
              isErr = true;
            }
            
            if(isErr == false){
              const productImage = $('#product-image').files[0]
              if(productImage){
                let storageRef = firebase.storage().ref(`images/${productImage.name}`)
                storageRef.put(productImage).then( () => {
                  console.log('Upload thành công')
                  storageRef.getDownloadURL().then(url => {
                    const newProduct = {
                      ...product,
                      name: name_input,
                      categoryId: $("#category-id").value,
                      price_old: $("#price-old").value,
                      price_new: $("#price-new").value,
                      star: $("#star").value,
                      desc: $("#desc").value,
                      status: Boolean(document.querySelector('input[name=status]:checked').value),
                      countInstock: $("#quantity").value,
                      image: url
                    }
                    console.log(newProduct)
                    ProductAPI.update(id,newProduct)
                    window.location.hash = '/listproduct'
                  })
                })
        
              } else {
                
                console.log('không có ảnh');
                const newProduct = {
                  ...product,
                  name: name_input,
                  categoryId: $("#category-id").value,
                  price_old: $("#price-old").value,
                  price_new: $("#price-new").value,
                  star: $("#star").value,
                  desc: $("#desc").value,
                  status: Boolean(document.querySelector('input[name=status]:checked').value),
                  countInstock: $("#quantity").value,
                }
                console.log(newProduct)
                ProductAPI.update(id,newProduct)
                window.location.hash = '/listproduct'
              }
            }
            
    
          }
      }
    })
  }
}

export default ProductEditPage