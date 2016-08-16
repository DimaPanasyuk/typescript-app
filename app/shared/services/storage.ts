import { LoggerService } from './logger';
import { IComponent } from '../interfaces/component';
import * as _ from 'lodash';

// TODO: move to inrefaces
interface IStorageData {
  components: IComponent[];
}

export class StorageService {
  public static $inject = ['logger'];
  public storageData: IStorageData = {
    components: []
  };
  constructor(private logger: LoggerService) {}
  public add(component: IComponent): void {
    this.storageData.components.push(component);
    this.pushToStorage();
  }
  public remove(index: number): void {
    this.storageData.components.splice(index, 1);
    this.pushToStorage();
  }
  public update(componentId?: string, data?: any): void {
    let component = _.find(this.storageData.components, {id: componentId});
    if (component) {
      if (!component.data) {
        component.data = [];
      }
      component.data.push(data);
    }
    this.pushToStorage();
  }
  public updateRow(componentId: string, rowIndex: number, data: any) {
    let component = _.find(this.storageData.components, {id: componentId});
    if (component) {
      component.data[rowIndex] = data;
    }
  }
  public removeRow(componentId: string, rowIndex) {
    let component = _.find(this.storageData.components, {id: componentId});
    component.data.splice(rowIndex, 1);
    this.pushToStorage();
  }
  public get(): IStorageData {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      return data;
    } else {
      return { components: [] };
    }
  }
  public pushToStorage() {
    localStorage.setItem('data', JSON.stringify(this.storageData));
  }
}
