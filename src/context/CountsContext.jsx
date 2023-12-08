import { useState, createContext, useContext } from "react";
import { createCountRequest, getCountsRequest, deleteCountRequest, getCountRequest, updateCountRequest } from "../api/count";
const CountsContext = createContext();

export const useCounts = () => {
    const context = useContext(CountsContext);

    if (!context)
        throw new Error("Count debe estar dentro de un CountProvider")

    return context;
}

export function CountsProvider({ children }) {
    const [counts, setCounts] = useState([])

    const createCount = async (count) => {
        try {
            console.log(count);
            console.log("entra");
            const res = await createCountRequest(count)
            
        } catch (error) {
            console.log(error);
        }
    }

    const getCounts = async () => {
        try {
            const res = await getCountsRequest()
            setCounts(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteCount = async (id) => {
        try {
            const res = await deleteCountRequest(id);
            if (res.status) {
                setCounts(counts.filter(count => count._id != id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCount = async (id) => {
        try {
            const res = await getCountRequest(id)
            return res.data

        } catch (error) {
            console.log(error)
        }

    }

    const updateCount = async (id, count) => {
        try {
            
            await updateCountRequest(id, count);
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <CountsContext.Provider value={{ counts, createCount, getCounts, deleteCount, getCount, updateCount }}>{children}</CountsContext.Provider>
    )

}