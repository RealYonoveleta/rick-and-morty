import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-api-error',
  imports: [],
  templateUrl: './api-error.html',
  styleUrl: './api-error.css',
})
export class ApiError {
  readonly error = input<HttpErrorResponse>();

  readonly errorMessage = computed(() => {
    const status = this.error()?.status;
    return this.ERROR_MESSAGES[status!] || 'An unexpected error occurred. Please try again later.';
  });

  private readonly ERROR_MESSAGES: Record<number, string> = {
    404: 'No Ricksults found in this dimension',
    500: 'Internal server error. Please try again later',
  };
}
