import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Column
  } from "typeorm";

  import Chat from "./Chat";
  import User from "./User";
  
  @Entity()
  class Message extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
  
    @Column({type: "text"})
    text: string

    @OneToMany(type => Chat, chat => chat.messages)
    chat: Chat
  
    @OneToMany(type => User, user => user.messages)
    user: User

    @CreateDateColumn() createdAt: string;
  
    @UpdateDateColumn() updatedAt: string;
  }
  export default Message;