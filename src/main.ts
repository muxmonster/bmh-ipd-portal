import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { ConfigService } from './app/services/config.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

const configService = new ConfigService();

configService.load().then(() => {
  bootstrapApplication(App, {
    providers: [provideRouter(routes), { provide: ConfigService, useValue: configService }],
  }).catch((err) => console.error(err));
});
