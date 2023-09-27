import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  createSnackbar(type: string, message: string, duration: number = 400): void {
    this.snackbar.open(message, '', {
      duration,
      panelClass: type
    });
  }
}
