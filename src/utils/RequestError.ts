export enum RequestErrorTypes {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export class RequestError extends Error {
  errCode: RequestErrorTypes;
  errMsg: string;
  constructor(errMsg = '请求失败', errCode = RequestErrorTypes.BAD_REQUEST) {
    super(errMsg);
    this.errCode = errCode;
    this.errMsg = errMsg;
  }
}