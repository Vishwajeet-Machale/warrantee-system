// src/common/response.ts
export class ApiResponse {
  static success(message: string, data: any = null, token?: string) {
    const response: any = {
      success: true,
      message,
      data,
    };

    if (token) {
      response.token = token;
    }

    return response;
  }

  static error(message: string, code: string = 'INTERNAL_ERROR', details: any = null) {
    return {
      success: false,
      message,
      error: {
        code,
        details,
      },
    };
  }
}
