import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { IComment } from '../types';

export interface CommentCreationAttributes extends Optional<IComment, 'id'> {}

export class Comment
  extends Model<IComment, CommentCreationAttributes>
  implements IComment
{
  public id!: number;
  public userId!: number;
  public postId!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    indexes: [{ fields: ['userId'] }, { fields: ['postId'] }],
  },
);
