import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@ngneat/dialog';

import { AppComponent } from './app.component';
import { TestDialogComponent } from './test-dialog.component';
import { ConfirmationModalComponent } from './custom-confirm-dialog.component';

@NgModule({
  declarations: [AppComponent, TestDialogComponent, ConfirmationModalComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DialogModule.forRoot({
      container: window.parent.document.body
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
