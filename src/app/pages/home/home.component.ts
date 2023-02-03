import { Component, OnInit, ElementRef } from '@angular/core';
import { Book } from 'src/app/Models/Book.models';
import { ControlService } from 'src/app/Services/control.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: Book[] = []

  constructor(private controlService: ControlService, private elementRef: ElementRef) { }

  sizePerPage: number = 2;
  public selectedPage = 1;
  books: any;

  ngOnInit(): void {
    this.controlService.getAllBooks().subscribe((res: any) => {
      this.data = res;
      console.log('ini res');
      console.log(this.data);
      let pageIndex = (this.selectedPage - 1) * this.sizePerPage;
      this.books = this.data.slice(pageIndex, pageIndex + this.sizePerPage);
    })

  }
  changePageSize(event: Event) {

  }

  get pageNumber(): number[]{
    return Array(Math.ceil(this.data.length / this.sizePerPage)).fill(0).map((x, i) => i + 1);
  }

}
