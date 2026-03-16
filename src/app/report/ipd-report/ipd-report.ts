import { Component, computed, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';

import { LucideAngularModule, ClipboardPlus  } from 'lucide-angular';

@Component({
  selector: 'app-ipd-report',
  imports: [LucideAngularModule],
  templateUrl: './ipd-report.html',
  styleUrl: './ipd-report.scss',
})
export class IpdReport {
  readonly ClipboardPlus = ClipboardPlus;
  private configService = inject(ConfigService);
  apps = computed(() => this.configService.config()?.APP_REPORT ?? []);
}
