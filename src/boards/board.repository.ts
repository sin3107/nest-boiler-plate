import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async getBoardById(id: number): Promise <Board> {
        const found = await this.findOne(id)

        if(!found) {
            throw new NotFoundException(`${id}번 게시물은 존재하지 않습니다.`)
        }
        return found
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        const { title, description } = createBoardDto

        const board = this.create({
            title,
            description, 
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board)
        return board
    }

    async deleteBoard(id: number, user: User): Promise <void> {
        const result = await this.delete({id, user})

        if(result.affected === 0) {
            throw new NotFoundException(`${id}번 게시물은 존재하지 않습니다.`)
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise <Board>{
        const board = await this.getBoardById(id)

        board.status = status;
        await this.save(board)

        return board
    }
} 