import { Router } from 'express';

import CartManagerMongo from '../dao/mongo/cartsManagerMongo.js';

const router = Router();

const carritosMongo = new CartManagerMongo();

router.get("/", async (req, res) => {
    res.render("realTimeProducts", {
    })
})

router.delete("/carts/:cid/products/:pid", async (req, res) => {

    var cid = req.params.cid;
    var pid = req.params.pid;

    console.log(cid);
    console.log(pid);

    const response = await carritosMongo.deleteProduct(cid, pid);



    return res.send(response);
})

router.put("/carts/:cid/products/:pid", async (req, res) => {


    var cid = req.params.cid;
    var pid = req.params.pid;
    var quantity = parseInt(req.body.quantity);
    console.log(cid);
    console.log(pid);
    console.log(quantity);

    const response = await carritosMongo.updateCart(cid, pid, quantity);



    return res.send(response);
})

router.delete("/carts/:cid", async (req, res) => {

    var cid = req.params.cid;

    console.log(cid);

    const response = await carritosMongo.deleteCartProducts(cid);



    return res.send(response);
})

function returncid(cid){
    return cid; 
}

router.get("/carts/:cid", async (req, res) => {

    var cid = req.params.cid;

    console.log(cid); 

    const response = await carritosMongo.getCartProducts(cid);



    return res.send(response);
})

router.get("/products/:cid", async (req, res) => {

    var cid = req.params.cid;
    const response = await carritosMongo.getCartProducts(cid);

    console.log("Imprime response"); 
    const str = JSON.stringify(response);
    console.log(str); 

    const str2 = JSON.parse(str); 

    console.log(str2[0]); 

    const response2 = response[0]; 

    res.render("ViewsCarts", { response2 });
})

export default router;
