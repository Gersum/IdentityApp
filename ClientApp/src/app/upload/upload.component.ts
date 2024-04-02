import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {

   
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();

   
   
    formData.append('file', fileToUpload, fileToUpload.name);

    console.log("fromData.files : " , formData.get('file'));
    
    this.http.post(`${environment.appUrl}upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress){
          if(event?.loaded && event?.total )
          this.progress = Math.round(100 * event.loaded / event.total);
          
          }

        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          console.log("this is the file body " , event.body)
      
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

}
