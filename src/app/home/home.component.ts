import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var shaka: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef; video;
  showModal1 = true; selection: any[] = []; showModal2 = true; search: string;
  AnimationVideos = [
    { id: '1', name: "Angel-One", img: "./assets/angel.png", views: "3K views", period: "6 Months ago", video: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd" },
    { id: '2', name: "Tears Of Steel", img: "./assets/sintel.png", views: "2K views", period: "5 Years ago", video: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd" },
    { id: '3', name: "Heliocentrism", img: "./assets/angel2.png", views: "2K views", period: "5 Months ago", video: "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd" },
    { id: '4', name: "Sintel", img: "./assets/sintel2.png", views: "4K views", period: "2 Years ago", video: "https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd" },
  ];
  CartoonVideos = [
    { id: '1', name: "Nature", views: "3K views", period: "2 Years ago", img: "./assets/nature.png", video: "./assets/nature.mp4" },
    { id: '2', name: "Pokemon", views: "2K views", period: "3 Months ago", img: "./assets/Pokemon.png", video: "./assets/Pokemon.mp4" },
    { id: '3', name: "Pokémon Pikachu", views: "1.5M views", period: "2 Months ago", img: "./assets/Pokémon Pikachu.png", video: "./assets/Pokémon Pikachu.mp4" },
    { id: '4', name: "Kitten", views: "5K views", period: "6 Months ago", img: "./assets/kitten.png", video: "./assets/kitten.mp4" },
    { id: '5', name: "Ash Ketchum's Pokmeon", views: "3K views", period: "1 Years ago", img: "./assets/ASH KETCHUM'S POKEMON TIMELINE.PNG", video: "./assets/ASH KETCHUM'S POKEMON TIMELINE.mp4" },
    { id: '6', name: "POKÉMON Detective", views: "6K views", period: "1 Months ago", img: "./assets/POKÉMON Detective 3.png", video: "./assets/POKÉMON Detective.mp4" },
  ];
  constructor() { }

  ngOnInit() { 
  }

  animation(x, position) {
    this.showModal1 = !this.showModal1;
    this.selection = [];
    this.AnimationVideos.forEach((subscription, index) => {
      if (position === index) {
        this.selection.push(
          this.AnimationVideos.find(
            ele => ele.id === subscription.id
          )
        );
      }
    });

    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer();
    } else {
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    player.load(this.selection[0].video).then(function () {
    }).catch(error => { this.onError(error) });
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  cartoon(y, position) {
    this.showModal2 = !this.showModal2;
    this.selection = [];
    this.CartoonVideos.forEach((subscription, index) => {
      if (position === index) {
        this.selection.push(
          this.CartoonVideos.find(
            ele => ele.id === subscription.id
          )
        );
      }
    });
  }

  closeCartoon() {
    this.selection = [];
    this.showModal2 = !this.showModal2;
  }

  closeAnimation() {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);
    player.unload(this.selection[0].video).then(function () {
    }).catch(error => { this.onError(error) });
    this.selection = [];
    this.showModal1 = !this.showModal1;
  }
}
