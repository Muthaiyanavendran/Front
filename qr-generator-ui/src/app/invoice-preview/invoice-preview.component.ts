import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css'],
})
export class InvoicePreviewComponent {
  @Input() invoiceData: {
    invoiceNumber: string;
    date: string;
    clientName: string;
    streetAddress: string;
    cityStateCountry: string;
    zipCode: string;
    companyAddress: string;
    items: { name: string; qty: number; price: number }[];
  } = {
    invoiceNumber: '',
    date: '',
    clientName: '',
    streetAddress: '',
    cityStateCountry: '',
    zipCode: '',
    companyAddress: '',
    items: []
  };

  @Input() qrImage: string = ''; // ✅ Added QR Image input

  @ViewChild('invoiceContent', { static: false }) invoiceContent!: ElementRef;

  getTotal(): number {
    return this.invoiceData.items.reduce((total, item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      return total + qty * price;
    }, 0);
  }

  getTax(): number {
    return this.getTotal() * 0.1;
  }

  getGrandTotal(): number {
    return this.getTotal() + this.getTax();
  }

  downloadPDF(): void {
    const element = this.invoiceContent.nativeElement;
    const options = {
      margin: 0.5,
      filename: `invoice-${this.invoiceData.invoiceNumber || '0001'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  }
}
