import { BrowserModule } from "@angular/platform-browser";
import { NgModule, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ZipcodeEntryComponent } from "./zipcode-entry/zipcode-entry.component";
import { LocationService } from "./location.service";
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";
import { WeatherService } from "./weather.service";
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ConditionsAndZip } from "./conditions-and-zip.type";
import { TabsComponent } from "./tabs/tabs.component";

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    TabsComponent,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {
  locationService = inject(LocationService);

  constructor() {
    let conditionsCached: ConditionsAndZip[] =
      this.locationService.getCachedElement("locations");
    if (conditionsCached) {
      this.locationService.setCurrentCondition(conditionsCached);
      this.locationService.locationsCached = conditionsCached;
    }
  }
}
