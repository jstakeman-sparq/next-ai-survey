import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"
import { ProgressiveBlur } from "./progressive-blur"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
  /**
   * Duration of the animation in seconds
   * @default 20
   */
  duration?: number
  /**
   * Gap between items in rem
   * @default 1
   */
  gap?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 20,
  gap = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
      style={
        {
          "--duration": `${duration}s`,
          "--gap": `${gap}rem`,
        } as React.CSSProperties
      }
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)] items-center", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

export function MarqueeWrapper({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}

      <ProgressiveBlur
        position="left"
        className="pointer-events-none absolute top-[-0.5rem] h-[calc(100%+1rem)] left-0 w-1/4"
      />
      <ProgressiveBlur
        position="right"
        className="pointer-events-none absolute top-[-0.5rem] h-[calc(100%+1rem)] right-0 w-1/4"
      />
    </div>
  )
}
