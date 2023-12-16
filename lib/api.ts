import { NextRequest, NextResponse } from "next/server";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  NotImplementedError,
  UnauthorizedError,
} from "./errors";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

function errorHandler(error: unknown) {
  console.log(error);

  if (error instanceof NotFoundError) {
    return NotFound(error.message);
  }

  if (error instanceof BadRequestError) {
    return BadRequest(error.message);
  }

  if (error instanceof UnauthorizedError) {
    return Unauthorized(error.message);
  }

  if (error instanceof NotImplementedError) {
    return NotImplemented(error.message);
  }

  if (error instanceof ForbiddenError) {
    return Forbidden(error.message);
  }

  if (error instanceof ZodError) {
    return ValidationErrorResponse(
      error.errors.map((e) => e.message).join(". ")
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return InternalServerError(error.message);
  }

  if (error instanceof Error) {
    return InternalServerError(error.message);
  }

  return InternalServerError("Internal Server Error");
}

export function logger(req: NextRequest) {
  console.log(`${req.method} - ${req.url}`);
}

export function withErrorHandler(handler: any) {
  return async function (req: NextRequest, ctx: any) {
    try {
      logger(req);
      return await handler(req, ctx);
    } catch (error) {
      return errorHandler(error);
    }
  };
}

export function Ok(data: any) {
  return NextResponse.json(data, { status: 200 });
}

export function Created(data: any) {
  return NextResponse.json(data, { status: 201 });
}

function ErrorResponseBase(title: string, message: string, status: number) {
  return NextResponse.json(
    { title: title, message: message },
    { status: status }
  );
}

export function NotFound(message: string) {
  return ErrorResponseBase("Not Found", message, 404);
}

export function BadRequest(message: string) {
  return ErrorResponseBase("Bad Request", message, 400);
}

export function Unauthorized(message: string) {
  return ErrorResponseBase("Unauthorized", message, 401);
}

export function Forbidden(message: string) {
  return ErrorResponseBase("Forbidden", message, 403);
}

export function NoContent() {
  return NextResponse.json({}, { status: 200 });
}

export function InternalServerError(message: string) {
  return ErrorResponseBase("Internal Server Error", message, 500);
}

export function ValidationErrorResponse(message: string) {
  return ErrorResponseBase("Validation Error", message, 422);
}

export function NotImplemented(message: string) {
  return ErrorResponseBase("Not Implemented", message, 501);
}

export function getSearchParams<T>(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  return Object.fromEntries(urlSearchParams.entries()) as T;
}

interface Meta {
  page: number;
  limit?: number;
  itemsCount: number;
  pagesCount: number;
}

export interface PagedResponse<T> {
  data: T[];
  meta: Meta;
}

export interface GenericErrorResponse {
  message: string;
}
