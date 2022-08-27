import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.scss'],
})
export class FormTodoComponent implements OnInit {
  form!: FormGroup;
  @Output() item = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get validCategory() {
    return (
      this.form.get('category')?.invalid && this.form.get('category')?.touched
    );
  }

  get validDescription() {
    return (
      this.form.get('description')?.invalid &&
      this.form.get('description')?.touched
    );
  }

  createTodo() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    const item = {
      id: uuidv4(),
      ...this.form.value,
    };

    this.item.emit(item);
    this.createForm();
    this.form.reset(this.form.value);
  }
}
