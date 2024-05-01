import { CurrentConditions } from "./current-conditions/current-conditions.type";

export interface ConditionsAndZip {
  name: string;
  zip: string;
  data: CurrentConditions;
  date: number;
  contentTemplate: string;
}
