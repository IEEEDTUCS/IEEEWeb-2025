"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselComp({ images = [] }) {
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(images.length);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  const isSmall = images.length <= 3;

  const scaleClass = (i) => {
    if (!count) return "";
    if (isSmall) return "scale-105 z-20";
    return i === current ? "scale-105 z-20" : "scale-90 opacity-70";
  };

  const containerMaxW = isSmall ? "max-w-[18rem] sm:max-w-[22rem]" : "max-w-6xl";

  return (
    <div className={`mx-auto px-2 ${containerMaxW}`}>
      <Carousel
        setApi={setApi}
        className={`w-full ${containerMaxW}`}
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent className="overflow-visible h-[16rem] sm:h-[20rem] md:h-[22rem] my-12 sm:my-16">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className={isSmall ? "basis-full" : "basis-full sm:basis-1/2 md:basis-1/3"}
            >
              <div className={`transition-transform duration-500 ease-out ${scaleClass(index)}`}>
                <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-8" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-8" />
          </>
        )}
      </Carousel>

      <div className="text-muted-foreground py-3 text-center text-xs sm:text-sm">
        Slide {current + 1} of {count}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-1">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => api && api.scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === current ? "bg-primary w-4" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
