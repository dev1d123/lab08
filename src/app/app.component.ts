import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TecladoComponent } from './components/teclado/teclado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TecladoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-hangman';
}
