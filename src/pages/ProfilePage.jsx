import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';

import { useState } from 'react';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'



function ProfilePage() {
  const { user } = useAuth()
  return (
    <div flex items-center justify-center h-screen>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <header className='flex justify-between '>
          <h1 className='text-1xl font-bold'>{user.email}</h1>
        </header>
        <p className='text-slate-300 my-2'>{user.username}</p>
      </div>
    </div>

  )
}

export default ProfilePage;
