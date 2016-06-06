// angular
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {OpaqueToken} from '@angular/core';

// app
import {LogService} from './services/log.service';
import {HttpService} from './services/http.service';
import {DatabaseService} from './services/database.service';

export const CORE_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  LogService,
  HttpService,
  DatabaseService
];

export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');

// decorators
export * from './decorators/base.component';
export * from './decorators/form.component';
export * from './decorators/route.component';

// interfaces
export * from './interfaces/iconsole';
export * from './interfaces/iwindow';
export * from './interfaces/ilang';

// services
export * from './services/core-config.service';
export * from './services/console.service';
export * from './services/log.service';
export * from './services/http.service';
export * from './services/database.service';
export * from './services/view-broker.service';
export * from './services/window.service';

// directives
export * from './directives/platform.directive';
