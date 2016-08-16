import { LoggerService } from '../shared/services/logger';

interface IComponentsDirective extends ng.IScope {
  removeComponent(index: number): void;
}

class ComponentsDirective {
  public static $inject = ['$scope', 'logger'];
  constructor($scope: IComponentsDirective, logger: LoggerService) {
    $scope.removeComponent = removeComponent;
    function removeComponent(index) {
      $scope.$emit('remove_component', index);
    }
  }
}

export function componentsDirective(): ng.IDirective {
  return {
    controller: ComponentsDirective,
    restrict: 'E',
    scope: {
      components: '='
    },
    templateUrl: 'build/components/components.directive.html',
  };
}
