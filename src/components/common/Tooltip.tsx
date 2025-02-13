import { PropsWithChildren } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipUI,
} from "../ui/tooltip";

const Tooltip = ({
  children,
  content,
}: PropsWithChildren & { content: string | React.ReactNode }) => {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-neutral-900 text-neutral-100">
          {content}
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  );
};

export default Tooltip;
