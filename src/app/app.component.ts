import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { interval } from 'rxjs';
import { DialogService } from '@ngneat/dialog';

import { TestComponent } from './test.component';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #template let-ref>
      <div class="templateClass">
        <h1>Test modal {{ ref.id }}</h1>
        <p>This is a modal with a timer: {{ timer$ | async }}</p>

        <button (click)="ref.close()">Close</button>
      </div>
    </ng-template>

    <h1>Dialog</h1>
    <p>
      Open dialog using a TemplateRef
      <button (click)="openDialogTemplate()">Open</button>
    </p>

    <p>
      Open dialog using a Component
      <button (click)="openDialogComponent()">Open</button>
    </p>

    <p>
      Open template dialog in the below container
      <button (click)="openDialogTemplate(container)">Open</button>
    </p>

    <div #container>
      The dialog will be appended here
    </div>

    <div #vcr>
      VCR
    </div>
  `,
  styles: [
    `
      .templateClass {
        padding: 15px;
      }
    `
  ],
  viewProviders: [
    {
      provide: 'VCRProvider',
      useValue: 'Value getted from view container injector'
    }
  ]
})
export class AppComponent {
  @ViewChild('template', { static: true })
  tmpl: TemplateRef<any>;

  @ViewChild('vcr', { read: ViewContainerRef })
  vcr: ViewContainerRef;

  timer$ = interval(1000);

  constructor(private dialog: DialogService) {}

  openDialogComponent() {
    this.dialog.open(TestComponent, {
      fullScreen: true,
      data: {
        title: 'My custom dialog'
      },
      vcr: this.vcr
    });
  }

  openDialogTemplate(container?: HTMLElement) {
    this.dialog.open(this.tmpl, {
      width: '600px',
      height: '250px',
      windowClass: 'test',
      backdrop: false,
      enableClose: false,
      fullScreen: true,
      container,
      vcr: this.vcr
    });
  }
}
