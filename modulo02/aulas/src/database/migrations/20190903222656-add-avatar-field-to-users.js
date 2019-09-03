'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Cria uma coluna
    return queryInterface.addColumn(
      'users',
      'avatar_id',
      //Todo avatar_id na tabela users será um id contido na tabela files
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
