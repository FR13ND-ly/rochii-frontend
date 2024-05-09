import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { ImageComponent } from '../../../../core/ui/image/image.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'product-images',
  standalone: true,
  imports: [ImageComponent, MatIcon],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnChanges {
  @Input() product: any;

  mainImage: any;
  images: any = [];

  scroll = signal(0);

  increment() {
    this.scroll.update((val) => val + 1);
  }

  decrement() {
    this.scroll.update((val) => val - 1);
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    this.mainImage = changes['product'].currentValue.mainImg;
    changes['product'].currentValue.images.forEach((img: any) => {
      this.images.push({
        id: img.id,
        main: false,
      });
    });
    this.images.unshift({
      id: this.mainImage.id,
      main: true,
    });
  }

  onChangeMainImg(index: number) {
    this.mainImage = { ...this.images[index] };
    this.images = this.images.map((img: any) => {
      img.main = false;
      return img;
    });
    this.images[index].main = true;
  }
}
