import {
  Component,
  Input,
  PLATFORM_ID,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { FilesService } from '../../data-access/files.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() image: any;
  fileService = inject(FilesService);
  sanitizer = inject(DomSanitizer);
  fileUrl: any = null;
  platformId = inject(PLATFORM_ID);
  loading = signal(true);

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['image'].currentValue.id &&
      isPlatformBrowser(this.platformId)
    ) {
      this.fileService
        .getImage(changes['image'].currentValue.id)
        .subscribe((res) => this.getFile(res));
    }
  }

  getFile(image: any): void {
    const url = window.URL.createObjectURL(image);
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.loading.set(false);
  }
}
