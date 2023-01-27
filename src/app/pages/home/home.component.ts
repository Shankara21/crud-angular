import { Component, OnInit, ElementRef } from '@angular/core';
import { Book } from 'src/app/Models/Book.models';
import { ControlService } from 'src/app/Services/control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:Book[] = []

  constructor(private controlService: ControlService, private elementRef : ElementRef) { }

  ngOnInit(): void {
    this.controlService.getAllBooks().subscribe((res: any) => {
      console.log(res);
      this.data = res;
      console.log('ini data');
      console.log(this.data);
    })
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
