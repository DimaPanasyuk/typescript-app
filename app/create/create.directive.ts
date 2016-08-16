interface ICreateDirectiveScope extends ng.IScope {
  availableNames: string[];
  availableTypes: string[];
  dataSets: any[];
  // Replace with interface
  newDataSet: any;
  setSelectedName(name: string): void;
  setSelectedType(type: string): void;
  setRequired(required: boolean): void;
  addDataSet(dataSet: any): void;
  removeDataSet(index: number): void;
  createComponent(): void;
}

class CreateDirective {
  public static $inject = ['$scope'];
  constructor($scope: ICreateDirectiveScope) {
    $scope.dataSets = [];
    $scope.newDataSet = {
      name: 'Login',
      required: true,
      type: 'string',
    };
    $scope.availableNames = [
      'Login',
      'Password',
      'BithDate',
      'RegistrationDate',
      'Age',
    ];

    $scope.availableTypes = [
      'string',
      'int',
      'double',
      'date',
      'datetime',
      'time',
      'bool',
      'enum',
    ];

    $scope.setSelectedName = setSelectedName;
    $scope.setSelectedType = setSelectedType;
    $scope.setRequired = setRequired;
    $scope.addDataSet = addDataSet;
    $scope.removeDataSet = removeDataSet;
    $scope.createComponent = createComponent;

    function setSelectedName(name: string): void {
      $scope.newDataSet.name = name;
    }

    function setSelectedType(type: string): void {
      $scope.newDataSet.type = type;
    }

    function setRequired(required: boolean): void {
      $scope.newDataSet.required = required;
    }

    function addDataSet(dataSet: any): void {
      $scope.dataSets.push(angular.copy(dataSet));
    }

    function removeDataSet(index: number): void {
      $scope.dataSets.splice(index, 1);
    }

    function createComponent(): void {
      $scope.$emit('create_component', $scope.dataSets);
    }
  }
}



export function createDirective(): ng.IDirective {
  return {
    controller: CreateDirective,
    restrict: 'E',
    templateUrl: 'build/create/create.directive.html',
  };
}
