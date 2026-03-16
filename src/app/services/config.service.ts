import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config = signal<any>(null);

  async load(): Promise<void> {
    return fetch('assets/config.json')
      .then((r) => r.json())
      .then((c) => this.config.set(c));
  }
}
