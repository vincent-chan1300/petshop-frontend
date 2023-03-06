import React from 'react'

function Footer() {
  return (
    <div className='border-t-[1px] border-[rgba(0,0,0,.1)]'>
        <div className='section-container max-w-full'>
            <div className='grid md:grid-cols-3 divide-y md:divide-x md:divide-y-[0] divide-[rgba(0,0,0,.1)] divide-dashed'>
                <div className='p-4 text-sm text-center'>
                  <a href="/" className='px-3 py-2 relative block w-fit bg-theme-color-1 md:bg-white-1 mx-auto md:mx-0 !text-white-1 md:w-full md:!text-theme-color-1 after:hidden md:after:block after:content-[""] after:absolute after:h-[2px] after:bg-gray after:transition-all after:duration-300 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3/5 hover:after:w-[100%] hover:after:bg-theme-color-1'>關於B&M Pet Supermarket</a>
                  <div className='flex flex-col mt-6 gap-y-1'>
                    <a href="/" className='!text-gray'>主頁</a>
                  </div>
                </div>
                <div className='p-4 text-sm text-center'>
                  <a href="/" className='px-3 py-2 relative block w-fit bg-theme-color-1 md:bg-white-1 mx-auto md:mx-0 !text-white-1 md:w-full after:hidden md:after:block md:!text-theme-color-1 after:content-[""] after:absolute after:h-[2px] after:bg-gray after:transition-all after:duration-300 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3/5 hover:after:w-[100%] hover:after:bg-theme-color-1'>貨品選購</a>
                  <div className='flex flex-col mt-6 gap-y-1'>
                    <a href="/category/dog" className='!text-gray'>狗仔專區</a>
                    <a href="/category/cat" className='!text-gray'>貓仔專區</a>
                  </div>
                </div>

                <div className='p-4 text-sm text-center'>
                  <a href="/" className='px-3 py-2 relative block w-fit bg-theme-color-1 md:bg-white-1 mx-auto md:mx-0 !text-white-1 md:w-full after:hidden md:after:block md:!text-theme-color-1 after:content-[""] after:absolute after:h-[2px] after:bg-gray after:transition-all after:duration-300 after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-3/5 hover:after:w-[100%] hover:after:bg-theme-color-1'>聯絡我們</a>
                  <div className='flex text-left flex-col mt-6 gap-y-1'>
                    <span className='text-gray block'>▌營業地址：九龍官塘官塘道
                      436--446號官塘工業中心4期8M<br/>
                      Rm M 8/F,
                      Phase 4 Kwun Tong Ind, Ctr
                      436--446 Kwun Tong Road, Kwun Tong Kowloon</span>
                    <span className='text-gray block'>▌客服電話：9076 8816</span>
                    <span className='text-gray block'>▌E-mail: b.mpetsupermarket@gmail.com</span>
                    <div className='flex'></div>
                  </div>
                </div>
            </div>
            <div className='my-3 max-w-5xl mx-auto h-1 bg-gray'></div>
            <div className='pb-10 text-center'>B&M Pet Supermarket© 2022</div>
        </div>
    </div>
  )
}

export default Footer