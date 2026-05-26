import { Component, signal, OnInit, computed } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { tsParticles } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { MoveDirection, OutMode } from '@tsparticles/engine';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('SitioWeb');
  protected readonly darkMode = signal(App.initDarkMode());

  private static initDarkMode(): boolean {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      localStorage.setItem('darkMode', String(prefersDark));
      return prefersDark;
    } catch {
      return false;
    }
  }
  protected readonly shakeToggle = signal(false);
  protected readonly showScrollTop = signal(false);

  protected readonly particlesOptions = computed(() => ({
    background: {
      color: {
        value: this.darkMode() ? '#1f2430' : '#f8f9fa',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: 'grab',
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      paint: {
        color: {
          value: this.darkMode() ? '#ffffff' : '#000000',
        },
        fill: {
          enable: true,
          opacity: 1,
        },
      },
      links: {
        color: this.darkMode() ? '#ffffff' : '#000000',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 200,
      },
      opacity: {
        value: 1,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: 3,
      },
    },
    detectRetina: true,
  }));

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shakeToggle.set(true);
      }
    });
  }

  private onScroll = (): void => {
    this.showScrollTop.set(window.scrollY > 300);
  };

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected toggleDarkMode(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    localStorage.setItem('darkMode', String(next));
    this.reloadParticles();
  }

  private async reloadParticles(): Promise<void> {
    try {
      await tsParticles.load({
        id: 'tsparticles',
        options: this.particlesOptions(),
      });
    } catch (error) {
      console.error('Error recargando tsParticles:', error);
    }
  }

  async ngOnInit(): Promise<void> {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    await loadFull(tsParticles);
    try {
      await tsParticles.load({
        id: 'tsparticles',
        options: this.particlesOptions(),
      });
    } catch (error) {
      console.error('Error cargando tsParticles:', error);
    }
  }
}
