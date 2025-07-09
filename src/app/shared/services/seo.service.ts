import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  // SEO FOR HOME PAGE
  public setMetadataToHomeView(title: Title, meta: Meta): void {
    title.setTitle('We Chess | Home');
    meta.updateTag({
      name: 'Description',
      content:
        'Go deep and start to teach students around the world. Explore our programs and go beyond We Chess.',
    });
    meta.updateTag({ name: 'og:title', content: 'We Chess' });
    meta.updateTag({
      name: 'keywords',
      content:
        'chess lessons students classes teacher teach education educational',
    });
    meta.updateTag({
      name: 'og:image',
      content: '',
    });
  }

  // SEO FOR LOGIN PAGE
  public setMetadataToLoginPage(title: Title, meta: Meta): void {
    title.setTitle('We Chess | Login');
    meta.updateTag({
      name: 'Description',
      content: 'Go login into We Chess and explore online lessons.',
    });
    meta.updateTag({
      name: 'og:title',
      content: 'We Chess | Login',
    });
    meta.updateTag({
      name: 'keywords',
      content: 'login init session we chess online lessons classes',
    });
    meta.updateTag({
      name: 'og:image',
      content: '',
    });
  }
}
