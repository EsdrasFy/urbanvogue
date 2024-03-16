"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { RiFilterLine } from "react-icons/ri";
import { GridSearch } from "@/(pages)/search/components/grid/index";
import { Filter } from "@/(pages)/search/components/filter/index";
import { ProductSearchApi } from "@/services/product-search";
import { ProductI } from "@/interfaces/product/card";
import { useSearchParams } from "next/navigation";
import { FiltersI } from "./types";

function Search() {
  const [filters, setFilters] = useState<FiltersI | null>(null);
  const handleFilters = (filtersData: FiltersI) => {
    setFilters(filtersData);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Suspense
      fallback={
        <div className="absolute top-1/2 left-1/2">
          Error finding products for search
        </div>
      }
    >
      <main
        className={`relative min-h-screen min-w-full flex flex-col items-center justify-center pt-32`}
      >
        <Filter
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          filters={filters}
        />

        <Suspense
          fallback={
            <div className="absolute top-1/2 left-1/2">
              Error finding products for search
            </div>
          }
        >
          <GridSearch handleFilters={handleFilters} />
        </Suspense>
        <aside
          className="z-20 fixed border-[1px] border-custom-pink shadow-snipped bottom-5 right-5 bg-custom-grayThree/20 duration-300 ease-linear cursor-pointer hover:bg-custom-grayTwo rounded-full w-16 h-16 flex items-center justify-center"
          onClick={onOpen}
        >
          <RiFilterLine className="text-4xl text-custom-pink" />
        </aside>
      </main>
    </Suspense>
  );
}

export default Search;
