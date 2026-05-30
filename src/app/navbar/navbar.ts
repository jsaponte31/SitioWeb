import { AfterViewInit, Component, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected langService = inject(LanguageService);
  private router = inject(Router);
  private collapseEl: HTMLElement | null = null;
  isScrolled = signal(false);

  ngAfterViewInit() {
    this.collapseEl = document.getElementById('navbarNav');
    this.collapseEl?.addEventListener('hide.bs.collapse', this.onCollapseHide);
    this.collapseEl?.addEventListener('show.bs.collapse', this.onCollapseShow);
    this.collapseEl?.addEventListener('hidden.bs.collapse', this.onCollapseHidden);
  }

  ngOnDestroy() {
    this.collapseEl?.removeEventListener('hide.bs.collapse', this.onCollapseHide);
    this.collapseEl?.removeEventListener('show.bs.collapse', this.onCollapseShow);
    this.collapseEl?.removeEventListener('hidden.bs.collapse', this.onCollapseHidden);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.isScrolled.set(scrollPosition > 50);
  }

  navigateFromMenu(route: string, event: MouseEvent) {
    event.preventDefault();

    if (window.innerWidth >= 992) {
      void this.router.navigateByUrl(route);
      return;
    }

    const collapseEl = this.collapseEl ?? document.getElementById('navbarNav');
    if (!collapseEl) {
      void this.router.navigateByUrl(route);
      return;
    }

    if (!collapseEl.classList.contains('show')) {
      void this.router.navigateByUrl(route);
      return;
    }

    const navigateAfterClose = () => {
      collapseEl.removeEventListener('hidden.bs.collapse', navigateAfterClose);
      void this.router.navigateByUrl(route);
    };

    collapseEl.addEventListener('hidden.bs.collapse', navigateAfterClose, {
      once: true,
    });

    const toggler = document.querySelector('.navbar-toggler') as HTMLButtonElement | null;
    toggler?.click();
  }

  private onCollapseHide = () => {
    if (window.innerWidth < 992) {
      this.collapseEl?.classList.add('is-closing');
    }
  };

  private onCollapseShow = () => {
    this.collapseEl?.classList.remove('is-closing');
  };

  private onCollapseHidden = () => {
    this.collapseEl?.classList.remove('is-closing');
  };

  getCvUrl(): string {
    const lang = this.langService.currentLang();
    return lang === 'es'
      ? 'assets/CV_ES_JhojanAponte.pdf'
      : 'assets/CV_EN_JhojanAponte.pdf';
  }
}
