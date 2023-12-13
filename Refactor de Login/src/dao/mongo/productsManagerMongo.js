import { productsModel } from '../models/productsmodels.js';

class ProductManagerMongo {

    //Funcion para agregar productos
    async createproduct(title, description, price, thumbnail, code, stock, status, category) {


        const produ = await productsModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        })

        console.log(produ); 

        return produ;
    }

    async getallProducts(){
        const getprod = await productsModel.find().lean(); 
        //console.log(getprod); 
        return getprod; 
    }

    async getProducts(limit){
        const getprod = await productsModel.find({}).limit(limit).exec().lean(); 
        return getprod; 
    }

    async getpageProducts(query, page, limit, sortvalue){
        console.log("Estoy en query"); 
        console.log(query); 
        console.log(page); 
        console.log(limit);
        console.log(sortvalue);
        
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'payload',
            limit: 'limit',
            page: 'pagina',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'totalPages',
            pagingCounter: 'slNo',
            meta: 'paginator', 
          };

        const getprod = await productsModel.paginate(query, {limit: limit, page: page, sort: { _id: sortvalue, price: 1}, customLabels: myCustomLabels}); 
    
        return getprod; 
    }

}

export default ProductManagerMongo;



