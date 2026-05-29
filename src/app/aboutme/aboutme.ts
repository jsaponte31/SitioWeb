import { Component, inject, signal, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-aboutme',
  imports: [],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss',
})
export class Aboutme {
  protected langService = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private highlights = signal<Set<string>>(new Set());

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const raw = params.get('highlight');
      if (!raw) return;
      try {
        const items: { type: string; institucion?: string; empresa?: string; block?: string }[] =
          JSON.parse(decodeURIComponent(raw));
        const block = items[0]?.block ?? 'center';
        const keys = items.map((item) => {
          const name = item.institucion ?? item.empresa ?? '';
          return `${item.type}-${name}`;
        });
        this.highlights.set(new Set(keys));

        afterNextRender(() => {
          setTimeout(() => {
            const el = document.querySelector('.timeline-card');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: block as ScrollLogicalPosition });
          }, 100);
        });

        setTimeout(() => {
          this.highlights.set(new Set());
          // this.router.navigate([], {
          //   queryParams: { highlight: null },
          //   queryParamsHandling: 'merge',
          // });
        }, 3000);
      } catch {
        // ignorar highlight inválido
      }
    });
  }

  isHighlighted(type: string, name: string): boolean {
    return this.highlights().has(`${type}-${name}`);
  }
}
