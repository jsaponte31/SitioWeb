import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected langService = inject(LanguageService);
}
