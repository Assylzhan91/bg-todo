import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `<p class="text-center text-gray">{{ loading ? 'Loading...' : 'Empty' }}</p>`,

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input({required: true}) loading?: boolean;
}
