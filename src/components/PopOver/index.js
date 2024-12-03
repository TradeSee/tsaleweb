import * as RdxPopover from "@radix-ui/react-popover";
import "./styles.css";

function PopOverRoot({ children }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopOverTrigger({ children }) {
  return (
    <RdxPopover.Trigger className="outline-none" asChild>
      {children}
    </RdxPopover.Trigger>
  );
}

function PopOverContent({ children, className, align, side }) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        align={align}
        side={side || "bottom"}
        className={"content"}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const PopOver = {
  Root: PopOverRoot,
  Trigger: PopOverTrigger,
  Content: PopOverContent,
};
