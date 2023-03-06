import React, { useState } from 'react'

function ScrollToTopBtn() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className='fixed right-[30px] bottom-[30px]'>
        
            <div className={`rounded-[50%] bg-[#053e58] w-[50px] h-[50px] flex items-center justify-center opacity-0 invisible transition-opacity cursor-pointer ${showTopBtn && " !opacity-100 !visible"}`} onClick={goToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-[30px]" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        
    </div>
    )
}

export default ScrollToTopBtn