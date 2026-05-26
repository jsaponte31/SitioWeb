import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // 1. Diccionario local con las traducciones
  private translations: any = {
    es: esTranslations,
    en: enTranslations,
  };

  // 2. Signal para rastrear el idioma activo (por defecto Español)
  currentLang = signal<'es' | 'en'>('es');

  // 3. Signal computado que expone solo los textos del idioma activo
  text = computed(() => this.translations[this.currentLang()]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Si estamos en el navegador, recuperamos la preferencia del usuario si existe
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as 'es' | 'en';
      if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        this.currentLang.set(savedLang);
      }
    }
  }

  // 4. Método para alternar entre idiomas
  toggleLanguage() {
    const nextLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(nextLang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', nextLang);
    }
  }
}
