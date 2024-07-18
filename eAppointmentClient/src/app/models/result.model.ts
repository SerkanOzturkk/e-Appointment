export class ResultModel<T>{
    data: any;
    errorMessages?: string[]
    isSuccesfull: boolean = true;
    statusCode: number = 200;
}