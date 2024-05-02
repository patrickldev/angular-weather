import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Tab } from "app/models/tab/tab.type";
import { WeatherService } from "app/weather.service";

@Component({
  selector: "app-tabs",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.css",
})
export class TabsComponent<T extends Tab> {
  @Input()
  arrayData: T[] = [];
  @Input() uniqueKey: string = "";
  @Input() titleTabProp: string = "";
  @Output() closeTab = new EventEmitter();
  @Input() descriptionKey: string = "";
  weatherService = inject(WeatherService);
  activeIndex: number = 0;

  close(uniqueKey: string | number) {
    if (this.activeIndex > 0) {
      this.activeIndex = this.activeIndex - 1;
    }
    this.closeTab.emit(uniqueKey);
  }
}