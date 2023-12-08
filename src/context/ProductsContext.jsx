import { useState, createContext, useContext } from "react";
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest } from "../api/products";
const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);

    if (!context)
        throw new Error("useroducts debe estar dentro de un ProductProvider")

    return context;
}



export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])

    const createProduct = async (store, product) => {
        try {
            const res = await createProductRequest(store, product)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async (store) => {
        try {
            console.log(store);
            const res = await getProductsRequest(store)
            setProducts(res.data);

        } catch (error) {
            console.log(error);
        }

    }

    const deleteProduct = async (store, id) => {
        try {
            const res = await deleteProductRequest(store, id);
            if (res.status) {
                setProducts(products.filter(product => product._id != id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getProduct = async (store, id) => {
        try {
            const res = await getProductRequest(store, id)
            return res.data

        } catch (error) {
            console.log(error)
        }

    }

    const updateProduct = async (store, id, product) => {
        try {
            await updateProductRequest(store, id, product);
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <ProductsContext.Provider value={{ products, createProduct, getProducts, deleteProduct, getProduct, updateProduct }}>{children}</ProductsContext.Provider>
    )

}