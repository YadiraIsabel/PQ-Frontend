import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'
import ReCaptcha from 'react-google-recaptcha'
export default function LoginPage() {
  
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null)

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signIn(data)
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/stores')
    }
  }, [isAuthenticated]
  )

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

        <h1 className='text-3xl font-bold my-3'>Login</h1>
        {
          signInErrors.map((error, i) => (
            <div className='bg-red-500 p-2 my-2 text-white ' key={i}>{error}</div>
          ))
        }
        <form onSubmit={onSubmit}>
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
          <div className='flex justify-end items-center relative'>
            <input type={passwordShown ? "text" : "password"} name="password" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='password'
              {

              ...register("password", {
                required: true,
                minLength: 6
              })

              } />
              
            {
              passwordShown ? <IoEyeSharp size={30} className='absolute mr-2 w-10' onClick={togglePasswordVisibility} />
                :
                <IoEyeOffSharp size={30} className='absolute mr-2 w-10' onClick={togglePasswordVisibility} />
            }
            </div>
            <div className='flex justify-end items-center relative'>
            {errors.password?.type === 'required' && (<p className='text-red-500'> Contraseña requerida</p>)}
            {errors.password?.type === 'minLength' && (<p className='text-red-500'> Contraseña debe de tener minimo 6 caracteres</p>)}
            
            </div>
          <button disabled={!captchaValue} type="submit" className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-zinc-700 hover:border-transparent rounded-full'><IoLogIn size={30} /></button>
          
          <ReCaptcha
            sitekey='6LdrbiQpAAAAAGJF-fAe01T866mZa3mBLFpDtmNY'
            onChange={(value) => setCaptchaValue(value)} />
        </form>
        
        <p className='flex gap-2 justify-between pt-5 mt-5'>
          ¿No tienes cuenta?
          <Link to="/register" className='text-sky-500'>¡Crear Una! <IoPersonAdd size={30} /></Link>
        </p>
      
      </div>
    </div>
  )
}
