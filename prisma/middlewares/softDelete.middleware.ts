import { Prisma } from '@prisma/client';

export function softDeleteMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const softDeletableModels = ['Product', 'ProductCategory', 'ProductVariant', 'WarrantyPolicy', 'AmcPlan'];

    if (
      softDeletableModels.includes(params.model ?? '') &&
      ['findMany', 'findFirst', 'findUnique'].includes(params.action)
    ) {
      params.args ??= {};
      params.args.where ??= {};

      // Don't override if user explicitly set is_deleted
      if (params.args.where.is_deleted === undefined) {
        params.args.where.is_deleted = false;
      }
    }

    return next(params);
  };
}
