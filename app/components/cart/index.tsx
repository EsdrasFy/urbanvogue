"use client"
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Divider } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { ProductI } from "../../interfaces/product/card/index";
import { ProductsByIdsApi } from "../../services/products-by-ids/index";
import { ContextCart } from "../../contexts/ContextCart/index";
import { CardH } from "../card/horizontal/index";
import { Loading } from "./sub-components";

function Cart() {
  const [dataProducts, setDataProducts] = useState<ProductI[] | null>(null);

  const context = useContext(ContextCart);

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const falsetrue = false;
  useEffect(() => {
    if (!context) {
      return;
    }

    const { cartSummary } = context;
    const ids =
      cartSummary?.products.map((product) => product.id).join("&") ?? "";

    const fetchCart = async () => {
      try {
        const { data, status, error } = await ProductsByIdsApi({ ids });
        if (status === 200 && data?.products) {
          setDataProducts(data.products);
        }
        if (status !== 200) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };

  
      fetchCart();
  }, [context?.productsCart]);

  if (!context) {
    return;
  }

  return (
    <>
      <Drawer
        size={"lg"}
        isOpen={context.disclosure.isOpen}
        placement="right"
        onClose={context.disclosure.onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay
          bg="none"
          backdropFilter="saturate(150%) blur(4px)"
          backdropInvert="50%"
          backdropBlur="3px"
        />
        <DrawerContent backgroundColor={"#  "} textColor={"#d9d9d9"}>
          <DrawerCloseButton className="hover:text-custom-pink" />
          <DrawerHeader className="shadow-snipped bg-custom-grayTwo">
            SHOPPING CART
          </DrawerHeader>
          <Divider />
          <DrawerBody backgroundColor={"#171a1b"}>
            <ul className="flex flex-col gap-2">
              {dataProducts && dataProducts.length !== 0
                ? context.cartSummary?.products?.map((product: any, index, array) => {
                    const matchingProduct = dataProducts?.find((dataProduct) => dataProduct.id === product.id) as ProductI | null;
                    const isLastItem = index === array.length - 1;
                    return (
                      <CardH
                        key={index}
                        dataCart={product}
                        quantity={product.quantity}
                        id={product.id}
                        index={index}
                        size={product.size || "default"}
                        color={product.color || "default"}
                        dataId={matchingProduct || null}
                        isLastItem={isLastItem}
                      />
                    );
                  })
                : context.cartSummary?.products?.map((product: any, index, array) => {
                    const isLastItem = index === array.length - 1;
                    return <Loading key={index} isLastItem={isLastItem} />;
                  })}
            </ul>
          </DrawerBody>
          <Divider className="shadow-snipped" />
          <DrawerFooter
            backgroundColor={"#1d2123"}
            className="w-full flex justify-between"
          >
            <div className="flex justify-between w-full items-center max-sm:">
              <div className="text-xl text-custom-pink max-sm:text-base">
                TOTAL{" "}
                <span className="text-custom-textColor font-medium ml-2 max-sm:ml-0">
                  ${context.cartSummary?.totalPrice.toFixed(2)}
                </span>
              </div>
              <Link
                href={"/checkout"}
                className={`group bg-none border-2 w-56 border-custom-pink flex gap-12 items-center pl-2 justify-center text-custom-textColor py-1 rounded text-lg duration-300 hover:bg-custom-pink max-sm:text-sm max-sm:w-48 `}
              >
                <span>Close order</span>
                <FaArrowRight className="transition-all ease-in-out -translate-x-7 group-hover:translate-x-0 duration-1000" />
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { Cart };
