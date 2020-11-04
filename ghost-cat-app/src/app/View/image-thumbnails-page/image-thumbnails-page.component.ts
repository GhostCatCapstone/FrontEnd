import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-thumbnails-page',
  templateUrl: './image-thumbnails-page.component.html',
  styleUrls: ['./image-thumbnails-page.component.css']
})
export class ImageThumbnailsPageComponent implements OnInit {

  images:string[];

  constructor() { }

  ngOnInit(): void {
    this.images = ["https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/group/otter-group-thumb.jpg",
    "https://www.nationalgeographic.com/content/dam/animals/rights-exempt/2018-photo-contest-animals/elephants-ngpc-prod-yourshot-1658809-12895401.ngsversion.1541097295355.adapt.1900.1.jpg",
    "https://www.nationalgeographic.com/content/dam/animals/2018/11/machines-saving-animals/02-machine-saving-animals-nationalgeographic_1977490.ngsversion.1542108601667.adapt.1900.1.jpg",
    "https://www.nationalgeographic.com/content/dam/news/2015/11/25/01qajoelsartore.jpg",
  "https://www.nationalgeographic.com/content/dam/animals/rights-exempt/2018-photo-contest-animals/lion-cubs-ngpc-prod-yourshot-728718-12882346.jpg",
"https://www.nationalgeographic.com/content/dam/animals/2019/12/wildlife-wins-losses/wildlife-wins-losses-nationalgeographic_2188826.ngsversion.1576845765039.adapt.1900.1.jpg",
"https://www.nationalgeographic.com/content/dam/photography/PROOF/2018/June/travel-photographer-contest-animals/travel-photography-contest-1.ngsversion.1554993216699.adapt.1900.1.jpg",
"https://www.nationalgeographic.com/content/dam/animals/2020/04/mothers-day-gallery/nationalgeographic_2740171.jpg",
"https://assets-natgeotv.fnghub.com/Shows/2711.jpg",
"https://assets-natgeotv.fnghub.com/Shows/77704.jpg",
"https://www.nationalgeographic.com/content/dam/animals/rights-exempt/2018-photo-contest-animals/elephants-ngpc-prod-yourshot-1658809-12895401.ngsversion.1541097295355.adapt.1900.1.jpg",
"https://www.denofgeek.com/wp-content/uploads/2020/04/Nat-Geo-WILD-Social-Distancing-Otter.jpg?resize=768%2C432",
"https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/07-NationalGeographic-2432542-credit-Ami-Vitale-1-1573756530.jpg",
"https://s23527.pcdn.co/wp-content/uploads/2018/07/nat_geo_wildlife_photography.jpg.optimal.jpg",
"https://i.insider.com/51966f876bb3f73b39000000?width=1100&format=jpeg&auto=webp"];

  }

}
