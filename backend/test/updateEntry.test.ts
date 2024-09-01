import { server } from "../src/server"
import Prisma from "../src/db";

let createdEntryId: string;

beforeAll(async () => {
  await server.ready();

  // Create an entry to update
  const createdEntry = await Prisma.entry.create({
    data: {
      title: 'Initial Title',
      description: 'Initial Description',
      created_at: new Date(),
      scheduled_at: new Date(),
    },
  });

  createdEntryId = createdEntry.id;

  const response = await server.inject({
    method: 'POST',
    url: '/create/',
    payload: createdEntry,
  });
});

afterAll(async () => {
  // Cleanup the updated entry
  await Prisma.entry.delete({ where: { id: createdEntryId } });

  await Prisma.$disconnect();
  await server.close();
});

describe('PUT /update/:id', () => {
  it('should update the existing entry', async () => {
    const updatedEntryData = {
      title: 'Updated Title',
      description: 'Updated Description',
      created_at: new Date().toISOString(),
      scheduled_at: new Date().toISOString(),
    };

    const response = await server.inject({
      method: 'PUT',
      url: `/update/${createdEntryId}`,
      payload: updatedEntryData,
    });

    expect(response.statusCode).toBe(200);

    const updatedEntry = await Prisma.entry.findUnique({
      where: { id: createdEntryId },
    });

    expect(updatedEntry?.title).toBe(updatedEntryData.title);
    expect(updatedEntry?.description).toBe(updatedEntryData.description);
  });
});