const request = require("supertest");
const app = require("../index.js");
// Create a new Date object
const currentDate = new Date();

// Get the day, month, and year from the Date object
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
const year = currentDate.getFullYear();

// Format the date as dd/mm/yyyy
const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;



//usado para modificar una factura o creqr una nueva
const facturaNew = {
    Email:(( ) => (Math.random() + 1).toString(36).substring(2))() + "@gmail.com",
    FechaAlta: formattedDate,
    Activo: 1
};

// test GET route/facturas 
describe("GET /api/facturas", () => {
    it("Deberia devolver todas las FACTURAS", async () => {
      const res = await request(app).get("/api/facturas");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            IdFactura: expect.any(Number),
            Email: expect.any(String),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean),
          }),
        ])
      );
    });
  });


// test  GET route/facturas/:id
describe("GET /api/facturas/:id", () => {
    it("Deberia devolver la FACTURA con el id 1", async () => {
      const res = await request(app).get("/api/facturas/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            IdFactura: expect.any(Number),
            Email: expect.any(String),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean),
        })
      );
    });
  });

// test POST route/facturas 
describe("POST /api/facturas", () => {
    it("Deberia devolver el FACTURAS que acabo de crear", async () => {
      const res = await request(app).post("/api/facturas").send(facturaNew);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            IdFactura: expect.any(Number),
            Email: expect.any(String),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean),
        })
      );
    });
  });



// test PUT route/facturas/:id 
describe("PUT /api/facturas/:id", () => {
    it("Deberia devolver la FACTURA con el id 1 modificado", async () => {
      const res = await request(app).put("/api/facturas/1").send(facturaNew);
      expect(res.statusCode).toEqual(200);
    });
  });



// test DELETE route/facturas/:id 
describe("DELETE /api/facturas/:id", () => {
    it("Deberia devolver la FACTURA con el id 1 borrado logicamente", async () => {
      const res = await request(app).delete("/api/facturas/1");
      expect(res.statusCode).toEqual(200);
      
  
    });
  });