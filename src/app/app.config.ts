import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [ provideHttpClient()]
  //Todo：幹，這個真的是會忘記… 要使用HttpClient的功能，記得要在這裡import providers哈哈哈哈
};
