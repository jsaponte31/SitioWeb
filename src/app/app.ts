import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { tsParticles } from '@tsparticles/engine';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadFull } from 'tsparticles';
import { Engine, MoveDirection, OutMode } from '@tsparticles/engine';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgxParticlesModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('SitioWeb');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // Objeto de configuración para el efecto "Plexus" (Red de nodos)
  particlesOptions = {
    background: {
      color: {
        value: '#f8f9fa', // Fondo claro de tu referencia
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: 'grab', // Crea líneas hacia el puntero del mouse
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
      color: {
        value: '#000000', // Color de los puntos (gris Bootstrap)
      },
      links: {
        color: '#000000', // Color de las líneas que unen los puntos
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
        speed: 1, // Movimiento suave y lento
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 200, // Cantidad de partículas (ajusta según veas el rendimiento)
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 2, max: 4 },
      },
    },
    detectRetina: true,
  };

  async ngOnInit(): Promise<void> {
    // Validamos que el código corra estrictamente en el navegador del usuario
    if (isPlatformBrowser(this.platformId)) {
      try {
        // PASO 1: Registramos los plugins obligatoriamente primero
        await loadFull(tsParticles);

        // PASO 2: Una vez registrados, cargamos la configuración en el contenedor
        await tsParticles.load({
          id: 'tsparticles',
          options: this.particlesOptions,
        });
      } catch (error) {
        console.error('Error cargando tsParticles:', error);
      }
    }
  }
}
