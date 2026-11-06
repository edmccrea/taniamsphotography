import { ClientError, GraphQLClient } from 'graphql-request';
import { DATO_API_KEY, DATO_CONNECTION_URL } from '$app/env/private';

const MAX_CONCURRENT = 4;
const MAX_ATTEMPTS = 4;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

let client: GraphQLClient | null = null;
let active = 0;
const queue: (() => void)[] = [];

function getClient(): GraphQLClient {
  client ??= new GraphQLClient(DATO_CONNECTION_URL, {
    headers: { authorization: `Bearer ${DATO_API_KEY}` },
  });
  return client;
}

async function withSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (active >= MAX_CONCURRENT) await new Promise<void>(resolve => queue.push(resolve));
  active++;
  try {
    return await fn();
  } finally {
    active--;
    queue.shift()?.();
  }
}

function isRetryable(err: unknown): boolean {
  if (err instanceof ClientError) return RETRYABLE_STATUS.has(err.response.status);
  return err instanceof TypeError; // network failure from fetch
}

export async function dato<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await withSlot(() => getClient().request<T>(query, variables));
    } catch (err) {
      if (attempt >= MAX_ATTEMPTS || !isRetryable(err)) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
    }
  }
}
