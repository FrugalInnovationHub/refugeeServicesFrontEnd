import React from 'react';

import { Pagination as P, PaginationItem, PaginationLink } from 'reactstrap';

const Pagination = ({ pageNumber=0, totalPages=1, handlePageClick }) => {
    return (
        <P aria-label="Pagination">
            <PaginationItem disabled={pageNumber === 0}>
                <PaginationLink onClick={e => handlePageClick(e, 0)} first href="#" />
            </PaginationItem>
            <PaginationItem disabled={pageNumber === 0}>
                <PaginationLink onClick={e => handlePageClick(e, pageNumber - 1)} previous href="#" />
            </PaginationItem>
            {
                [...Array(totalPages)].map((page, i) => (
                    <PaginationItem active={i === pageNumber} key={`page-${i}`}>
                        <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }
            <PaginationItem disabled={pageNumber === totalPages - 1}>
                <PaginationLink onClick={e => handlePageClick(e, pageNumber + 1)} next href="#" />
            </PaginationItem>
            <PaginationItem disabled={pageNumber === totalPages - 1}>
                <PaginationLink onClick={e => handlePageClick(e, totalPages - 1)} last href="#" />
            </PaginationItem>
        </P>
    );
}

export default Pagination;