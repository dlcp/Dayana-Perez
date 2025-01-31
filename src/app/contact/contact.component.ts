import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('.+@.+')]],
      message: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), this.validateMessageLength]],
    });
  }

  submitForm() {
    console.log('Formulario:', this.form.value); 
    if (this.form.valid) {
      alert('Los datos del formulario han sido ingresados correctamente');
    } else {
      let errorMessage = 'Por favor, complete todos los campos correctamente.\n';
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          const controlErrors = control.errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              errorMessage += `- ${this.getErrorMessage(key, keyError)}\n`;
            });
          }
        }
      });
      alert(errorMessage);
    }
  }
  

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  validateMessageLength(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length !== 10) {
      return { 'invalidMessageLength': true };
    }
    return null;
  }

  getErrorMessage(controlName: string, errorKey: string): string {
    const control = this.form.get(controlName);
    switch (errorKey) {
      case 'required':
        return `El campo ${controlName} es requerido.`;
      case 'pattern':
        return `El campo ${controlName} no cumple con el formato requerido.`;
      case 'invalidMessageLength':
        return `El campo ${controlName} debe tener exactamente 10 letras.`;
      case 'email':
        return `El campo ${controlName} no es un correo electrónico válido.`;
      default:
        return `Error desconocido en el campo ${controlName}.`;
    }
  }
}
