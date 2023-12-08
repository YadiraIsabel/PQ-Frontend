import { useForm, } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { IoPersonAdd, IoLogIn } from 'react-icons/io5'
import ReCaptcha from 'react-google-recaptcha'

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    const [captchaValue, setCaptchaValue] = useState(null)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products')
        }
    }, [isAuthenticated]
    )

    const onSubmit = handleSubmit(async (values) => {
        signUp(values);
    })
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

                {
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 my-2 text-white ' key={i}>{error}</div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <h1 className='text-3xl font-bold my-3'>Register</h1>


                    <label htmlFor='username'>Usuario</label>
                    <input type="text" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' name="username" placeholder='name'
                        {
                        ...register("username", {
                            required: true,
                            minLength: 5
                        })
                        } />

                    {errors.username?.type === 'required' && (<p className='text-red-500'> Nombre de Usuario requerido</p>)}
                    {errors.username?.type === 'minLength' && (<p className='text-red-500'> Nombre de Usuario debe de tener minmo 5 caracteres</p>)}

                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='email'
                        {
                        ...register("email", {
                            required: true,
                        })
                        }
                    />
                    {errors.email?.type === 'required' && (<p className='text-red-500'> Email requerido</p>)}

                    <label htmlFor='password'>Passord</label>
                    <input type="password" name="password" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='password'
                        {

                        ...register("password", {
                            required: true,
                            minLength: 6
                        })

                        } />
                    {errors.password?.type === 'required' && (<p className='text-red-500'> Contraseña requerida</p>)}
                    {errors.password?.type === 'minLength' && (<p className='text-red-500'> Contraseña debe de tener minimo 6 caracteres</p>)}

                    <button disabled={!captchaValue} type="submit" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-zinc-700 hover:border-transparent rounded-full'><IoLogIn size={30} /></button>
                    <ReCaptcha
                        sitekey='6LfNgyopAAAAAM1KQetkvMmZAIJ3XHyXGoObeo_5'
                        onChange={(value) => setCaptchaValue(value)} />
                </form>
                <p className='flex gap-2 justify-between pt-5 mt-5'>
                    ¿Ya tienes cuenta?
                    <Link to="/login" className='text-sky-500'>¡Inicia Sesion! <IoPersonAdd size={30} /></Link>
                </p>
            </div>
        </div>
    )
}
