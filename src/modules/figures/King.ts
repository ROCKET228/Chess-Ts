import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
// @ts-ignore
import blackLogo from "../../assets/black-king.png";
// @ts-ignore
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }


        if(this.cell.isEmptyVertical(target) && target.y === this.cell.y){
            return true
        }
        if(this.cell.isEmptyHorizontal(target)){
            return true
        }
        if(this.cell.isEmptyDiagonal(target)){
            return true
        }
        return false
    }
}