import CartPage from '../../../pages/client/carts/CartPage.js';
import ProductAPI from "../../../api/productAPI";

const CART = {
    KEY: "giohangcuaphuc",
    contents: [],
    async init() {
        // check localStorage
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            CART.contents = [
                // { id: 1, name: "Apple", quantity: 5, itemPrice: 35, image: "link" },
                // { id: 2, name: "Nokia", quantity: 5, itemPrice: 35, image: "link" },
                // { id: 3, name: "Oppo", quantity: 5, itemPrice: 35, image: "link" },
            ];
            CART.sync();
        }

    },
    // Cập nhật giỏ hàng
    async sync() {
        // Set CART.contents -> localStorage
        let _cart = JSON.stringify(CART.contents);
        localStorage.setItem(CART.KEY, _cart);
    },
    // thêm sản phẩm mới(cập nhật nếu có)
    add(id,qty,PRODUCTS) {
        if (CART.find(id)) {
            CART.increase(id, qty);
            console.log('tăng');
        } else {
            let arr = PRODUCTS.filter((product) => {
                if (product.id == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    id: arr[0].id,
                    name: arr[0].name,
                    quantity: qty,
                    itemPrice: arr[0].price_new,
                    image: arr[0].image,
                };
                (CART.contents).push(obj);
                CART.sync();
                console.log("Thêm SP thành công");
            } else {
                console.error("Sản phẩm không tồn tại (id sản phẩm không hợp lệ)");
            }
        }
    },
    // tìm sp trong giỏ hàng
    find(id) {
        let match = CART.contents.filter((item) => {
            if (item.id == id) {
                return true;
            }
        });
        if (match && match[0]) {
            return match[0];
        }
    },
    // Xóa toàn bộ giỏ hàng
    empty() {
        CART.contents = [];
        CART.sync();
    },
    // Log cart.contents
    logContents(prefix) {
        console.log(prefix, CART.contents);
    },
    // tăng
    increase(id, qty = 1) {
        CART.contents = CART.contents.map((item) => {
            if (item.id == id) item.quantity = parseInt(item.quantity) + parseInt(qty);
            return item;
        });
        CART.sync();
    },
    // giảm
    async reduce(id, qty = 1) {
        let idDestroy = '';
        CART.contents = CART.contents.map((item) => {
            if (item.id == id && item.quantity>1){
                item.quantity -= qty;
            }
            else if(item.id == id && item.quantity <=1){
                idDestroy = id;
            }
            return item;
        });
        
        if(idDestroy){
            CART.contents = CART.contents.filter(i => i.id !== id);
            await CART.sync();
            return false;
        }else{
            await CART.sync();
            return true;
        }
        
    },
    // Xóa 1 loại sản phẩm
    remove(id) {
        CART.contents = CART.contents.filter(i => i.id !== id);
        CART.sync();
    },
    // Đếm số lượng từng sp
    countQuantity(){
        let result = 0;
        if(CART.contents != ''){
            (CART.contents).map(item=>{
                result = parseInt(result) + parseInt(item.quantity);
            });
        }
        return result;
    },
    // Tính tổng giá của 1 loại SP
    countMoneyOne(id){
        const item = CART.contents.filter(item => item.id == id)[0];
        const result = (parseInt(item.itemPrice)*parseInt(item.quantity));
        console.log(result);
        return result;
    },
    // Tính tổng giá của Cart
    countMoneyAll(){
        let result = 0;
        if(CART.contents != ''){
            (CART.contents).map(item=>{
                result = parseInt(result) + (parseInt(item.itemPrice)*parseInt(item.quantity));
            });
        }
        return result;
    }


};

export default CART;
