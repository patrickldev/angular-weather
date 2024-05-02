import { Component, inject } from "@angular/core";
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);

  showForecast(zipcode: string) {
    this.router.navigate(["/forecast", zipcode]);
  }

  close(uniqueKey: string | number) {
    this.locationService.removeLocation(uniqueKey as string);
  }
}
