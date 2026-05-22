import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);

  goAbout() {
    this.router.navigate(['/about']);
  }

  goContact() {
    this.router.navigate(['/contact']);
  }

  goProjects() {
    this.router.navigate(['/projects']);
  }
}
