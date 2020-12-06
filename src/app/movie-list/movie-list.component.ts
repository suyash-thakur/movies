import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  isError: boolean = false;
  isLoading: boolean = true;
  nextUrl: string = 'https://demo.credy.in/api/v1/maya/movies/';
  user: any = [];
  selectedIndex: number = 0;
  constructor(private http: HttpClient, private router: Router, private authService: AuthenticateService) { }

  ngOnInit(): void {
    this.getMovies('https://demo.credy.in/api/v1/maya/movies/');
  }
onLogout(): void {
  this.authService.logout();
}
getMovies(url): void {
  this.http.get(url).subscribe((data:any) => {
      console.log(data);
      for (let i = 0; i < data.results.length; ++i) {
        this.user.push(data.results[i]);
      }
      this.nextUrl = data.next;
      console.log(this.user);
      this.isError = false;
      this.isLoading = false;
    },
    error => {
      this.isError = true;
      this.isLoading = false;
    }
    );
}
onRetry(): void {
  this.isLoading = true;
  this.isError = false;
  this.getMovies(this.nextUrl);
}
onMoviesSelect(index): void {
  this.selectedIndex = index;
  document.getElementById("openModalButton").click();
}
}
