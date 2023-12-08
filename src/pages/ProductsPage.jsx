import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { useParams, Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";



function ProductsPage() {
  const { getProducts, products } = useProducts();
  const params = useParams();

  useEffect(() => {
    getProducts(params.store);
    console.log(products);
  }, [])

  if (products.length === 0)
    return (<h1>No hay productos para listar</h1>)

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <Link className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'" to={'/' + params.store + '/add-product'}> Añade Prooducto<IoMdAddCircle size={30}/></Link>

      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>



        {
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductsPage;
