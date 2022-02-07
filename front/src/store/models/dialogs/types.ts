export interface ErrorMessage {
  e: string;
}

export interface ServerError {
  visible: boolean;
  message: ErrorMessage;
}

export type State = { serverError: ServerError };
