import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { ConfigService } from '../../services/config.service';

export interface OperSheetPayload {
  an: string;
  hn: string;
  ward: string;
  arrived_date: string; // YYYY-MM-DD
  arrived_time: string; // HH:mm
}

@Injectable({
  providedIn: 'root',
})
export class OperSheetService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private apiBase = computed(() => this.configService.config()?.API_BASE ?? []);

  postOperSheet(data: OperSheetPayload) {
    return this.http.post(`${this.apiBase()}/api/v1/oper-sheet`, data);
  }
}
