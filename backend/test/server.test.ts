import supertest from "supertest";
import Prisma from "../src/db"; // Adjust the import path as needed
import { server } from "../src/server"; // Adjust the import path as needed

const request = supertest(server.server);

// Mock Prisma
jest.mock("../src/db", () => ({
  entry: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
}));

describe("Server endpoints", () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  describe("GET /get/", () => {
    it("should return all entries", async () => {
      const mockEntries = [
        {
          id: "1",
          title: "Test Entry",
          description: "Test description",
          created_at: new Date().toISOString(),
          scheduled_at: new Date().toISOString(),
        },
      ];
      (Prisma.entry.findMany as jest.Mock).mockResolvedValue(mockEntries);

      const response = await request.get("/get/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntries);
    });
  });

  describe("GET /get/:id", () => {
    it("should return a single entry", async () => {
      const mockEntry = {
        id: "1",
        title: "Test Entry",
        description: "Test description",
        created_at: new Date().toISOString(),
        scheduled_at: new Date().toISOString(),
      };
      (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(mockEntry);

      const response = await request.get("/get/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntry);
    });

    it("should return 500 if entry not found", async () => {
      (Prisma.entry.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request.get("/get/999");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ msg: "Error finding entry with id 999" });
    });
  });

  describe("POST /create/", () => {
    it("should create a new entry", async () => {
      const newEntry = { title: "New Entry", description: "Test description" };
      const createdEntry = {
        id: "1",
        title: "New Entry",
        description: "Test description",
        created_at: new Date().toISOString(),
        scheduled_at: new Date().toISOString(),
      };
      (Prisma.entry.create as jest.Mock).mockResolvedValue(createdEntry);

      const response = await request.post("/create/").send(newEntry);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdEntry);
    });

    it("should return 500 if creation fails", async () => {
      (Prisma.entry.create as jest.Mock).mockRejectedValue(new Error("Creation failed"));

      const response = await request.post("/create/").send({});
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ msg: "Error creating entry" });
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should delete an entry", async () => {
      (Prisma.entry.delete as jest.Mock).mockResolvedValue({});

      const response = await request.delete("/delete/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ msg: "Deleted successfully" });
    });

    it("should return 500 if deletion fails", async () => {
      (Prisma.entry.delete as jest.Mock).mockRejectedValue(new Error("Deletion failed"));

      const response = await request.delete("/delete/999");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ msg: "Error deleting entry" });
    });
  });

  describe("PUT /update/:id", () => {
    it("should update an entry", async () => {
      const updatedEntry = { id: "1", title: "Updated Entry", description: "Updated description" };
      (Prisma.entry.update as jest.Mock).mockResolvedValue(updatedEntry);

      const response = await request.put("/update/1").send(updatedEntry);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ msg: "Updated successfully" });
    });

    it("should return 500 if update fails", async () => {
      (Prisma.entry.update as jest.Mock).mockRejectedValue(new Error("Update failed"));

      const response = await request.put("/update/999").send({});
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ msg: "Error updating" });
    });
  });
});
