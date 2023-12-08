import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ProductsFromsPage() {
  const { register, handleSubmit, setValue, formState: {errors} } = useForm(
    {
      defaultValues: {
        year: "" + new Date().getFullYear(),
        price: 0.0
      }
    }
  );
  const { createProduct, getProduct, updateProduct } = useProducts();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.store, params.id)
        setValue('name', product.name)
        setValue('price', product.price)
        setValue('fecha', product.fecha)
      }

    }

    loadProduct();
  }, [])

  const onSubmit = handleSubmit((data) => {
    if (params.id)
      updateProduct(params.store, params.id, data)
    else
      createProduct(params.store, data)
    navigate('/' + params.store + '/products')
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>

          <label htmlFor='price'>Nombre</label>
          <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Nombre del Producto"
            {...register("name", { required: true })}
            autoFocus
          />
          {errors.name && (<div className='text-red-500'> Nombre del Producto es requerido</div>)}

          <label htmlFor='price'>Precio</label>
          <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Precio del Producto"

            {...register("price", {
              valueAsNumber: true,
              required: true,
              min: 0.0
            })}
          />
          {errors.price && (<div className='text-red-500'> Precio del propducto es requerido</div>)}
          {errors.price?.type === "min" && (<div className='text-red-500'> El precio minimo es 0.0</div>)}

          <label htmlFor='price'>Fecha</label>
          <input type="text" max={new Date().getFullYear()} min="1900" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Fecha del Producto"
            {...register("fecha", { 
              required:true,
              min: 1900,
              max: new Date().getFullYear()
             })}
          />
          {errors.fecha && (<div className='text-red-500'> Fecha del propducto es requerido</div>)}
          {errors.fecha?.type === "min" && (<div className='text-red-500'> El Fecha minimo es 1900</div>)}
          {errors.fecha?.type === "max" && (<div className='text-red-500'> El Fecha maximo es {new Date().getFullYear()}</div>)}

          <button className='bg-zinc-700 px-3 py-3 my-3 rounded-md' type="submit">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default ProductsFromsPage;
