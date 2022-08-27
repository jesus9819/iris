import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnChanges {
  @Input() lists: any[] = [];
  @Output() delete = new EventEmitter();

  pendingTodo: any[] = [];
  completeTodo: any[] = [];
  complete: any[] = [];

  constructor() {}

  ngOnChanges() {
    this.pendingTodo = this.groupedItems(this.lists);
  }

  groupedItems(lists: any[]) {
    return lists.reduce((prev, { category, ...items }) => {
      const id = prev.findIndex((item: any) => item.category === category);
      id >= 0
        ? prev[id].items.push(items)
        : prev.push({ category, items: [items], id });
      return prev;
    }, []);
  }

  updateTodo(id: string) {
    setTimeout(() => {
      const todo = this.lists.find((item) => item.id === id);

      this.completeTodo = [todo, ...this.completeTodo];

      this.complete = this.groupedItems(this.completeTodo);

      this.delete.emit(id);
    }, 300);
  }
}
