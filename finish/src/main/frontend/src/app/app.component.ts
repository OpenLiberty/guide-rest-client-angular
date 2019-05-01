import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ArtistsService {
  constructor(private http: HttpClient) { }

  private static ARTISTS_URL = 'http://localhost:9080/artists';

  async fetchArtists() {
    try {
      let data: any = await this.http.get(ArtistsService.ARTISTS_URL).toPromise();
      return data;
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ArtistsService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  artists: any[] = [];

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.artistsService.fetchArtists().then(data => {
      this.artists = data;
    });
  }
}
