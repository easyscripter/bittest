import { IconType } from "react-icons";

export type RouteType = {
  icon: IconType;
  href: string;
  active?: boolean;
  label: string;
};
