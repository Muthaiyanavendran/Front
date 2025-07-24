import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent {
  @Input() invoiceData: any;
  @Output() invoiceDataChange = new EventEmitter<any>();
  @Output() qrGenerated = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  generateInvoice() {
  console.log('📦 Sending this invoice:', this.invoiceData);

  this.http.post<any>('http://localhost:8080/api/invoices/generate', this.invoiceData)
    .subscribe({
      next: (response) => {
        console.log('✅ Response received:', response);
        this.invoiceDataChange.emit(response.invoice);
        this.qrGenerated.emit(response.qrCode); // emit QR
      },
      error: (err) => {
        console.error('❌ Backend Error:', err);
      }
    });
}

logoPreview: string | null = null;

onLogoUpload(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string; // base64
      this.invoiceData.logo = this.logoPreview;   // Save in invoiceData
    };
    reader.readAsDataURL(file);
  }
}



  addItem() {
    this.invoiceData.items.push({ name: '', qty: null, price: null});
  }

  removeItem(index: number) {
    this.invoiceData.items.splice(index, 1);
  }
  
}
