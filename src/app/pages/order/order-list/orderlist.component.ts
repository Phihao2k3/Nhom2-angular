import { Component } from '@angular/core';

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent {

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
      productName: {
        title: 'Tên Sản Phẩm',
        type: 'string',
      },
      category: {
        title: 'Thể Loại',
        type: 'string',
      },
      price: {
        title: 'Giá',
        type: 'number',
      },
      quantity: {
        title: 'Số Lượng',
        type: 'number',
      },
      imageUrl: {
        title: 'Hình Ảnh',
        type: 'html',
        valuePrepareFunction: (imageUrl: string) => {
          return `<img src="${imageUrl}" class="img-thumbnail" />`;
        },
        filter: false,
      },
    },
  };

  data = [
    {
      productName: 'Game Disc 1',
      category: 'Action',
      price: 59.99,
      quantity: 100,
      imageUrl: 'https://picsum.photos/100/100?random=1',
    },
    {
      productName: 'Game Disc 2',
      category: 'Adventure',
      price: 49.99,
      quantity: 150,
      imageUrl: 'https://picsum.photos/100/100?random=2',
    },
    {
      productName: 'Game Disc 3',
      category: 'RPG',
      price: 69.99,
      quantity: 200,
      imageUrl: 'https://picsum.photos/100/100?random=3',
    },
    {
      productName: 'Game Disc 4',
      category: 'Strategy',
      price: 39.99,
      quantity: 50,
      imageUrl: 'https://picsum.photos/100/100?random=4',
    },
    {
      productName: 'Game Disc 5',
      category: 'Sports',
      price: 29.99,
      quantity: 75,
      imageUrl: 'https://picsum.photos/100/100?random=5',
    },
  ];
}
