import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'iris';
  lists: any[] = [];

  addItem(item: any) {
    this.lists = [item, ...this.lists];
  }

  deleteItem(id: string) {
    this.lists = this.lists = this.lists.filter((item) => item.id !== id);
  }
}
