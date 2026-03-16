import { Component, computed, effect, inject, signal } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  FileIcon,
  Archive,
  SquareActivity,
  SmilePlus,
  Baby,
} from 'lucide-angular';

export interface WorkItem {
  id: number;
  formName: string;
  step: number | string;
  status: 'waitting' | 'on process' | 'done';
}

export const WORK_ITEMS: WorkItem[] = [
  { id: 1, formName: 'แบบบันทึกการพยาบาลห้องผ่าตัด', step: '✅', status: 'done' },
  {
    id: 2,
    formName: 'Admission Record (ห้องคลอด)',
    step: 1,
    status: 'on process',
  },
  {
    id: 3,
    formName: 'แบบฟอร์มการวางแผนดูแลต่อเนื่อง Discharge Planning',
    step: 2,
    status: 'waitting',
  },
];

// สำหรับการ mapping icon จาก config.json
export const ICON_REGISTRY = {
  SmilePlus,
  Baby,
  default: SmilePlus,
} as const;

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly FileIcon = FileIcon;
  readonly Archive = Archive;
  readonly SquareActivity = SquareActivity;
  readonly SmilePlus = SmilePlus;
  readonly Baby = Baby;
  private configService = inject(ConfigService);
  private route = inject(ActivatedRoute);
  apps = computed(() => this.configService.config()?.APP_PORTAL ?? []);

  showModal = signal(false);
  animateModal = signal(false);
  workItems = signal<WorkItem[] | null>(WORK_ITEMS);

  an = signal<string>('');

  getIcon(name: string) {
    return ICON_REGISTRY[name as keyof typeof ICON_REGISTRY] ?? ICON_REGISTRY.default;
  }

  openModal() {
    // this.selectedItem.set(item);
    this.showModal.set(true);

    // Delay เพื่อให้เกิด animation fade + zoom
    setTimeout(() => this.animateModal.set(true), 20);
  }

  closeModal() {
    this.animateModal.set(false);

    setTimeout(() => {
      this.showModal.set(false);
    }, 150); // ให้ animation จบก่อนค่อยปิด
  }

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.an.set(params.get('an') ?? '');
    });
  }
}
