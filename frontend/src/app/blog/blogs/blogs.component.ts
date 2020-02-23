import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    const url = this.configService.serviceUrl + '/api/blog/list';
    this.http.get(url).subscribe(result => {
      console.log(result)
    })
  }

}
