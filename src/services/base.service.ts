import { Result } from '@/types/common';

export abstract class BaseService {
  protected handleError<T>(error: unknown, fallbackMessage: string): Result<T> {
    console.error(`[Service Error]:`, error);

    if (error && typeof error === 'object' && 'message' in error) {
      const errObj = error as { message: string; code?: string };
      return {
        success: false,
        data: null,
        error: {
          message: errObj.message || fallbackMessage,
          code: errObj.code,
          details: error,
        },
      };
    }

    return {
      success: false,
      data: null,
      error: {
        message: fallbackMessage,
        details: error,
      },
    };
  }

  protected handleSuccess<T>(data: T): Result<T> {
    return {
      success: true,
      data,
      error: null,
    };
  }
}
