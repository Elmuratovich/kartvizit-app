import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSniper: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ){}

  ngOnInit(): void {
    console.log(this.data);
    
      this.cardForm = this.fb.group({
        name: [this.data?.name || ''],
        title: [this.data?.title || '', Validators.required],
        phone: [this.data?.phone || '', Validators.required],
        email: [this.data?.email || '', Validators.email],
        address:[this.data?.name || '']
      });
  }

  addCard(): void {
    this.showSniper = true;
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartiniz basariyla eklendi!');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit olusurken bir sorun olustu');
    });
  }

  updateCard(): void {
    this.showSniper = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartiniz basariyla duzenlendi!');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit guncellenirken bir sorun olustu');
    });
  }

   deleteCard(): void {
    this.showSniper = true;
    this.cardService.deleteCard(this.data.id)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartiniz basariyla silindi!');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit silinirken bir sorun olusto');
    });
   }

   getSuccess(message: string){
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getCards();
    this.showSniper = false;
    this.dialogRef.close();
   }

   getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSniper = false;
   }
}
