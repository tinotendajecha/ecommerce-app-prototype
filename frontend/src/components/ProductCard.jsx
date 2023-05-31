import React from 'react';
import { FaAngleRight} from 'react-icons/fa'

const ProductCard = ({product}) => {
  return (
    <div className="flex  gap-4 bg-white p-3 rounded-lg w-64 hover:shadow-lg transition duration-200 mw-100 md:w-full " >
      <img className="w-30 h-24" src={product.imageUrl} alt={product.name} />
      <div className="flex flex-column">
        <h3 className="text-sm text-navBg">{product.name}</h3>
        <p className="text-xs text-navBg ">${product.price}</p>
        <button className="bg-navBg p-2 rounded text-white text-xs w-20 mb-4 flex hover:bg-hoverCl transition duration-200">Check it <span className="mt-0.5 ml-1"><FaAngleRight /></span> </button>
      </div>
    </div>
  )
}

export default ProductCard;
