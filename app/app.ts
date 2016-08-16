// / <reference path="../typings/index.d.ts" />
import 'angular';
import { LoggerService } from './shared/services/logger';
import { StorageService } from './shared/services/storage';

import { MainController } from './main/main';

import { createDirective } from './create/create.directive';
import { componentsDirective } from './components/components.directive';
import { componentDirective } from './component/component.directive';
import { rowDirective } from './row/row.directive';
import { cellDirective } from './cell/cell.directive';
import { addDataDirective } from './addData/addData.directive';

angular.module('app', [])
       .controller('Main', MainController)
       .service('logger', LoggerService)
       .service('storage', StorageService)
       .directive('createForm', createDirective)
       .directive('components', componentsDirective)
       .directive('component', componentDirective)
       .directive('row', rowDirective)
       .directive('cell', cellDirective)
       .directive('addData', addDataDirective);
