import { Component, OnInit, inject } from '@angular/core';
import { SidePanelService } from 'src/modules/ui/services/side-panel.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public sidePanelService = inject(SidePanelService);
  public ngOnInit(): void {}
}
