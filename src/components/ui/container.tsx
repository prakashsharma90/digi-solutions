import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, as: Component = "div", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(
                    "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                    className
                )}
                {...props}
            />
        )
    }
)
Container.displayName = "Container"

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn("py-16 md:py-24", className)}
                {...props}
            />
        )
    }
)
Section.displayName = "Section"

export { Container, Section }
