import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat-seller',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>chat-seller works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSellerComponent { }
