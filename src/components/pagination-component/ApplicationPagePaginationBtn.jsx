import React from 'react'

const PaginationBtn = ({ 
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,}) => {
        
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <>
            {pages.map((page, index) => {
                return (
                        <>
                            <span
                              key={index}
                              className={`icon ${page == currentPage && ' active'}`}
                              onClick={() => setCurrentPage(index+1)}
                              >
                              {page}
                            </span>
                        </>

                );
            })}
        </>
    );


}

export default PaginationBtn;
