import { CurrentConditions } from "./current-conditions/current-conditions.type";
import { Tab } from "./models/tab/tab.type";

export interface ConditionsAndZip extends Tab {
  name: string;
  zip: string;
  data: CurrentConditions;
  date: number;
  contentTemplate: string;
}
