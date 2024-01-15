import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  @Input() lang = 'typescript';
  @Input({required: true}) code = '';
}
