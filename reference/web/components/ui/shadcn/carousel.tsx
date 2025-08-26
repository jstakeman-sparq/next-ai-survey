"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  drag?: boolean
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      className,
      showArrows = false,
      showDots = true,
      autoPlay = false,
      autoPlayInterval = 3000,
      drag = true,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const [dragStart, setDragStart] = React.useState(0)
    const [dragOffset, setDragOffset] = React.useState(0)
    const carouselRef = React.useRef<HTMLDivElement>(null)
    const totalSlides = children.length

    const goToSlide = React.useCallback((index: number) => {
      setCurrentIndex(index)
    }, [])

    const goToPrevious = React.useCallback(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalSlides - 1 : prevIndex - 1,
      )
    }, [totalSlides])

    const goToNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1,
      )
    }, [totalSlides])

    const handleDragStart = React.useCallback(
      (clientX: number) => {
        if (!drag) return
        setIsDragging(true)
        setDragStart(clientX)
        setDragOffset(0)
      },
      [drag],
    )

    const handleDragMove = React.useCallback(
      (clientX: number) => {
        if (!isDragging || !drag) return
        const offset = clientX - dragStart
        setDragOffset(offset)
      },
      [isDragging, dragStart, drag],
    )

    const handleDragEnd = React.useCallback(() => {
      if (!isDragging || !drag) return

      const threshold = 50 // Minimum drag distance to trigger slide change

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          goToPrevious()
        } else {
          goToNext()
        }
      }

      setIsDragging(false)
      setDragStart(0)
      setDragOffset(0)
    }, [isDragging, dragOffset, goToPrevious, goToNext, drag])

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        handleDragStart(e.clientX)
      },
      [handleDragStart],
    )

    const handleTouchStart = React.useCallback(
      (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientX)
      },
      [handleDragStart],
    )

    const handleTouchMove = React.useCallback(
      (e: React.TouchEvent) => {
        handleDragMove(e.touches[0].clientX)
      },
      [handleDragMove],
    )

    const handleTouchEnd = React.useCallback(() => {
      handleDragEnd()
    }, [handleDragEnd])

    React.useEffect(() => {
      if (!autoPlay) return

      const interval = setInterval(goToNext, autoPlayInterval)
      return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, goToNext])

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          goToPrevious()
        } else if (event.key === "ArrowRight") {
          goToNext()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [goToPrevious, goToNext])

    React.useEffect(() => {
      if (!isDragging) return

      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX)
      }

      const handleGlobalMouseUp = () => {
        handleDragEnd()
      }

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }, [isDragging, handleDragMove, handleDragEnd])

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        role="region"
        aria-label="Carousel"
      >
        {/* Carousel Content */}
        <div className="overflow-hidden rounded-lg">
          <div
            ref={carouselRef}
            className={cn(
              "flex transition-transform duration-300 ease-in-out",
              isDragging && "transition-none",
              drag && "cursor-grab active:cursor-grabbing",
            )}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
            }}
            onMouseDown={drag ? handleMouseDown : undefined}
            onTouchStart={drag ? handleTouchStart : undefined}
            onTouchMove={drag ? handleTouchMove : undefined}
            onTouchEnd={drag ? handleTouchEnd : undefined}
          >
            {children.map((child, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                role="tabpanel"
                aria-label={`Slide ${index + 1} of ${totalSlides}`}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 hover:bg-background/90 absolute top-1/2 left-2 -translate-y-1/2 backdrop-blur-sm"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 hover:bg-background/90 absolute top-1/2 right-2 -translate-y-1/2 backdrop-blur-sm"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && totalSlides > 1 && (
          <div className="container mt-4 flex justify-center space-x-2 md:justify-end lg:max-w-[75%]">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  currentIndex === index
                    ? "bg-forest-400 h-4 w-20"
                    : "bg-neutral-light-500 h-4 w-7",
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

Carousel.displayName = "Carousel"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
))

CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselItem }
