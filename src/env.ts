import { defineEnvVars } from '@sveltejs/kit/env';

const required = (name: string) => (value: string | undefined) => {
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

export const variables = defineEnvVars({
  DATO_CONNECTION_URL: {
    description: 'DatoCMS GraphQL endpoint',
    schema: required('DATO_CONNECTION_URL'),
  },
  DATO_API_KEY: {
    description: 'DatoCMS read-only API token',
    schema: required('DATO_API_KEY'),
  },
});
