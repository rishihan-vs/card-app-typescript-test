import Prisma from "../src/db";
import { server } from "../src/server";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await Prisma.entry.deleteMany(); // Clean up any test data
  await Prisma.$disconnect();
  await server.close();
});

describe("POST /create/", () => {
  it("should create a new entry and return it", async () => {
    const newEntryData = {
      title: "Test Title",
      description: "Test Description",
      created_at: new Date().toISOString(),
      scheduled_at: new Date().toISOString(),
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntryData,
    });

    // Check that the response status is 200
    expect(response.statusCode).toBe(200);

    const createdEntry = JSON.parse(response.payload);

    // Check that the returned entry matches the input data
    expect(createdEntry.title).toBe(newEntryData.title);
    expect(createdEntry.description).toBe(newEntryData.description);
    expect(new Date(createdEntry.created_at).toISOString()).toBe(newEntryData.created_at);
    expect(new Date(createdEntry.scheduled_at).toISOString()).toBe(newEntryData.scheduled_at);

    // Verify the entry exists in the database
    const dbEntry = await Prisma.entry.findUnique({
      where: { id: createdEntry.id },
    });

    expect(dbEntry).not.toBeNull();
    expect(dbEntry?.title).toBe(newEntryData.title);
    expect(dbEntry?.description).toBe(newEntryData.description);
  });
});
