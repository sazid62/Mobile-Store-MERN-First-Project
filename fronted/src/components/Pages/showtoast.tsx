// @ts-ignore
"use client"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export function ToastSimple() {
  const { toast } = useToast()

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          toast({
            title: "Success",
            description: "Your toast is ready!",
            variant: "default"
          })
        }}
      >
        Make Toast
      </Button>
      <Button
        onClick={() => {
          toast({
            title: "Warning", 
            description: "Your toast is burning!",
            variant: "destructive"
          })
        }}
        className="ml-2"
      >
        Burn Toast
      </Button>
      <Toaster />
    </div>
  )
}
