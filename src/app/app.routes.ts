import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Aboutme } from './aboutme/aboutme';
import { Contact } from './contact/contact';
import { Projects } from './projects/projects';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: Aboutme },
  { path: 'contact', component: Contact },
  { path: 'projects', component: Projects }
];
