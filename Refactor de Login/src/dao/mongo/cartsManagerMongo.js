import ProductManagerMongo from './productsManagerMongo.js';
const productos = new ProductManagerMongo(); //instanciamos clase que maneja productos
import { cartsModel } from '../models/cartsmodels.js';

class CartManagerMongo {

    async addProductCart(idCart, idProduct) {

        console.log("Estamos en addProductCart");
        console.log(idProduct);
        console.log(idCart);

        if (idCart == null) {

            let quantity_init = 1;

            const cartcreate = await cartsModel.create({
                Products: {
                    product: idProduct,
                    quantity: quantity_init,
                }
            });

        } else {

            console.log("Entro en el else");

            let cart = new Array();
            cart = await cartsModel.findById({
                _id: idCart,
            });

            console.log(cart);

            if (cart) {
                console.log("entro a ese if");
                let product_find = await cart.Products.find(prod => prod.product == idProduct);
                console.log(product_find);

                if (product_find) {

                    product_find.quantity += 1;

                    cart.save();

                } else {

                    console.log("Entro al segundo else");
                    let quantity_init = 1;

                    cart.Products.push({ product: idProduct, quantity: 1 });
                    cart.save();
                }

            }

        }


    }

    async createcart() {
        let cartobject = {};
        console.log("Creo carro");
        const cart = await cartsModel.create(cartobject);

        console.log(cart);

        return cart;
    }

    async deleteProduct(cid, pid) {

        console.log("Entro a borrar producto de carrito");

        console.log(cid);
        console.log(pid);


        const deleteprod = await cartsModel.findOneAndUpdate({ "_id": cid}, { $pull: { Products: { _id: pid } } });

        return deleteprod;


    }

    async updateCart(cid, pid, quantitybody) {
        console.log("Update carro");

        let updateprod = await cartsModel.updateOne({
            "_id": cid,
            "Products.product": pid
          }, {
            $set: {
              "Products.$.quantity": quantitybody
            }
          })

        return updateprod;
    }


    async getCartProducts(cid) {

        console.log("Entro a traer todos los productos del carrito con populate");

        console.log(cid);

        const populateCartprod = await cartsModel.find({_id : cid}).populate('Products.product').lean();
 
        return populateCartprod;


    }


}


export default CartManagerMongo; //exportamos clase CartManagerMongo
