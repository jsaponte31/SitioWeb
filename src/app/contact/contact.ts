import { Component, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../services/contact-service.service';
import { LanguageService } from '../services/language.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  // Inyectamos el servicio que acabamos de crear
  protected contactService = inject(ContactService);
  protected langService = inject(LanguageService);
  protected toastr = inject(ToastrService);

  isSubmitting = signal<boolean>(false);

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isSubmitting.set(true);

    this.contactService.sendEmail(form.value).subscribe({
      next: (data) => {
        console.log('data',data);
        
        this.isSubmitting.set(false);
        form.resetForm();
        this.toastr.success('¡Correo enviado con éxito!', 'Contacto');
      },
      error: (error) => {
        console.error('Error en el flujo de contacto:', error);
        this.isSubmitting.set(false);
        this.toastr.error('Hubo un problema. Intenta de nuevo.', 'Contacto');
      },
    });
  }
}
