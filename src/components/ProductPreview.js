import React from "react";


function ProductPreview({ _id, category, description, price, name, pictures }) {
    return (

        <a href={`/product/${_id}`} className="block hover:shadow-[0_1px_3px_2px_rgba(0,0,0,.24)] shadow-md transition-all duration-200 rounded-xl">
            <div className="w-full rounded-xl ">
                <img className="object-contain w-full aspect-[1/1] rounded-t-xl" src={pictures[0].url} alt="thumbnail" />
            </div>
            <div className="p-3">
                <p className="font-bold min-h-[48px]">{name}</p>
                <p>HKD${price}</p>
                <p className="line-clamp text-ellipsis whitespace-nowrap overflow-hidden">{description}</p>
                <p className="text-sm bg-yellow rounded-2xl px-2 py-1 w-fit font-bold">{category}</p>
            </div>
        </a>

    );
}

export default ProductPreview;
