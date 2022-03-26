import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

const validateShape =
  (shape: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validated = await shape.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validate = validated;
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };

export default validateShape;
