import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected langService = inject(LanguageService);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 50);
  }

  getCvUrl(): string {
    const lang = this.langService.currentLang();
    return lang === 'es'
      ? 'assets/CV_ES_JhojanAponte.pdf'
      : 'assets/CV_EN_JhojanAponte.pdf';
  }
}
