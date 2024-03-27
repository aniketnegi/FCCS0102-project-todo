import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ReactNode } from "react"

interface HoverDescriptionProps {
  button: ReactNode,
  description: string,
}

export default function HoverDescription({ button, description }: HoverDescriptionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {button}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Task Description</h4>
            <p className="text-sm text-wrap">
              {description}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
