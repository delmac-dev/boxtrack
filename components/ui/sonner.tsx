"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-primary group-[.toaster]:text-dark group-[.toaster]:border-light group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-dark",
          actionButton: "group-[.toast]:bg-tertiary group-[.toast]:text-light",
          cancelButton: "group-[.toast]:bg-tertiary group-[.toast]:text-light",
          icon: "text-tertiary fill-tertiary size-10"
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
