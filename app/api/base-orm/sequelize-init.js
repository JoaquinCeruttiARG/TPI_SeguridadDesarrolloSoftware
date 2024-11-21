// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/DATABASE.db");




const facturas = sequelize.define(
    "facturas",{
        IdFactura:{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FechaAlta:{
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        Email:{
            type: DataTypes.STRING,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
    },
    {
        // pasar a mayusculas
        hooks: {
          beforeValidate: function (equipo, options) {
            if (typeof equipo.Nombre === "string") {
              equipo.Nombre = equipo.Nombre.toUpperCase().trim();
            }
          },
        },
    
        timestamps: false,
      }
);

//definicion del modelo de datos

const automoviles = sequelize.define(
    "Automoviles",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(55),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El nombre es requerido",
                },
                len: {
                    args: [3, 55],
                    msg: "Nombre debe ser tipo carateres, entre 5 y 20 de longitud",
                },
            },
            unique: {
                args: true,
                msg: "este nombre ya existe en la tabla!",
            },
        },
        Marca: {
            type: DataTypes.STRING(55),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La marca del auto es requerida!'
                }
            }
        },
        FechaLanzamiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "La fecha Lanazamiento es requerida!",
                }
            }
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    masg: 'EL valor booleano de activo es requerido!'
                }
            }
        }

},
    {
        // pasar a mayusculas
        hooks: {
          beforeValidate: function (automoviles, options) {
            if (typeof automoviles.Nombre === "string") {
              automoviles.Nombre = automoviles.Nombre.toUpperCase().trim();
            }
          },
        },
    
        timestamps: false,
      }
);
//definicion del modelo de datos

const users = sequelize.define(
    "users",{
        idUsuario:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        hashedPassword:{
            type: DataTypes.STRING,
            allowNull: false 
        }
    },{
        timestamps: false
    }
)

const sessions = sequelize.define("sessions",{
    idSesion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'idUsuario'
        }
    },jwtToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },anulated:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }}, {
        timestamps: false
    }
)

sessions.belongsTo(users, {
    foreignKey: 'idUsuario',
    as: 'user'
})

const equipos = sequelize.define(
    "equipos",
    {
        IdEquipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [5, 20],
                    msg: "Nombre debe ser tipo carateres, entre 5 y 20 de longitud",
                },
            },
            unique: {
                args: true,
                msg: "este Nombre ya existe en la tabla!",
            },
        },
        FechaFundacion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha Alta es requerido",
                }
            }


        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate:{
                notNull:{
                    args: true,
                    msg: "Activo es requerido",
                }
            }
        },

    },
    {
        // pasar a mayusculas
        hooks: {
          beforeValidate: function (equipo, options) {
            if (typeof equipo.Nombre === "string") {
              equipo.Nombre = equipo.Nombre.toUpperCase().trim();
            }
          },
        },
    
        timestamps: false,
      }
);

const provincias = sequelize.define(
    "provincias",
    {
        IdProvincia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre de la provincia es requerida.",
                },
                len: {
                    args: [4, 60],
                    msg: "El nombre debe ser de tipo string, entre 4 y 60.",
                },
            },
            unique: {
                args: true,
                msg: "Este nombre ya existe en la tabla.",
            },
        },
        FechaFundacion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha de fundación es requerida.",
                }
            }


        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate:{
                notNull:{
                    args: true,
                    msg: "Activo es requerido.",
                }
            }
        },

    },
    {
        // pasar a mayusculas
        hooks: {
          beforeValidate: function (provincia, options) {
            if (typeof provincia.Nombre === "string") {
              provincia.Nombre = provincia.Nombre.toUpperCase().trim();
            }
          },
        },
        timestamps: false,
      }
);


 module.exports = {
    sequelize,
    equipos,
    facturas,
    automoviles,
    provincias,
    users,
    sessions
 };

