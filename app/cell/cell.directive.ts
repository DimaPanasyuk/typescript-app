
interface ICellDirectiveScope extends ng.IScope {

}

class CellDirective {
  public static $inject = ['$scope'];
  constructor($scope: ICellDirectiveScope) {}
}
export function cellDirective(): ng.IDirective {
  return {
    controller: CellDirective,
    restrict: 'A',
    scope: {
      cellKey: '=',
      cellValue: '=',
    },
    templateUrl: 'build/cell/cell.directive.html',
  };
}
