import {ChangeDetectionStrategy, Component, computed, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {ClarityIcons, moonIcon, sunIcon} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';

import {TranslationService} from '../../services/translation.service';
import {themeToggleTranslations} from './theme-toggle.l10n';

ClarityIcons.addIcons(moonIcon);
ClarityIcons.addIcons(sunIcon);

@Component({
  selector: 'clx-theme-toggle',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent implements OnInit {
  @Input() lang = '';
  @Output() changeTheme = new EventEmitter<string>();

  hovering = signal(false);
  theme = signal(localStorage['cds-theme'] || 'light');

  themeDisplayName = computed(() => {
    return this.translationService.translate(
      this.theme() === 'light' ? 'theme-toggle.dark' : 'theme-toggle.light',
      this.lang,
    );
  });

  ariaLabel = computed(() => {
    return this.translationService.translate(
      this.theme() === 'light' ? 'theme-toggle.toggleDark' : 'theme-toggle.toggleLight',
      this.lang,
    );
  });

  iconShape = computed(() => {
    return this.theme() === 'light' ? 'moon' : 'sun';
  });

  constructor(private translationService: TranslationService) {
    translationService.loadTranslationsForComponent('theme-toggle', themeToggleTranslations);
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setHovering(value: boolean) {
    this.hovering.set(value);
  }

  private setTheme(newTheme: string) {
    this.theme.set(newTheme);
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
