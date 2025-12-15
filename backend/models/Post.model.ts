import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config';
import { IPost } from '../types';

export interface PostCreationAttributes extends Optional<IPost, 'id'> {}

export class Post
  extends Model<IPost, PostCreationAttributes>
  implements IPost
{
  public id!: number;
  public userId!: number;
  public content!: string;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: true,
    indexes: [{ fields: ['userId'] }],
  },
);
