import React from 'react'

function YouMayAlsoLikeProducts({ _id, price, name, pictures }) {
  return (
    <a href={`/product/${_id}`} className="flex pt-3 ">
            <div className="max-w-[3.5rem] min-w-[3.5rem]">
                <img className="object-cover w-14 aspect-[1/1] rounded-t-xl" src={pictures[0].url} alt="thumbnail" />
            </div>
            <div className="p-1 ml-2">
                <p className="font-bold mb-1">{name}</p>
                <p>HKD${price}</p>
                
            </div>
        </a>
  )
}

export default YouMayAlsoLikeProducts