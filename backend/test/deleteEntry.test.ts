import Prisma from "../src/db";
import { server } from "../src/server";

let createdEntryId: string;

beforeAll(async () => {
  await server.ready();

  // Create an entry to delete
  const createdEntry = await Prisma.entry.create({
    data: {
      title: "Entry to Delete",
      description: "This entry will be deleted",
      created_at: new Date(),
      scheduled_at: new Date(),
    },
  });

  createdEntryId = createdEntry.id;

  const response = await server.inject({
    method: "POST",
    url: "/create/",
    payload: createdEntry,
  });
});

afterAll(async () => {
  await Prisma.$disconnect();
  await server.close();
});

describe("DELETE /delete/:id", () => {
  it("should delete the existing entry", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${createdEntryId}`,
    });

    expect(response.statusCode).toBe(200);

    const deletedEntry = await Prisma.entry.findUnique({
      where: { id: createdEntryId },
    });

    expect(deletedEntry).toBeNull(); // The entry should be deleted, so it should be null
  });
});
