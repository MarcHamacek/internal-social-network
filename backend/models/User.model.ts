import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { IUser } from '../types';

export interface UserCreationAttributes extends Optional<
  IUser,
  'id' | 'isAdmin'
> {}

export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public department!: string;
  public isAdmin!: boolean;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);

// Associations with Post and Comment
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Post.belongsTo(User);

User.hasMany(Comment, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Comment.belongsTo(User);

Post.hasMany(Comment, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Comment.belongsTo(Post);

User.sync();
Post.sync();
Comment.sync();
