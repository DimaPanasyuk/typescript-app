import { StorageService } from '../shared/services/storage';
interface IComponentDirectiveScope extends ng.IScope {
  addFormVisible: boolean;
  component: any;
  toggleForm(): void;
  toggleEditForm(index: number): void;
}

class ComponentDirective {
  public static $inject = ['$scope', 'storage'];
  constructor($scope: IComponentDirectiveScope,
              storage: StorageService) {
    $scope.addFormVisible = false;
    $scope.toggleForm = toggleForm;
    $scope.toggleEditForm = toggleEditForm;

    $scope.$on('add_data', handleNewData);
    $scope.$on('update_row', handleRowUpdate);
    $scope.$on('remove_row', handleRowRemoval);

    function toggleForm(): void {
      $scope.addFormVisible = !$scope.addFormVisible;
    }
    function toggleEditForm(rowIndex: number) {
      console.log(rowIndex);
    }
    function handleNewData(event: ng.IAngularEvent, data: any[]): void {
      let result = {};
      data.forEach(item => {
        result[item.name] = item.value;
      });
      storage.update($scope.component.id, result);
      $scope.addFormVisible = false;
    }
    function handleRowRemoval(event: ng.IAngularEvent, index: number) {
      storage.removeRow($scope.component.id, index);
    }
    function handleRowUpdate(event: ng.IAngularEvent, index: number, data: any) {
      storage.updateRow($scope.component.id, index, data);
    }
  }
}

export function componentDirective(): ng.IDirective {
  return {
    controller: ComponentDirective,
    restrict: 'E',
    scope: {
      component: '=',
    },
    templateUrl: 'build/component/component.directive.html',
  };
}
