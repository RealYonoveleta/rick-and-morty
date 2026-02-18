import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[clickableWidget]',
  host: {
    '(click)': 'onClick()',
  },
})
export class ClickableWidget {
  result = input<any>();
  selected = output<any>();

  onClick(): void {
    this.selected.emit(this.result()!);
  }
}
