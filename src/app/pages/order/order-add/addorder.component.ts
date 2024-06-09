import { Component } from '@angular/core';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss']
})
export class AddorderComponent {
  newOrder: any = {
    productName: '',
    category: '',
    price: null,
    quantity: null,
    imageUrl: ''
  };

  constructor() { }

  addOrder() {
    // Logic to add new product order
    console.log('New Product:', this.newOrder);
    // Implement logic to send data to backend or handle it accordingly
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newOrder.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
