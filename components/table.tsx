"use client";

import { useState } from "react";
import { ACTIONS_DROPDOWN } from "@/content/admin";
import { isEmpty } from "lodash";
import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Filter } from "./filter";
import { Icons } from "./icons";
import { Loader } from "./loader";
import { Pagination } from "./table/Pagination";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function EnhancedTable({
  columns,
  data,
  tabs,
  activeTab,
  changeTab,
  showFilters = true,
  filters,
  selectedFilters,
  setSelectedFilters,
  isLoading,
  handleRowClick,
  tableFor,
  disableSearch = false,
  disableSelectAll = false,
}: any) {
  const initialSort = { column: null, direction: "asc" };
  const [sort, setSort] = useState(initialSort);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleFilter = (key: string, checked: boolean | null, option: any) => {
    const currentFilters = { ...selectedFilters };

    if (checked === null) {
      currentFilters[key] = option;
      setSelectedFilters(currentFilters);
      return;
    }

    if (!currentFilters[key]) {
      currentFilters[key] = [option];
    } else {
      if (checked) {
        currentFilters[key] = [...currentFilters[key], option];
      } else {
        currentFilters[key] = currentFilters[key].filter(
          (f: any) => f.label !== option.label
        );
      }
    }
    setSelectedFilters(currentFilters);
  };

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((row: any) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSort = (column: any) => {
    const newDirection =
      sort.column === column && sort.direction === "asc" ? "desc" : "asc";
    setSort({ column, direction: newDirection });
  };

  const sortedData =
    filteredData &&
    [...filteredData].sort((a, b) => {
      const columnA = a[sort.column!];
      const columnB = b[sort.column!];
      if (columnA < columnB) return sort.direction === "asc" ? -1 : 1;
      if (columnA > columnB) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // const pageNumbers = Array.from({
  //   length: Math.ceil(filteredData?.length / itemsPerPage),
  // });

  const getPageNumbers = () => {
    let arr = [] as any;

    for (let i = 0; i < Math.ceil(filteredData?.length / itemsPerPage); i++) {
      arr.push(i + 1);
    }

    return arr;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      {/* HEADER */}
      <div className="flex w-full items-center justify-between pb-4">
        <form>
          {!disableSearch && (
            <div className="w-80">
              <Input
                type="search"
                placeholder={`Zoek een ${tableFor}...`}
                className="w-full appearance-none bg-muted pl-8 shadow-none"
                value={searchQuery}
                leftElement={
                  <Search className="absolute bottom-0.5 left-0 h-4 w-4 text-muted-foreground" />
                }
                onChange={handleSearch}
              />
            </div>
          )}
        </form>
        <div className="flex items-center space-x-2">
          {!disableSelectAll && (
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Select All</Label>
            </div>
          )}

          {/* filter */}
          {showFilters && (
            <Filter
              items={filters}
              handleFilterChange={handleFilter}
              trigger={
                <Button aria-haspopup="true" variant="ghost">
                  <Icons.filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              }
            />
          )}
        </div>
      </div>
      {/* tabs */}
      {!isEmpty(tabs) && (
        <div className="flex w-full justify-between gap-6">
          {tabs.map((tab: any, index: number) => (
            <div
              onClick={() => changeTab(tab.value)}
              key={index}
              className={`text-md cursor-pointer border-b py-4 duration-200 ${
                activeTab === tab.value
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
      )}
      <Table>
        <TableHeader className="border-t">
          <TableRow>
            {columns.map((column: any, index: number) => (
              <TableHead
                key={index}
                className="text-input-foreground w-[300px] cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                onClick={() => handleSort(column.accessKey)}
              >
                {column.label}
                {sort.column === column.accessKey &&
                  (sort.direction === "asc" ? " ▲" : " ▼")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((row: any, index: any) => (
            <TableRow
              className="hover:bg-base-100 cursor-pointer duration-200"
              key={index}
              onClick={() => handleRowClick && handleRowClick(row)}
            >
              {columns.map((column: any, index: number) => {
                switch (column.type) {
                  case "actions":
                    return (
                      <TableCell
                        key={index}
                        className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {ACTIONS_DROPDOWN.label}
                            </DropdownMenuLabel>
                            {column.actions.map((action: any, index: any) => (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                key={index}
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  action.action(row);
                                }}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    );

                  default:
                    return (
                      <TableCell
                        key={index}
                        className="py-5 pl-4 pr-3 text-sm sm:pl-0"
                      >
                        <div className={column.className || ""}>
                          {column.content(row)}
                        </div>
                      </TableCell>
                    );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && (
        <div className="flex w-full justify-center py-4 text-center">
          <Loader fill="var(--primary)" />
        </div>
      )}
      {!isLoading && isEmpty(currentItems) && (
        <div className="flex w-full justify-center py-4 text-center">
          <div>Leeg</div>
        </div>
      )}
      {/* <Pagination
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        itemsPerPage={4}
        setItemsPerPage={setItemsPerPage}
      /> */}
    </div>
  );
}
