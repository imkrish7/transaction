export const encodeCursor = (id: string | null) =>
  id ? Buffer.from(id).toString("base64") : null;
export const decodeCursor = (cursor: string) =>
  Buffer.from(cursor, "base64").toString("utf8");
