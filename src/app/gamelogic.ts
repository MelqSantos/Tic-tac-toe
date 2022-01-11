import {Status} from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn: number = 0;

    gameStatus: Status;

    // Possibilidades de vitória dos jogadores.
    winSituationsOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0 ], // 1° linha horizontal
        [0, 0, 0, 1, 1, 1, 0, 0, 0 ], // 2° linha horizontal
        [0, 0, 0, 0, 0, 0, 1, 1, 1 ], // 3° linha horizontal
        [1, 0, 0, 1, 0, 0, 1, 0, 0 ], // 1° coluna vertical
        [0, 1, 0, 0, 1, 0, 0, 1, 0 ], // 2° coluna vertical
        [0, 0, 1, 0, 0, 1, 0, 0, 1 ], // 3° coluna vertical
        [1, 0, 0, 0, 1, 0, 0, 0, 1 ], // Diagonal esquerda para direita
        [0, 0, 1, 0, 1, 0, 1, 0, 0 ]  // Diagonal direita para esquerda 
    ];

    winSituationsTwo: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0 ], // 1° linha horizontal
        [0, 0, 0, 2, 2, 2, 0, 0, 0 ], // 2° linha horizontal
        [0, 0, 0, 0, 0, 0, 2, 2, 2 ], // 3° linha horizontal
        [2, 0, 0, 2, 0, 0, 2, 0, 0 ], // 1° coluna vertical
        [0, 2, 0, 0, 2, 0, 0, 2, 0 ], // 2° coluna vertical
        [0, 0, 2, 0, 0, 2, 0, 0, 2 ], // 3° coluna vertical
        [2, 0, 0, 0, 2, 0, 0, 0, 2 ], // Diagonal esquerda para direita
        [0, 0, 2, 0, 2, 0, 2, 0, 0 ]  // Diagonal direita para esquerda 
    ];
    

    public constructor(){
        this.gameStatus = Status.STOP;
        this.gameField = [0,0,0,0,0,0,0,0,0];
    }

    // Inicia o game.
    gameStart(): void {
        this.gameField = [0,0,0,0,0,0,0,0,0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.START;
    }

    gameStop(): void{
        this.gameStatus = Status.STOP;
    }

    // Retorna um número aleatório entre 1 e 2.
    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    setField(position: number, value: number): void{
        this.gameField[position] = value;
        console.log(this.gameField);
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass; 
    }

    changePlayer(): void{
        this.currentTurn = (this.currentTurn ===2) ? 1 : 2;
    }

    // Compara os arrays dos dois jogadores.
    arrayEquals(a: Array<any>, b: Array<any>): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && 
        a.every((value, index) => value === b[index]);
    }

    // Verifica se o jogo terminou em empate.
    async checkGameEndWinner(): Promise<boolean>{
        let isWinner = false;

        const checkArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;
        const currentArray: any[] = [];

        this.gameField.forEach( (subfield, index) => {
            if(subfield !== this.currentTurn){
                currentArray[index] = 0;
            } else{
                currentArray[index] = subfield;
            }
        });

        checkArray.forEach( (checkField, checkIndex) => {
            if(this.arrayEquals(checkField, currentArray) ){
                isWinner = true;
            }
        });

        if(isWinner){
            this.gameStop();
            return true;
        } else{
            return false;
        }
    }

    // Verifica se o jogo terminou em empate.
    async checkGameEndFull(): Promise<boolean>{
        let isFull = true;

        if(this.gameField.includes(0) ){
            isFull = false;
        }

        if(isFull){
            this.gameStop();
            return true;
        } else{
            return false;
        }
    }
}
