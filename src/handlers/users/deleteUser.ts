import type { Schema } from '@march1-org/db-template';
import { eq } from 'drizzle-orm';
import type Redis from 'ioredis';
import type { DbType } from 'lib/db';

type Options = {
  db: DbType;
  schema: Schema;
  params: { id: string };
  cache: Redis;
};

export async function deleteUser({
  db,
  schema: { users },
  params: { id },
  cache,
}: Options) {
  await db.delete(users).where(eq(users.id, Number(id)));

  const cacheKey = `user:${id}`;

  await cache.del(cacheKey);

  return 'Successfully deleted user.';
}
