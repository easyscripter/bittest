import { IconType } from "react-icons";

export type RouteType = {
  icon: IconType;
  href: string;
  active?: boolean;
  label: string;
};
export type EnergyType = {
  timestep: string;
  currentValue: number;
  prevValue: number;
  change: number;
};

export type GraphDataType = {
  timestep: string;
  currentValue: number;
};

export type ControlValueType = {
  currentValue: number;
  maxValue: number;
  minValue: number;
};

export type DraggableItemType = {
  id: number;
};

export type WidgetType = {
  id: number;
  component: JSX.Element;
};
