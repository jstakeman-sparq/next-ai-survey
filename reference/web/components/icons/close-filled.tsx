import { SVGProps } from "react"

export function CloseFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 1.50012C6.15 1.50012 1.5 6.15012 1.5 12.0001C1.5 17.8501 6.15 22.5001 12 22.5001C17.85 22.5001 22.5 17.8501 22.5 12.0001C22.5 6.15012 17.85 1.50012 12 1.50012ZM16.05 17.2501L12 13.2001L7.95 17.2501L6.75 16.0501L10.8 12.0001L6.75 7.95012L7.95 6.75012L12 10.8001L16.05 6.75012L17.25 7.95012L13.2 12.0001L17.25 16.0501L16.05 17.2501Z"
        fill="currentColor"
      />
    </svg>
  )
}
