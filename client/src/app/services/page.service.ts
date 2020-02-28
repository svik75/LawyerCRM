import { Title, Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SetTagPage {
  tag = {name: String, content: String};
  constructor(private title: Title, private meta: Meta) { }

  setTitle(newTitle: string) {
    this.title.setTitle(newTitle);
  }
  updateMeta(tagName: string, tagContent: string) {
    this.meta.updateTag({tagName, tagContent});
  }


}
