import React from 'react'
import Navigation from './Navigation'

function Header() {
    return (
        <div className='bg-theme-color-1 sticky left-0 top-0 z-[999]'>
            <div className='section-container min-h-[45px] flex justify-center md:justify-between items-center'>
                <div className='flex justify-end items-center gap-x-4 text-sm font-bold'>
                    <a href="whatsapp://send?text=https://b-m-supermarket.com/" className='rounded-full border-white border-2 px-4 py-1 block text-white font-bold hover:border-transparent hover:opacity-70'>
                        <span>推薦好友！</span>
                    </a>
                </div>
            </div>
            <Navigation />
        </div>

    )
}

export default Header