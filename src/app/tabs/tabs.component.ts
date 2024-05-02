import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Tab } from "app/models/tab/tab.type";

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
  @Input() uniqueKey = "";
  @Input() titleTabProp = "";
  @Output() closeTab = new EventEmitter();
  @Input() descriptionKey: string = "";
  activeIndex: number = 0;

  close(uniqueKey: string | number) {
    this.closeTab.emit(uniqueKey);
  }
}
