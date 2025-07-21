import { Component } from '@angular/core';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceFormComponent, InvoicePreviewComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'qr-generator-ui';

  qrImage: string = ''; //  This stores QR from backend

  invoiceData = {
    invoiceNumber: '',
    date: new Date().toISOString(),
    clientName: '',
    streetAddress: '',
    cityStateCountry: '',
    zipCode: '',
    companyAddress: 'Nihilent Limiled',
    items: [{ name: '', qty: 1, price: 0 }]
  };

  updateInvoice(data: any) {
    this.invoiceData = { ...this.invoiceData, ...data };
  }

  receivedQR(base64QR: string) {
    this.qrImage = base64QR;
  }
}
