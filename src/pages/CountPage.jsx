import { useEffect } from "react";
import { useCounts } from "../context/CountsContext";
import CountCard from "../components/CountCard";

function CountPage() {
  const { getCounts, counts } = useCounts();

  useEffect(() => {
    getCounts();
    console.log(counts);
  }, [])

  if (counts.length === 0)
    return (<h1>No hay Cuentas para listar</h1>)

  return (

    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {
        counts.map((count) => (
          <CountCard count={count} key={count._id} />
        ))
      }
    </div>
  )
}

export default CountPage;
