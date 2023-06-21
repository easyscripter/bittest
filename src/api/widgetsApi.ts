import { ControlValueType, EnergyType, GraphDataType } from "../types";
import API from "./api";

type ControlValueResponseType = {
  value: ControlValueType;
};
type TablesValueResponseType = Array<EnergyType>;
type GraphsValueResponseType = Array<GraphDataType>;

export const getControlValue = () => {
  return API.get<ControlValueResponseType>("/controlValue");
};

export const getTablesValue = () => {
  return API.get<TablesValueResponseType>("/tableValues");
};

export const getGraphValues = () => {
  return API.get<GraphsValueResponseType>("/graphValues");
};
