import { useForm } from "react-hook-form";
import { useStores } from "../context/StoresContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function StoreFromPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        date: new Date().getFullYear(),
        price: 0.0
      }
    }
  );
  const { createStore, getStore, updateStore } = useStores();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStore() {
      if (params.id) {
        const store = await getStore(params.id)
        setValue('name', store.name)
        setValue('date', store.date)
      }
    }

    loadStore();
  }, [])

  const onSubmit = handleSubmit((data) => {
    if (params.id)
      updateStore(params.id, data)
    else
      createStore(data)
    navigate('/stores')
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>

          <label htmlFor='price'>Nombre</label>
          <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Nombre de de la Tienda"
            {...register("name", { required: true })}
            autoFocus
          />
          {errors.name && (<div className='text-red-500'> Nombre de la tienda es requerido</div>)}

          <label htmlFor='price'>Año</label>
          <input type="text" max={new Date().getFullYear()} min="1900" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Año de la Tienda"
            {...register("date", {
              required: true,
              min: 1900,
              max: new Date().getFullYear()
            })}
          />
          {errors.date && (<div className='text-red-500'> La fecha de la tienda es requerida</div>)}
          {errors.date?.type === "min" && (<div className='text-red-500'> El año minimo es 1900</div>)}
          {errors.date?.type === "max" && (<div className='text-red-500'> El año maximo es {new Date().getFullYear()}</div>)}

          <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md' type="submit">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default StoreFromPage;
