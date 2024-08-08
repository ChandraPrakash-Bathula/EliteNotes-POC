export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const OPENAI_ENDPOINT = 'https://api.openai.com/v1';
// export const LEOPARD_API_KEY = process.env.REACT_APP_LEOPARD_API_KEY;
export const LEOPARD_API_KEY = 'xqgqww/tPOZEjBhNDyZ1K54hpV+Ux4KG00HPYXAQoTPSmc5EixmwPQ=='
export const ASSEMBLY_AI_KEY = process.env.REACT_APP_ASSEMBLY_AI_KEY;

export const API_OPTIONS = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${OPENAI_KEY}`,
  },
};
