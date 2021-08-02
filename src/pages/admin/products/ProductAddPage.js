import ProductAPI from '../../../api/productAPI.js'
import { $ } from '../../../utils.js'
import firebase from '../../../firebase/index'
import categoryAPI from '../../../api/categoryAPI.js'
import Header from "../components/Header"
import SidebarMenu from "../components/SideBarMenu"

const ProductAddPage = {
  async render(){
    const {data: categories} = await categoryAPI.getAll()
    // console.log(categories)
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
        <h2>Tạo mới sản phẩm</h2>
        <div class="table-responsive">
        
                  <form id="form-add" class="w-50 mx-auto" style='margin-bottom:100px'>
                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Product Name</label>
                    <input type="text" placeholder="Tên sản phẩm" id="product-name" class="form-control"/>
                  </div>

                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Category product</label>
                    <select name="category-id" id="category-id" class='form-control'>
                      ${categories.map(item => {
                        return `
                          <option value="${item.id}">${item.name}</option>
                        `
                      }).join('')
                    }
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Price old</label>
                    <input type="number" placeholder="Giá cũ" id="price-old" class="form-control"/>
                  </div>
                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Price new</label>
                    <input type="number" placeholder="Giá mới" id="price-new" class="form-control"/>
                  </div>
                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Star</label>
                    <select name="star" id="star" class='form-control'>
                      <option value=5 >5 ⭐</option>
                      <option value=4 >4 ⭐</option>
                      <option value=3 >3 ⭐</option>
                      <option value=2 >2 ⭐</option>
                      <option value=1 >1 ⭐</option>
                      <option value=0 >0 ⭐</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Describer</label>
                    <textarea id="desc" name="desc" rows="4" cols="80" placeholder='Nhập miêu tả sản phẩm'></textarea>
                  </div>

                  <div class="form-group">
                    <div class="form-group">
                      <input type="radio" id="status" checked name="status" value='true'> 
                      <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Còn hàng</label>
                    </div>
                    <div class="form-group">
                      <input type="radio" id="status"  name="status" value=''>
                      <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" class="form-label">Hết hàng</label>
                    </div>
                  </div>

                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Quantity</label>
                    <input type="number" placeholder="Số lượng" id="quantity" class="form-control"/>
                  </div>

                  <div class="form-group">
                    <label style="font-weight: 500; padding-top:7px; margin-bottom:2px" for="" class="form-label">Image product</label>    
                    <input type="file" id="product-image" class="form-control"/>
                  </div>
                  <div class="form-group text-end">
                    <input type="submit" class="btn btn-primary mt-2" value='Thêm sản phẩm'/>
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
    $("#form-add").addEventListener('submit',async e =>  {
      e.preventDefault()
      if(
        $("#category-id").value == '' 
      || $("#product-name").value == '' 
      || $("#price-old").value == '' 
      || $("#price-new").value == '' 
      || $("#star").value == '' 
      || $("#desc").value == '' 
      || $("#quantity").value == '' 
      || Boolean($('#product-image').files[0]) == false ){
        alert('Hãy điền đầy đủ thông tin')
      } else {
        const products = (await ProductAPI.getAll()).data;
        
        // format: loại bỏ khoảng trắng thừa của product_name_input
        let arr_name=[]; 
        $("#product-name").value.split(' ').forEach(item => { if(item != '')arr_name.push(item) })
        const product_name_input = arr_name.join(' ');

        const check = products.filter(item => item.name == product_name_input)[0] ? true : false;
        if(check == true){
          alert('Tên sản phẩm đã tồn tại');
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
            let storageRef = firebase.storage().ref(`images/${productImage.name}`)
            storageRef.put(productImage).then( () => {
              console.log('Upload thành công')
              storageRef.getDownloadURL().then(url => {
                const product = {
                  id: Math.random().toString(36).substr(2,9),
                  categoryId: $("#category-id").value,
                  name: product_name_input,
                  price_old: $("#price-old").value,
                  price_new: $("#price-new").value,
                  star: $("#star").value,
                  desc: $("#desc").value,
                  status: Boolean(document.querySelector('input[name=status]:checked').value),
                  countInstock: $("#quantity").value,
                  image: url
                }
                // console.log(product)
                ProductAPI.add(product)
                window.location.hash = '/listproduct'
              })
            })
          }

        }

      }

    })
  }
}
export default ProductAddPage