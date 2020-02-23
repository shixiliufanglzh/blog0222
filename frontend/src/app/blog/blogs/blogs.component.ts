import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs = []
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    const url = this.configService.serviceUrl + '/api/blog/list';
    this.http.get(url).subscribe((result: any) => {
      console.log('blogs: ', result)
      if (result && result.errNo === 0) {
        this.blogs = result.data || [];
      } else {
        alert(result ? result.message : '意外的错误' );
      }
    })
  }

  filterByAuthor(author: string) {
    
  }

}
