// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {

    // abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/DATABASE.db");

    let existe = false;
    let res = null;
  
    
    
    existe = false;
    sql =
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'facturas'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `create table facturas (
          IdFactura INTEGER PRIMARY KEY AUTOINCREMENT,
          FechaAlta DATE not null,
          Email VARCHAR(50),
          Activo BOOLEAN not null
        );`
      );
      console.log("tabla de FACTURAS creada!");
  

    
    await db.run(
        `insert into facturas (IdFactura, FechaAlta, Email, Activo) values 
        (1, '28/7/2022', 'givushkin0@booking.com', false),
        (2, '2/8/2022', 'dmoulton1@dot.gov', true),
        (3, '16/4/2023', null, true),
        (4, '31/5/2022', 'dbowler3@ustream.tv', true),
        (5, '29/4/2023', null, false),
        (6, '20/8/2022', null, false),
        (7, '22/6/2022', null, false),
        (8, '17/5/2023', 'bstubbs7@theatlantic.com', true),
        (9, '24/5/2023', 'eanlay8@webnode.com', false),
        (10, '18/1/2023', null, false),
        (11, '25/3/2023', null, false),
        (12, '3/1/2023', null, true),
        (13, '28/3/2023', null, true),
        (14, '1/9/2022', null, false),
        (15, '23/9/2022', null, true)`)
    }

    existe = false;
    sql =
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Automoviles'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE table Automoviles( 
                Id INTEGER PRIMARY KEY AUTOINCREMENT
              , Nombre TEXT NOT NULL UNIQUE
              , Marca text NOT NULL
              , FechaLanzamiento DATE NOT NULL
              , Activo BOOLEAN NOT NULL
              );`
      );
      console.log("tabla Automoviles creada!");
  

    
    await db.run(
        `insert into Automoviles (Nombre, Marca, FechaLanzamiento, Activo) values 
        ('GMC', 'Suburban 1500', '2022-07-25', 1),
        ('Dodge', 'Dakota', '2023-05-27', 1),
        ('Lexus', 'ES', '2022-06-09', 1),
        ('Isuzu', 'i-Series', '2022-07-25', 1),
        ('Nissan', 'Pathfinder', '2022-07-31', 1),
        ('Mercury', 'Mariner', '2023-04-05', 1),
        ('Toyota', 'Tundra', '2023-04-07', 1),
        ('Jaguar', 'XJ Series', '2023-04-01', 1),
        ('BMW', 'X6 M', '2022-07-15', 1),
        ('Ford', 'Econoline E150', '2023-01-06', 1)`)
    }
    existe = false;
    sql =
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE table equipos( 
                IdEquipo INTEGER PRIMARY KEY AUTOINCREMENT
              , Nombre TEXT NOT NULL UNIQUE
              , FechaFundacion DATE NOT NULL
              , Activo boolean NOT NULL
              );`
      );
      console.log("tabla equipos creada!");
  

    
    await db.run(
        `insert into equipos (IdEquipo, Nombre, FechaFundacion, Activo) values
        (1,'BOCA JUNIORS','1903-12-12',1),
        (2,'RIVER PLATE','1905-01-31',1),
        (3,'INDEPENDIENTE','1905-01-01',1),
        (4,'ESTUDIANTES','1915-01-30',1),
        (5,'VELEZ','1920-12-28',1),
        (6,'TALLERES', '1913-10-20',1),
        (7,'RACING','1983-12-27',1),
        (8,'SAN LORENZO','1999-01-18',1),
        (9,'NEWELLS','2000-02-03',1),
        (10,'ROSARIO CENTRAL','2001-12-25',1)`)






    }

    existe = false;
    sql =
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'provincias'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE table provincias(
                IdProvincia INTEGER PRIMARY KEY AUTOINCREMENT
              , Nombre TEXT NOT NULL UNIQUE
              , FechaFundacion DATE NOT NULL
              , Activo boolean NOT NULL
              );`
      );
      console.log("Tabla de provincias creadas.");
    
    await db.run(
        `insert into provincias (IdProvincia, Nombre, FechaFundacion, Activo) values
        (1,'La Pampa','1903-12-12',1),
        (2,'Buenos Aires','1905-01-31',1),
        (3,'La Boca','1905-01-01',0),
        (4,'Catamarca','1915-01-30',1),
        (5,'Rio Negro','1920-12-28',1),
        (6,'Chubut', '1913-10-20',1),
        (7,'Jujuy','1983-12-27',1),
        (8,'Neuquen','1999-01-18',1),
        (9,'Entre Rios','2000-02-03',1),
        (10,'Misiones','2001-12-25',1)`)
    }


    db.close();

}



CrearBaseSiNoExiste();
module.exports = CrearBaseSiNoExiste;