import { IDataFormat } from './dataFormat';
import { IData } from './data';

export interface IComponent {
  dataFormats: IDataFormat[];
  data: IData[];
};
