import { Component } from '@angular/core';

@Component({
  selector: 'basic-example-data',
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  `,
})
export class productlistComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      ID: {
        title: 'ID',
      },
      name: {
        title: name, // Translated to Vietnamese: Product Name
      },
      price: {
        title: 'Giá tiền', // Translated to Vietnamese: Price
      },
      NXB: {
        title: 'NXB', // Translated to Vietnamese: Publisher
      },
      image: {
        title: 'hình ảnh', // Translated to Vietnamese: Image
      },
      release_date: {
        title: 'Ngày ra mắt', // Translated to Vietnamese: Release Date
      },
      stock_quantity: {
        title: 'Số lượng', // Translated to Vietnamese: Quantity
      },
      // Add more columns here if needed...
    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
    },
  };

  data = [
    {
      ID: 1,
      name: 'Ratchet & Clank: Rift Apart',
      price: '1.500.000₫',
      NXB: 'Insomniac Games',
      image: 'ratchet',
      release_date: '11/06/2021',
      stock_quantity: 100,
    },
    {
      ID: 2,
      name: 'Returnal',
      price: '2.100.000₫',
      NXB: 'Housemarque',
      image: 'returnal',
      release_date: '30/04/2021',
      stock_quantity: 50,
    },
    {
      ID: 3,
      name: 'Demon’s Souls',
      price: '1.900.000₫',
      NXB: 'Bluepoint Games',
      image: 'demon',
      release_date: '12/11/2020',
      stock_quantity: 200,
    },
    {
      ID: 4,
      name: 'Final Fantasy XVI',
      price: 'TBA',
      NXB: 'Square Enix',
      image: 'FF',
      release_date: 'TBA',
      stock_quantity: 0,
    },
    {
      ID: 5,
      name: 'Gran Turismo 7',
      price: 'TBA',
      NXB: 'Polyphony Digital',
      image: 'GT',
      release_date: 'TBA',
      stock_quantity: 0,
    },
    {
      ID: 6,
      name: 'Horizon ForbIDden West',
      price: 'TBA',
      NXB: 'Guerrilla Games',
      image: 'HFW',
      release_date: 'TBA',
      stock_quantity: 0,
    },
    {
      ID: 7,
      name: 'God of War Ragnarok',
      price: 'TBA',
      NXB: 'Santa Monica Studio',
      image: 'GoW',
      release_date: 'TBA',
      stock_quantity: 0,
    },
  ];
}
