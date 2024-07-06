import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  words: string[] = ['ANGULAR', 'COMPONENTE', 'SERVICIO', 'DIRECTIVA', 'MODULO'];
  hiddenWord: string[] = [];
  incorrectLetters: string[] = [];
  remainingAttempts: number = 6;
  wins: number = 0;
  losses: number = 0;
  hangmanImage: string = '';
  showModal: boolean = false;
  modalMessage: string = '';

  private selectedWord: string = '';

  ngOnInit(): void {
    this.resetGame();
  }

  guessLetter(letter: string): void {
    if (this.selectedWord.includes(letter)) {
      for (let i = 0; i < this.selectedWord.length; i++) {
        if (this.selectedWord[i] === letter) {
          this.hiddenWord[i] = letter;
        }
      }
    } else {
      this.incorrectLetters.push(letter);
      this.remainingAttempts--;
    }
    
    this.updateHangmanImage();
    this.checkGameStatus();
  }

  isLetterGuessed(letter: string): boolean {
    return this.hiddenWord.includes(letter) || this.incorrectLetters.includes(letter);
  }

  resetGame(): void {
    this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.hiddenWord = Array(this.selectedWord.length).fill('_');
    this.incorrectLetters = [];
    this.remainingAttempts = 6;
    this.updateHangmanImage();
  }

  updateHangmanImage(): void {
    this.hangmanImage = `assets/img${6 - this.remainingAttempts}.png`;
  }

  checkGameStatus(): void {
    if (this.hiddenWord.join('') === this.selectedWord) {
      this.wins++;
      this.showModalMessage('¡Ganaste!');
    } else if (this.remainingAttempts === 0) {
      this.losses++;
      this.showModalMessage('Perdiste. La palabra era ' + this.selectedWord);
    }
  }

  showModalMessage(message: string): void {
    this.modalMessage = message;
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
    }, 3000);
  }
}
