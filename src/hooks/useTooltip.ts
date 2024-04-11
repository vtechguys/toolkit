import clsx from "clsx";
import { isNil } from "lodash-es";
import "./useTooltip.css";

export const tooltipClasses = {
  root: "with-tooltip",
  activateOnHover: "with-tooltip--hover",
  activateOn: "with-tooltip--active",
  restrictWidth: "with-tooltip--no-overflow-container",
  placement: {
    top: "with-tooltip--top",
    bottom: "with-tooltip--bottom",
    left: "with-tooltip--left",
    right: "with-tooltip--right",
  },
};

interface IUseTooltipProps {
  text: string;
  open?: boolean;
  placement: keyof (typeof tooltipClasses)["placement"];
}

export function useTooltip({
  text,
  placement = "top",
  open,
}: IUseTooltipProps) {
  return {
    className: clsx({
      [tooltipClasses.root]: true,
      [tooltipClasses.activateOnHover]: isNil(open),
      [tooltipClasses.activateOn]: open,
      [tooltipClasses.placement[placement]]: placement,
    }),
    tooltipProps: {
      "data-tooltip": text,
    },
  };
}
