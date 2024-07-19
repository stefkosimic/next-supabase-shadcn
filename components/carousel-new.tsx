import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { formatCurrency } from "@/lib/utils";

export function CarouselSize({ products, title }: any) {
  return (
    <div className="my-8 p-4">
      {title && (
        <h1 className="mb-4 p-4 text-center text-3xl font-semibold">{title}</h1>
      )}
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product: any, index: number) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="relative flex w-full flex-col overflow-hidden rounded-md pb-14">
                <div className="aspect-square overflow-hidden rounded-md">
                  <Image
                    src={product.featured_image.publicUrl}
                    alt="Floor patern picture"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 flex flex-col gap-2">
                  {product.name && (
                    <p className="font-semibold">{product.name}</p>
                  )}
                  <div className="flex leading-3 text-gray-500">
                    <p className="mr-2">From</p>
                    <p className="mr-1">{formatCurrency(product.price)}</p>
                    <p>/m2</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

{
  /* <div className="p-1">
<Card>
  <CardContent className="flex flex-col items-start justify-center gap-2">
    <div className="flex w-full flex-col overflow-hidden rounded-md">
      <Image
        src={product.featured_image.publicUrl}
        alt="Floor patern picture"
        width={300}
        height={300}
        className="h-full w-full object-cover"
      />
    </div>
    asd
  </CardContent>
</Card>
</div> */
}
