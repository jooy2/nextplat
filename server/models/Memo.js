const TABLE_NAME = 'memo';

module.exports = (sequelize, DataTypes) => {
  const Memo = sequelize.define(TABLE_NAME, {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    freezeTableName: true,
  });

  Memo.prototype.createMemo = (data) => Memo.create({
    content: data.content,
    ip: data.ip,
  });

  return Memo;
};
