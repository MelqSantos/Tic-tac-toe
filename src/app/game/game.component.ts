import { Component, OnInit } from '@angular/core';

import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    // Inicializa o game com os campos em branco.
    this.game.gameStart();
    
    // Avisa de quem é a vez de jogar.
    const currentPlayer = 'Vez do : Jogador ' + this.game.currentTurn;
    const information: HTMLElement = document.querySelector('.current-status') as HTMLElement;
    information.innerHTML = currentPlayer;
  }

  // Cancelar o jogo (Precisa limpar os campos).
  stopGame(): void {
    this.game.gameStop();
    const information: HTMLElement = document.querySelector('.current-status') as HTMLElement;
    information.innerHTML = 'Convide alguém para jogar com você...';
  }

  // Pega a posição do campo clicado pelo jogador e adiciona a cor e imagem correspondente.
  async clickSubfield(subfield: any): Promise<void> {

    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      // Adiciona as imagens nos campos (Cruz e círculo)
      let img = document.createElement('img');
      let vazio = subfield.currentTarget.children.length;
      img.style.width = '100%';

      if(this.game.currentTurn === 1 && vazio == 0){
        img.setAttribute('src', '/assets/img/plus.png');  
        img.style.transform = "rotate(45deg)";
        img.style.filter = 'brightness(0.5)';
        subfield.currentTarget.appendChild(img);
      } else if(this.game.currentTurn === 2 && vazio == 0){
        img.setAttribute('src', '/assets/img/circle.png'); 
        subfield.currentTarget.appendChild(img);
      }
      

      // Função para determinar o ganhador do jogo.
      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if (this.game.gameStatus === 0 && end ){
          const information: HTMLElement = document.querySelector('.current-status') as HTMLElement;
          information.innerHTML = 'O vencedor é o jogador ' + this.game.currentTurn;
        }
      });
      

      // Função para determinar se deu empate no jogo.
      await this.game.checkGameEndFull().then( (end: boolean) => {
        if (this.game.gameStatus === 0 && end ){
          const information: HTMLElement = document.querySelector('.current-status') as HTMLElement;
          information.innerHTML = 'Sem vencedor, o resultado deu empate!';
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Vez do : Jogador ' + this.game.currentTurn;
        const information: HTMLElement = document.querySelector('.current-status') as HTMLElement;
        information.innerHTML = currentPlayer;
      }
    }
  }

}
