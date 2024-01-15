import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {PageContainerComponent} from 'clr-extension';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
