"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselComp({ images = [] }) {
  const [api, setApi] = React.useState(null)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const isSmall = images.length <= 3

  const scaleClass = (i) => {
    if (!count) return ""
    if (isSmall) return "scale-110 z-20" 
    return i === current ? "scale-110 z-20" : "scale-90 opacity-80"
  }

  const containerMaxW = isSmall ? "max-w-[20rem]" : "max-w-5xl"

  return (
    <div className={`mx-auto ${containerMaxW}`}>
      <Carousel
        setApi={setApi}
        className={`w-full ${containerMaxW}`}
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent className="overflow-visible h-[22rem] my-24">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className={isSmall ? "basis-full" : "basis-1/3"}
            >
              <div
                className={`transition-transform duration-500 ease-out overflow-visible ${scaleClass(
                  index
                )}`}
              >
                <Card className="rounded-xl overflow-hidden">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                    <img
                    src={src}
                    alt={`Slide ${index + 1}`}
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
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current + 1} of {count}
      </div>
    </div>
  )
}
