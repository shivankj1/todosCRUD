const { z } = require("zod");

const createSchema = z.object({
  title: z
    .string()
    .min(1, "Title must not be empty")
    .max(20, "Title length must not be >20"),
  done: z.boolean().optional().default(false),
});

const patchSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title must not be empty")
      .max(20, "Title length must not be >20")
      .optional(),
    done: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (title or done) must be provided",
  });

const updateSchema = createSchema.partial();

module.exports = { createSchema, updateSchema, patchSchema };
