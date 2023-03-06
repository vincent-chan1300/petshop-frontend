import React from 'react'

function BreadCrumb({item_arr}) {
  return (
    <div className='flex items-center gap-x-4 pb-3 md:pb-8'>
        {item_arr?.map((item,index ) => {
            return (
                <a key={index} href={item.link} className='relative breadCrumb-item text-base after:content-["/"] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[11px] after:pointer-events-none last:after:hidden'>{item.title}</a>
            )
        })}
    </div>
  )
}

export default BreadCrumb