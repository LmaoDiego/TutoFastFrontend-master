export class Filee {
  id: number;
  fileName: string;
  fileType: string;
  size: string;
  content: Blob;

  constructor() {
    //this.uri = (window.URL || window.webkitURL).createObjectURL(this.content);
  }

}

export class FileResponse {
  content: Filee[]
  totalElements: number;
}

