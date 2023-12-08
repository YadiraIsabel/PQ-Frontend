import { useEffect } from "react";
import { useStores } from "../context/StoresContext";
import StoreCard from "../components/StoreCard";

function StoresPage() {
  const { getStores, stores } = useStores();

  useEffect(() => {
    getStores();
    console.log(stores);
  }, [])

  if (stores.length === 0)
    return (<h1>No hay Tiendas para listar</h1>)

  return (

    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {
        stores.map((store) => (
          <StoreCard store={store} key={store._id} />
        ))
      }
    </div>
  )
}

export default StoresPage;
