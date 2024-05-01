import { Injectable, signal } from "@angular/core";
import { ConditionsAndZip } from "./conditions-and-zip.type";
import { CurrentConditions } from "./current-conditions/current-conditions.type";
import { Forecast } from "./forecasts-list/forecast.type";

// import {WeatherService} from "./weather.service";

export const LOCATIONS: string = "locations";
export const FORECASTS: string = "forecasts";

@Injectable()
export class LocationService {
  locationsCached: ConditionsAndZip[] = [];
  private currentConditions = signal<ConditionsAndZip[]>([]);

  constructor() {}

  addLocation(zipcode: string, data: CurrentConditions) {
    let locationToAdd: ConditionsAndZip = {
      name: data.name + "(" + zipcode + ")",
      zip: zipcode,
      data: data,
      date: new Date().getTime(),
      contentTemplate: "weatherTemplate",
    };
    let storage: ConditionsAndZip[] = JSON.parse(
      localStorage.getItem(LOCATIONS)
    );

    this.locationsCached = this.locationsCached.filter((c) => c.zip != zipcode);

    this.locationsCached.push(locationToAdd);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locationsCached));
    if (this.currentConditions().filter((c) => c.zip == zipcode).length > 0) {
    } else {
      this.currentConditions.update((conditions) => [
        ...conditions,
        locationToAdd,
      ]);
    }
  }

  //REMOVE LOCATION
  removeLocation(zipcode: string) {
    this.currentConditions.update(() =>
      this.currentConditions().filter((c) => c.zip != zipcode)
    );
  }

  // setCurrentCondition(cond: ConditionsAndZip[]) {
  //   this.currentConditions.update((conditions) => cond);
  // }

  // RETURN THE CURRENT CONDITION
  getCurrentConditions(): ConditionsAndZip[] {
    return this.currentConditions();
  }

  //CHECK IF CONDITION IS CACHED
  checkIfCached(zipcode: string, date: number = new Date().getTime()): boolean {
    let checkStorage: ConditionsAndZip[] = JSON.parse(
      localStorage.getItem(LOCATIONS)
    );
    if (checkStorage) {
      if (checkStorage.filter((c) => c.zip == zipcode).length > 0) {
        if (
          checkStorage.filter(
            (c) => c.zip == zipcode && c.date + 2 * 60 * 60 * 1000 > date
          ).length > 0
        ) {
          let itemToPush: ConditionsAndZip[] = checkStorage.filter(
            (c) => c.zip == zipcode
          );
          if (
            this.currentConditions().filter((c) => c.zip == zipcode).length > 0
          ) {
          } else {
            this.currentConditions.update((conditions) => [
              ...conditions,
              itemToPush[0],
            ]);
          }
          return true;
        } else {
          checkStorage = checkStorage.filter((c) => c.zip != zipcode);

          localStorage.setItem(LOCATIONS, JSON.stringify(checkStorage));

          return false;
        }
      } else return false;
    }
    return false;
  }
  // CACHE FORECAST
  cacheForecast(data: Forecast) {
    if (!localStorage.getItem(FORECASTS)) {
      localStorage.setItem(FORECASTS, JSON.stringify([data]));
    } else {
      let storage: Forecast[] = JSON.parse(localStorage.getItem(FORECASTS));
      storage = storage.filter((c) => c.zipcode != data.zipcode);
      storage.push(data);
      localStorage.setItem(FORECASTS, JSON.stringify(storage));
    }
  }
  //CHECK IF FORECAST IS CACHED
  checkIfForecastCached(
    zipcode: string,
    date: number = new Date().getTime()
  ): boolean {
    let checkStorage: Forecast[] = JSON.parse(localStorage.getItem(FORECASTS));
    if (checkStorage) {
      if (checkStorage.filter((c) => c.zipcode == zipcode).length > 0) {
        if (
          checkStorage.filter(
            (c) => c.zipcode == zipcode && c.date + 2 * 60 * 60 * 1000 > date
          ).length > 0
        ) {
          return true;
        } else return false;
      }
      return false;
    }
  }
}
