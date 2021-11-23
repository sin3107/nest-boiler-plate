import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}


    async getAllBoard(
        user: User
    ) : Promise <Board[]> {
        const qry = this.boardRepository.createQueryBuilder('board')

        qry.where('board.userId = :userId', {userId: user.id})
        const boards = await qry.getMany()

        return boards
    }
    // getAllBoards(): Board[] {
    //     return this.boards
    // }

    getBoardById(id: number): Promise <Board> {
        return this.boardRepository.getBoardById(id)
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id)

    //     if(!found) {
    //         throw new NotFoundException(`not ${id}`)
    //     }
    //     return found
    // }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto, user)
    }
    // createBoard(createBoardDto: CreateBoardDto) {

    //     const { title, description } = createBoardDto

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board)
    //     return board;
    // }

    deleteBoard(id: number, user: User): Promise <void> {
        return this.boardRepository.deleteBoard(id, user)
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board) => board.id !== found.id)
    // }


    updateBoardStatus(id: number, status: BoardStatus): Promise <Board>{
        return this.boardRepository.updateBoardStatus(id, status)
    }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id)
    //     board.status = status
    //     return board
    // }
}
