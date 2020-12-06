import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { animationState: 'One' }},
  {path: 'movies', component: MovieListComponent, data: { animationState: 'Two' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
