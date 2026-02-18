import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-api-error',
  imports: [],
  templateUrl: './api-error.html',
  styleUrl: './api-error.css',
})
export class ApiError {
  readonly message = signal('Request limit reached, wait a bit and try again ⏳');
}
