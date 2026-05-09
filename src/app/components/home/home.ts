import { Component, computed, inject, signal } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  Archive,
  SmilePlus,
  Baby,
  Search,
  SquareArrowOutUpRight,
} from 'lucide-angular';

export interface AppPortalItem {
  title: string;
  icon: string;
  url: string;
  disable: boolean;
  iconColor: string;
  itemIndex: number;
}

// สำหรับการ mapping icon จาก config.json
export const ICON_REGISTRY = {
  SmilePlus,
  Baby,
  SquareArrowOutUpRight,
  default: SmilePlus,
} as const;

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly Archive = Archive;
  readonly SmilePlus = SmilePlus;
  readonly Baby = Baby;
  readonly Search = Search;
  private configService = inject(ConfigService);
  private route = inject(ActivatedRoute);
  apps = computed(() => (this.configService.config()?.APP_PORTAL ?? []) as AppPortalItem[]);
  announcement = computed(
    () => this.configService.config()?.ANNOUNCEMENT ?? 'กดปุ่ม Shift+F5 เพื่อ ล้างค่า Cache',
  );
  searchQuery = signal<string>('');
  filteredApps = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const all = this.apps().filter((a) => !a.disable);
    if (!q) return all;
    return all.filter((a) => a.title.toLowerCase().includes(q));
  });

  an = signal<string>('');

  getIcon(name: string) {
    return ICON_REGISTRY[name as keyof typeof ICON_REGISTRY] ?? ICON_REGISTRY.default;
  }

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.an.set(params.get('an') ?? '');
    });
  }
}
