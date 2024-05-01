import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-tabs",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.css",
})
export class TabsComponent {
  @Input()
  arrayData: any = [];
  @Input() uniqueKey = "";
  @Input() titleTabProp = "";
  @Output() closeTab = new EventEmitter();
  @Input() descriptionKey: string = "";
  activeIndex: number = 0;

  close(uniqueKey: any) {
    this.closeTab.emit(uniqueKey);
  }
}
