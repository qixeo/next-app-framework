import { z } from 'zod';

const schema = z.object({
  password: z.string().min(6),
});

export default schema;
