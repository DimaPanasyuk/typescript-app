interface ICreateFormScope extends ng.IScope {
  
}

class CreateFormDirective {
  public static $inject = [
    '$scope',
  ];
  constructor($scope: ICreateFormScope) {

  }
}


export function createFormDirective(): ng.IDirective {
  return {
    controller: CreateFormDirective,
    restrict: 'E',
    templateUrl: 'build/createForm/createForm.directive.html',
  };
}
