import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected langService = inject(LanguageService);
  private router = inject(Router);

  navigateToRole(role: any): void {
    if (!role.highlight) return;
    const encoded = encodeURIComponent(JSON.stringify(role.highlight.items));
    this.router.navigate([role.highlight.route], {
      queryParams: { highlight: encoded },
    });
  }
}
