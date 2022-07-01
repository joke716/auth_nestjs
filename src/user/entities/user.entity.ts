import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { LocalFile } from "../../local-files/entities/local-file.entity";
import { Role } from "../role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @JoinColumn({ name: 'profileImgId' })
  @OneToOne(
    () => LocalFile,
    {
      nullable: true
    }
  )
  public profilImg?: LocalFile;

  @Column({ nullable: true })
  public profileImgId?: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public roles: Role;

}
