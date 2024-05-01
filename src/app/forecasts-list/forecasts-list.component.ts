import { Component } from "@angular/core";
import { WeatherService } from "../weather.service";
import { ActivatedRoute } from "@angular/router";
import { Forecast } from "./forecast.type";
import { FORECASTS, LocationService } from "app/location.service";

@Component({
  selector: "app-forecasts-list",
  templateUrl: "./forecasts-list.component.html",
  styleUrls: ["./forecasts-list.component.css"],
})
export class ForecastsListComponent {
  zipcode: string;
  forecast: Forecast;

  constructor(
    protected weatherService: WeatherService,
    route: ActivatedRoute,
    protected locationService: LocationService
  ) {
    route.params.subscribe((params) => {
      this.zipcode = params["zipcode"];
      if (this.locationService.checkIfForecastCached(this.zipcode)) {
        let forecastList: Forecast[] = JSON.parse(
          localStorage.getItem(FORECASTS)
        );
        forecastList.filter((c) => c.zipcode == this.zipcode);
        this.forecast = forecastList[0];
      } else {
        weatherService.getForecast(this.zipcode).subscribe((data) => {
          let forecastToAdd: Forecast = {
            ...data,
            date: new Date().getTime(),
            zipcode: this.zipcode,
          };

          this.locationService.cacheForecast(forecastToAdd);
          this.forecast = forecastToAdd;
        });
      }
    });
  }
}
