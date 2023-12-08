import React from 'react'
import { useStores } from '../context/StoresContext';
import { Link } from 'react-router-dom'
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


function StoreCard({ store }) {

    const { deleteStore } = useStores()
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <header className='flex justify-between '>
                <h1 className='text-1xl font-bold'>{store.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'" onClick={() => {
                        deleteStore(store._id);
                    }}><IoTrashBinSharp size={30}/></button>
                    <Link className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg' to={'/stores/' + store._id}>
                        <IoPencilSharp size={30}/>
                    </Link>
                    <Link className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg' to={'/' + store._id + '/products'}>
                        <MdOutlineProductionQuantityLimits size={30}/>
                    </Link>
                    
                </div>
            </header>
            <p className='text-salte-300 my-2'> {store.date}
            </p>
        </div>
    )
}

export default StoreCard