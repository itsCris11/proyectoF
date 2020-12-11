import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Pages/shared/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { PrestamoComponent } from './Pages/prestamo/prestamo.component';
import { LibroComponent } from './Pages/libro/libro.component';
import { Error404Component } from './Pages/shared/error404/error404.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AcercadeComponent } from './Pages/acercade/acercade.component';
import { PasswordPipe } from './Pipes/password.pipe';
import { LoginComponent } from './Pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuarioComponent,
    PrestamoComponent,
    LibroComponent,
    LoginComponent,
    Error404Component,
    AcercadeComponent,
    PasswordPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
