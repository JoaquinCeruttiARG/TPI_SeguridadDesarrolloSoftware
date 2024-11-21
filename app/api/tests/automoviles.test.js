const request = require("supertest");
const app = require("../index.js");

const automovilAlta = {
    Nombre: "Automovil " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Marca: 'RollRoice',
    FechaLanzamiento: new Date().toISOString(),
    Activo: true

};

const automovilModificacion = {
    Id : 1,
    Nombre: "Automovil " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    Marca: 'Chevrolet',
    FechaLanzamiento: new Date().toISOString(),
    Activo: true
};

// test route/equipos GET
describe("/api/automoviles", () => {
    it("Deberia devolver todos los automoviles", async () => {
      const res = await request(app).get("/api/automoviles?Nombre");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Id: expect.any(Number),
            Nombre: expect.any(String),
            Marca: expect.any(String),
            FechaLanzamiento: expect.any(String)
          }),
        ])
      );
    });
  });



describe("GET /api/automoviles/:id", () => {
    it("Deberia devolver el automovil con el id 1", async () => {
      const res = await request(app).get("/api/automoviles/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          Marca: expect.any(String),
          FechaLanzamiento: expect.any(String)
        })
      );
    });
  });


describe("POST /api/automoviles", () => {
    it("Deberia devolver el automovil que acabo de crear", async () => {
      const res = await request(app).post("/api/automoviles").send(automovilAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          Id: expect.any(Number),
          Nombre: expect.any(String),
          Marca: expect.any(String),
          FechaLanzamiento: expect.any(String)
        })
      );
    });
  });




describe("PUT /api/automoviles/:id", () => {
    it("Deberia devolver el automovil con el id 1 modificado", async () => {
      const res = await request(app).put("/api/automoviles/1").send(automovilModificacion);
      expect(res.statusCode).toEqual(200);

    });
  });




describe("DELETE /api/automoviles/:id", () => {
    it("Deberia devolver el automovil con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/automoviles/1");
      expect(res.statusCode).toEqual(200);
      
  
    });
  });