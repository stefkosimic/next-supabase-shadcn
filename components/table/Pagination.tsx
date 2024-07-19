import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "../ui/button";

// import { Select } from "./Select";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pageNumbers,
  paginate,
  itemsPerPage,
  setItemsPerPage,
}: any) => {
  return (
    <div className="flex w-full justify-between gap-4 py-4 sm:px-6">
      <div className="flex w-full items-center justify-center gap-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((c: number) => c - 1);
            }
          }}
        >
          <FaAngleLeft className="text-xl" />
        </div>
        <div className="flex gap-2">
          {pageNumbers.map((_: any, index: number) => (
            <button
              className={currentPage === index + 1 ? "text-red-200" : ""}
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (currentPage < pageNumbers.length) {
              setCurrentPage((c: number) => c + 1);
            }
          }}
        >
          <FaAngleRight className="text-xl" />
        </div>
      </div>
      <div>
        {/* <Select
          options={[15, 20, 50]}
          placeholder="Items per page"
          label="Items per page"
          value={itemsPerPage}
          classes="select-sm"
          onChange={(e: any) => {
            setItemsPerPage(e.target.value);
            setCurrentPage(1);
          }}
        /> */}
      </div>
    </div>
  );
};
