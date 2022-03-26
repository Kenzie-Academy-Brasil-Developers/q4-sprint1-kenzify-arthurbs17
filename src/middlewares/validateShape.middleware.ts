import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

const validateShape = (schema: AnySchema) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      const validated = await schema.validate(resource, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.validate = validated;
      return next();
    } catch (e: any) {
      return res.status(400).json({ errors: e.errors.join(', ') });
    }
  };
};

export default validateShape;
