  
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: false })
    file: string;
}