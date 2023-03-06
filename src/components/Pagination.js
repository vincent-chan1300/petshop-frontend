import { useState } from "react";
/* import "./Pagination.css"; */
export default function Pagination({ data, RenderComponent, title, pageLimit, dataLimit, tablePagination }) {
    const [pages] = useState(Math.floor(data.length / dataLimit) + 1);
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div className="max-w-2xl lg:max-w-5xl">
            {tablePagination ? (
                getPaginatedData().map((data, idx) => <RenderComponent key={idx} {...data} />)
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-14 md:flex-[3]">


                    {getPaginatedData().map((data, idx) => (
                        <RenderComponent key={idx} {...data} />
                    ))}
                </div>
            )}

            {/* show the next and previous buttons */}
            {data.length > dataLimit && (
                <div className="flex justify-center items-center mt-5">
                    <button onClick={goToPreviousPage} className={`bg-white border-none p-[10px] text-[#0000ff] shadow-[0_0_3px_0_rgba(0,0,0,0.4)] mx-[10px] cursor-pointer ${currentPage === 1 ? " pointer-events-none shadow-none text-[#999]" : ""}`}>
                        上一頁
                    </button>
                    {getPaginationGroup().map((item, index) => (
                        <button key={index} onClick={changePage} className={`bg-white border-2 border-[#666] py-[10px] px-[15px] rounded-full w-[45px] aspect-[1/1] relative mx-[5px] cursor-pointer  ${currentPage === item ? "bg-[#999]" : ""}`}>
                            <span className="">{item}</span>
                        </button>
                    ))}
                    <button onClick={goToNextPage} className={`bg-white border-none p-[10px] text-[#0000ff] shadow-[0_0_3px_0_rgba(0,0,0,0.4)] mx-[10px] cursor-pointer ${currentPage >= pages ? "pointer-events-none shadow-none text-[#999]" : ""}`}>
                        下一頁
                    </button>
                </div>
            )}
        </div>
    );
}
