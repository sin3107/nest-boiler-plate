import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any){
        
        value = value.toUpperCase()

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value
    }

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status)
        // 해당 값이 없으면 false, 있으면 true 반환
        return index !== -1
    }
}