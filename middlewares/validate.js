const validate = (schema) => {
  return (req, res, next) => {
    try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((issue) => ({
          field: issue.field,
          message: issue.message,
        })),
      });
    }
    req.body = result.data;
    next();
  } catch(err) {
    console.log("Failed with ", err);
  }
  };
};

module.exports = validate;
