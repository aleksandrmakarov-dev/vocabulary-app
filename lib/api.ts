import { NextRequest, NextResponse } from "next/server";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  NotImplementedError,
  UnauthorizedError,
} from "./errors";

function errorHandler(error: unknown) {
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

export function NotFound(message: string) {
  return NextResponse.json({ message: message }, { status: 404 });
}

export function BadRequest(message: string) {
  return NextResponse.json({ message: message }, { status: 400 });
}

export function Unauthorized(message: string) {
  return NextResponse.json({ message: message }, { status: 401 });
}

export function Forbidden(message: string) {
  return NextResponse.json({ message: message }, { status: 403 });
}

export function NoContent() {
  // Next js api throws an error if we return 204 code
  return NextResponse.json(null, { status: 200 });
}

export function InternalServerError(message: string) {
  return NextResponse.json({ message: message }, { status: 500 });
}

export function NotImplemented(message: string) {
  return NextResponse.json({ message: message }, { status: 501 });
}

export function getSearchParams<T>(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  return Object.fromEntries(urlSearchParams.entries()) as T;
}

interface Meta {
  page: number;
  limit: number;
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
