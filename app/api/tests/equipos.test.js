const request = require("supertest");
const app = require("../index.js");

const equipoAlta = {
    Nombre: "Equipo " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaFundacion: new Date().toISOString(),
    Activo: true,

};

const equipoModificacion = {
    IdEquipo : 1,
    Nombre: "Equipo " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaFundacion: new Date().toISOString(),
    Activo: true,
};

// test route/equipos GET
describe("GET /api/equipos", () => {
    it("Deberia devolver todos los equipos", async () => {
      const res = await request(app).get("/api/equipos?Nombre");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdEquipo: expect.any(Number),
            Nombre: expect.any(String),
            FechaFundacion: expect.any(String),
            Activo: expect.any(Boolean),
          }),
        ])
      );
    });
  });



describe("GET /api/equipos/:id", () => {
    it("Deberia devolver el equipo con el id 1", async () => {
      const res = await request(app).get("/api/equipos/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdEquipo: expect.any(Number),
          Nombre: expect.any(String),
          FechaFundacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });


describe("POST /api/equipos", () => {
    it("Deberia devolver el equipo que acabo de crear", async () => {
      const res = await request(app).post("/api/equipos").send(equipoAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdEquipo: expect.any(Number),
          Nombre: expect.any(String),
          FechaFundacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });




describe("PUT /api/equipos/:id", () => {
    it("Deberia devolver el equipo con el id 1 modificado", async () => {
      const res = await request(app).put("/api/equipos/1").send(equipoModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });




describe("DELETE /api/equipos/:id", () => {
    it("Deberia devolver el equipo con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/equipos/1");
      expect(res.statusCode).toEqual(200);
      
  
    });
  });