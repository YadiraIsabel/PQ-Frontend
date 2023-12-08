import React from 'react'
import { useCounts } from '../context/CountsContext';
import { Link } from 'react-router-dom'
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

function CountCard({ count }) {

    const { deleteCount } = useCounts()
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <header className='flex justify-between '>
                <h1 className='text-1xl font-bold'>{count.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'" onClick={() => {
                        deleteCount(count._id);
                    }}><IoTrashBinSharp size={30}/></button>
                    <Link className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg' to={'/counts/' + count._id}>
                        <IoPencilSharp size={30}/>
                    </Link>
                </div>
            </header>
            <p className='text-salte-300 my-2'> {count.total}</p>
            <p className='text-salte-300 my-2'> {count.totalin}</p>
            <p className='text-salte-300 my-2'> {count.date}</p>
        </div>
    )
}

export default CountCard