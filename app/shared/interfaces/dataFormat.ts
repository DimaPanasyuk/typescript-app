export interface IDataFormat {
  Name: string;
  DataType: string;
  CalculateFrom: string[];
  IsRequired: boolean;
  Calculate(data: string[]): any;
}
