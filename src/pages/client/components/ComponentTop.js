
const ComponentsTop = {
  async render(){
    return `
    <div class='' style='display:flex; justify-content:flex-end; flex-direction: row; align-items:flex-end; margin-top:20px '>
      <select id="mySelect" style='width:105px;height:28px; margin-right:15px'>
          <option value=''>Sắp xếp</option>
          <option value='toHigh'>Giá tăng dần</option>
          <option value='toLow'>Giá giảm dần</option>
      </select>
      <input type='text' placeholder='Tìm kiếm' id='input-search'
      style='width:250px; font-size:18px; font-family:Poppins - 10; padding-left:5px'>
  </div>  
    `;
  },
  async afterRender(){
    document.getElementById("input-search").addEventListener("keyup", function() {
      const childs = document.getElementsByClassName('item-product');
      const searchValue = document.getElementById("input-search").value.toUpperCase();
      console.log('input: ' + searchValue);
      for( let i =0; i< childs.length; i++){
          const a =  childs[i].getElementsByTagName('a')[4]; // Vì trong từng item-prodict có nhiều thẻ a, tên là thẻ thứ 5(index 4)
          const text = a.innerText;
          if(text.toUpperCase().indexOf(searchValue) > -1){
              childs[i].style.display = '';
          } else {
              childs[i].style.display = 'none';
          }
      }
    });
    document.getElementById('mySelect').addEventListener("click", function(){
        const valueSelect = document.getElementById('mySelect').value;
        const boxListProduct = document.getElementsByClassName('product-list-area');
        const childsHTML = document.getElementsByClassName('item-product');
        

        let childs = [...childsHTML];
        let content = ``;
        if(valueSelect == 'toHigh'){
            for(let i = 0; i < childs.length; i++){
                for(let j = i+1 ; j < childs.length; j++){
                    let valueI = parseInt(childs[i].getElementsByClassName('new-price')[0].innerText);
                    let valueJ = parseInt(childs[j].getElementsByClassName('new-price')[0].innerText);
                    if(valueI > valueJ){
                        let t = childs[i];
                        childs[i] = childs[j];
                        childs[j] = t;
                    }
                }
                content+=`
                    <div class='col-xl-3 col-md-4 item-product'>
                        ${childs[i].innerHTML}
                    </div>
                `;
            }
            boxListProduct[0].innerHTML = content
        } else if(valueSelect == 'toLow') {
            for(let i = 0; i < childs.length; i++){
                for(let j = i+1 ; j < childs.length; j++){
                    let valueI = parseInt(childs[i].getElementsByClassName('new-price')[0].innerText);
                    let valueJ = parseInt(childs[j].getElementsByClassName('new-price')[0].innerText);
                    if(valueI < valueJ){
                        let t = childs[i];
                        childs[i] = childs[j];
                        childs[j] = t;
                    }
                }
                content+=`
                    <div class='col-xl-3 col-md-4 item-product'>
                        ${childs[i].innerHTML}
                    </div>
                `;
            }
            boxListProduct[0].innerHTML = content
        }
        
    });
  }
}
export default ComponentsTop;