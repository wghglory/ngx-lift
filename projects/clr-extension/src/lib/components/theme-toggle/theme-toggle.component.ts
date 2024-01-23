import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
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

  private translationService = inject(TranslationService);

  hovering = signal(false);
  theme = signal(localStorage['cds-theme'] || 'light');

  themeDisplayName = computed(() => {
    return this.translationService.translate(
      themeToggleTranslations,
      this.theme() === 'light' ? 'dark' : 'light',
      this.lang,
    );
  });

  ariaLabel = computed(() => {
    return this.translationService.translate(
      themeToggleTranslations,
      this.theme() === 'light' ? 'toggleDark' : 'toggleLight',
      this.lang,
    );
  });

  iconShape = computed(() => {
    return this.theme() === 'light' ? 'moon' : 'sun';
  });

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
