import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageContainerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-no-info-pipe',
  standalone: true,
  imports: [CodeBlockComponent, PageContainerComponent],
  templateUrl: './no-info-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoInfoPipeComponent {
  exampleCode = highlight(`
import {NoInfoPipe} from 'clr-extension';

@Component({
  standalone: true,
  imports: [NoInfoPipe],
  template: \`
    {{ "" |  noInfo }}
    <!-- Output: the localized value of "display.no.info.string", the example value could be "-", "No Data" or else, depending on your requirements. -->

    {{ "some text" |  noInfo }}
    <!-- Output: "some text" -->

    {{ "" |  noInfo : "not.running" }}
    <!-- Output: the localized value of "not.running", it could be "Not Running". Please note that the actual value must be supplied by you. -->
  \`
})
export class NoInfoPipeDemoComponent { }
  `);
}
