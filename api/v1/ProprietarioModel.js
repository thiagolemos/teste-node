module.exports = (Sequelize, DataTypes) => {
    const Proprietario = Sequelize.define(
        'proprietario', {
            id: {
                field: 'id_auto',
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            idPk: {
                field: 'id_pk',
                type: DataTypes.BIGINT,
            },
            idUser: {
                field: 'id_user',
                type: DataTypes.BIGINT,
            },
            data: {
                field: 'date_time',
                type: DataTypes.DATE,
            },
            codigo: {
                field: 'codigo',
                type: DataTypes.STRING,
            },
            nome: {
                field: 'nome',
                type: DataTypes.STRING,
            },
            dataNascimento: {
                field: 'data_nasc',
                type: DataTypes.DATE,
            },
            proprietarioPrincipal: {
                field: 'prop_master',
                type: DataTypes.BOOLEAN,
            },
            cpf: {
                field: 'cpf',
                type: DataTypes.STRING,
            },
            logradouro: {
                field: 'logradouro',
                type: DataTypes.STRING
            },
            numero: {
                field: 'numero',
                type: DataTypes.INTEGER,
            },
            cep: {
                field: 'cep',
                type: DataTypes.STRING,
            },
            municipio: {
                field: 'municipio',
                type: DataTypes.STRING,
            },
            telefone: {
                field: 'telefone',
                type: DataTypes.STRING,
            },
            idTipoPessoa: {
                field: 'id_fk_gi_tipo_pessoa',
                type: DataTypes.BIGINT,
            },
            idPais: {
                field: 'id_fk_gi_pais',
                type: DataTypes.BIGINT,
            },
            idUf: {
                field: 'id_fk_gi_uf',
                type: DataTypes.BIGINT,
            },
            idTipoProprietario: {
                field: 'id_fk_gi_tipo_proprietario',
                type: DataTypes.BIGINT,
            },
            status: {
                field: 'sync_status',
                type: DataTypes.INTEGER,
            }

        }, {
            tableName: 'proprietario',
            freezeTableName: true,
            timestamps: true,
            name: {
                singular: 'proprietario',
                plural: 'proprietario',
            },
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
        },
    );

    return Proprietario;
};