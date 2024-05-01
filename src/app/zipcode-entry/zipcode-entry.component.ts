import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LocationService } from "../location.service";
import { WeatherService } from "app/weather.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZipcodeEntryComponent {
  constructor(
    private service: LocationService,
    private weatherService: WeatherService
  ) {}

  addLocation(zipcode: string) {
    if (zipcode.trim() != "") {
      if (this.service.checkIfCached(zipcode)) {
      } else {
        this.weatherService.addCurrentConditions(zipcode).subscribe((data) => {
          this.service.addLocation(zipcode, data);
        });
      }
    }
  }
}
