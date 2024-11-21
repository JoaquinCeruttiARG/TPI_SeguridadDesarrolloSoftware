const request = require("supertest");
const app = require("../index.js");

const provinciaAlta = {
    Nombre: "Provincia " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaFundacion: new Date().toISOString(),
    Activo: true,

};

const provinciaModificacion = {
    IdProvincia : 1,
    Nombre: "Provincia " +  (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
    FechaFundacion: new Date().toISOString(),
    Activo: true,
};

// test route/provincias GET
describe("GET /api/provincias", () => {
    it("Deberia devolver todas las provincias", async () => {
      const res = await request(app).get("/api/provincias?Nombre");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdProvincia: expect.any(Number),
            Nombre: expect.any(String),
            FechaFundacion: expect.any(String),
            Activo: expect.any(Boolean),
          }),
        ])
      );
    });
  });



describe("GET /api/provincias/:id", () => {
    it("Deberia devolver la provincia con el id 1", async () => {
      const res = await request(app).get("/api/provincias/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdProvincia: expect.any(Number),
          Nombre: expect.any(String),
          FechaFundacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });

describe("POST /api/provincias", () => {
    it("Debería devolver la provincia que acabo de crear", async () => {
      const res = await request(app).post("/api/provincias").send(provinciaAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          IdProvincia: expect.any(Number),
          Nombre: expect.any(String),
          FechaFundacion: expect.any(String),
          Activo: expect.any(Boolean),
        })
      );
    });
  });




describe("PUT /api/provincias/:id", () => {
    it("Deberia devolver la provincia con el id 1 modificado", async () => {
      const res = await request(app).put("/api/provincias/1").send(provinciaModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });




describe("DELETE /api/provincias/:id", () => {
    it("Deberia devolver la provincia con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/provincias/1");
      expect(res.statusCode).toEqual(200);
      
  
    });
  });