import { useForm } from "react-hook-form";
import { useCounts } from "../context/CountsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function CountFromPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        date: ""+ new Date().getFullYear(),
        total: 0.0,
        totalin: 0.0
      }
    }
  );
  const { createCount, getCount, updateCount } = useCounts();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCount() {
      if (params.id) {
        const count = await getCount(params.id)
        setValue('name', count.name)
        setValue('total', count.total)
        setValue('totalin', count.totalin)
        setValue('date', count.date)
      }
    }

    loadCount();
  }, [])

  const onSubmit = handleSubmit((data) => {
    if (params.id)
      updateCount(params.id, data)
    else
      createCount(data)
    navigate('/counts')
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>

          <label htmlFor='name'>Nombre</label>
          <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Nombre de de la Cuenta"
            {...register("name", { required: true })}
            autoFocus
          />
          {errors.name && (<div className='text-red-500'> Nombre de la cuenta es requerido</div>)}

          <label htmlFor='date'>Fecha</label>
          <input type="text" max={new Date().getFullYear()} min="1900" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Año de la Tienda"
            {...register("date", {
              required: true,
              min: 1900,
              max: new Date().getFullYear()
            })}
          />
          <label htmlFor='total'>Total a gastar</label>
          <input type="number" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Dinero de Entrada"
            {...register("total", {
              valueAsNumber: true,
              required: true,
              min: 0.0
            })}
          />
          {errors.total && (<div className='text-red-500'> El dinero a gastar es requerido</div>)}
          {errors.total?.type === "min" && (<div className='text-red-500'> El dinero a gastar minimo es 0.0</div>)}

          <label htmlFor='totalin'>Total a restar</label>
          <input type="number" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Dinero de Entrada"

            {...register("totalin", {
              valueAsNumber: true,
              required: true,
              min: 0.0
            })}
          />
          {errors.totalin && (<div className='text-red-500'> El dinero de entrada es requerido</div>)}
          {errors.totalin?.type === "min" && (<div className='text-red-500'> El dinero de entrada minimo es 0.0</div>)}

          {errors.date && (<div className='text-red-500'> La fecha de la tienda es requerida</div>)}
          {errors.date?.type === "min" && (<div className='text-red-500'> El año minimo es 1900</div>)}
          {errors.date?.type === "max" && (<div className='text-red-500'> El año maximo es {new Date().getFullYear()}</div>)}

          <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md' type="submit">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default CountFromPage;
