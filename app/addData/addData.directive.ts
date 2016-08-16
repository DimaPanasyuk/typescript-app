interface IAddDataDirectiveScope extends ng.IScope {
  data: any;
  newData: any;
  saveChanges(data: any[]): void;
}

class AddDataDirective {
  public static $inject = ['$scope'];
  constructor($scope: IAddDataDirectiveScope) {
    $scope.newData = angular.copy($scope.data);
    $scope.saveChanges = saveChanges;
    function saveChanges(data) {
      $scope.$emit('add_data', data);
    }
  }
}

export function addDataDirective(): ng.IDirective {
  return {
    controller: AddDataDirective,
    restrict: 'E',
    scope: {
      data: '=',
    },
    templateUrl: 'build/addData/addData.directive.html',
  };
}
