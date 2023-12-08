import { useState, createContext, useContext } from "react";
import { createStoreRequest, getStoresRequest, deleteStoreRequest, getStoreRequest, updateStoreRequest } from "../api/stores";
const StoresContext = createContext();

export const useStores = () => {
    const context = useContext(StoresContext);

    if (!context)
        throw new Error("Store debe estar dentro de un StoreProvider")

    return context;
}

export function StoresProvider({ children }) {
    const [stores, setStores] = useState([])

    const createStore = async (store) => {
        try {
            console.log(store);
            const res = await createStoreRequest(store)
            
        } catch (error) {
            console.log(error);
        }
    }

    const getStores = async () => {
        try {
            const res = await getStoresRequest()
            setStores(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteStore = async (id) => {
        try {
            const res = await deleteStoreRequest(id);
            if (res.status) {
                setStores(stores.filter(store => store._id != id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getStore = async (id) => {
        try {
            const res = await getStoreRequest(id)
            return res.data

        } catch (error) {
            console.log(error)
        }

    }

    const updateStore = async (id, store) => {
        try {
            
            await updateStoreRequest(id, store);
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <StoresContext.Provider value={{ stores, createStore, getStores, deleteStore, getStore, updateStore }}>{children}</StoresContext.Provider>
    )

}