
interface IRowDirective extends ng.IScope {
  index: number;
  editRow(index: number): void;
  removeRow(): void;
}

class RowDirective {
  public static $inject = ['$scope'];
  constructor($scope: IRowDirective) {

    $scope.editRow = editRow;
    $scope.removeRow = removeRow;
    function editRow(index) {
      $scope.$emit('edit_row', index);
    }
    function removeRow() {
      $scope.$emit('remove_row', $scope.index);
    }
  };
}

export function rowDirective(): ng.IDirective {
  return {
    controller: RowDirective,
    restrict: 'A',
    scope: {
      index: '=index',
      rowData: '=',
    },
    templateUrl: 'build/row/row.directive.html',
  };
}
