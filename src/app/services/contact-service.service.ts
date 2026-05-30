import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private readonly formspreeUrl = 'https://formspree.io/f/xojbbkrr';

  /**
   * @param formData Objeto con { nombre, apellidos, email, descripcion, empresa }
   */
  sendEmail(formData: any): Observable<any> {
    return this.http.post(this.formspreeUrl, formData);
  }
}
