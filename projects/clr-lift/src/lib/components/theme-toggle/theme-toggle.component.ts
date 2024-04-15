import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClarityIcons, moonIcon, sunIcon} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';

import {TranslationService} from '../../services/translation.service';
import {themeToggleTranslations} from './theme-toggle.l10n';

ClarityIcons.addIcons(moonIcon);
ClarityIcons.addIcons(sunIcon);

@Component({
  selector: 'cll-theme-toggle',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent implements OnInit {
  @Input() lang = '';
  @Output() changeTheme = new EventEmitter<string>();

  hovering = false;
  theme: 'dark' | 'light' = localStorage['cds-theme'] || 'light';

  get themeDisplayName() {
    return this.translationService.translate(
      this.theme === 'light' ? 'theme-toggle.dark' : 'theme-toggle.light',
      this.lang,
    );
  }

  get ariaLabel() {
    return this.translationService.translate(
      this.theme === 'light' ? 'theme-toggle.toggleDark' : 'theme-toggle.toggleLight',
      this.lang,
    );
  }

  get iconShape() {
    return this.theme === 'light' ? 'moon' : 'sun';
  }

  constructor(private translationService: TranslationService) {
    translationService.loadTranslationsForComponent('theme-toggle', themeToggleTranslations);
  }

  toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setHovering(value: boolean) {
    this.hovering = value;
  }

  private setTheme(newTheme: 'dark' | 'light') {
    this.theme = newTheme;
    localStorage['cds-theme'] = newTheme;
    document.body.setAttribute('cds-theme', newTheme);
    this.changeTheme.emit(newTheme);
  }

  ngOnInit() {
    const themeInUsing = localStorage['cds-theme'];
    if (themeInUsing) {
      this.setTheme(themeInUsing);
    }
  }
}
