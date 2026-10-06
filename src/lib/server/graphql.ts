import { GraphQLClient } from 'graphql-request';
import { DATO_API_KEY, DATO_CONNECTION_URL } from '$app/env/private';

let client: GraphQLClient | null = null;

function getClient(): GraphQLClient {
  client ??= new GraphQLClient(DATO_CONNECTION_URL, {
    headers: { authorization: `Bearer ${DATO_API_KEY}` },
  });
  return client;
}

export function dato<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  return getClient().request<T>(query, variables);
}
