import { LoggerService } from '../shared/services/logger';
import { StorageService } from '../shared/services/storage';
import { IComponent } from '../shared/interfaces/component';


interface IMainScope extends ng.IScope {
  components: IComponent[];
  createFormVisible: boolean;
  toggleCreateForm(): void;
}

export class MainController {
  public static $inject = [
    '$scope',
    '$rootScope',
    'logger',
    'storage',
  ];
  constructor($scope: IMainScope,
              $rootScope: ng.IRootScopeService,
              logger: LoggerService,
              storage: StorageService) {

    $scope.createFormVisible = false;

    let createEvent = $scope.$on('create_component', createComponent);
    let removeEvent = $scope.$on('remove_component', removeComponent);

    getStorageData();

    $scope.toggleCreateForm = toggleCreateForm;

    function toggleCreateForm() {
      $scope.createFormVisible = !$scope.createFormVisible;
    }

    function createComponent(event, dataSets) {
      $scope.createFormVisible = false;
      let id = generateComponentId();
      let component = angular.extend({}, {dataSets: dataSets}, {id: id});
      storage.add(component);
    }

    function removeComponent(event, index) {
      storage.remove(index);
    }

    function getStorageData() {
      storage.storageData = storage.get();
      $scope.components = storage.storageData.components;
    }

    $scope.$on('$destroy', () => {
      logger.log({level: 'info', message: 'Removing listeners from MainController'});
      createEvent();
      removeEvent();
    });

    function generateComponentId() {
      return ((Math.random() * 9999) - 0).toString(34).slice(4);
    }
  }
};
