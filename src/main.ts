import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Configuração global do fetch para Server-Side Rendering
(globalThis as any).fetch = globalThis.fetch || require('node-fetch');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
