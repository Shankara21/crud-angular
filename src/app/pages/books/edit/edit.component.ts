import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/Services/control.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book.models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  book!: Book;
  form!: FormGroup;
  bookId: number=0 ;

  tempData: any[] = []
  dataCategory: any[] = []

  constructor(public ControlService: ControlService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ControlService.getBookById(this.id).subscribe((res: any) => {
      this.book = res;
      this.bookId = res.categoryId;
      console.log(this.bookId);
      
      this.form = new FormGroup({
        title: new FormControl(res.title, [Validators.required]),
        author: new FormControl(res.author, [Validators.required]),
        publisher: new FormControl(res.publisher, [Validators.required]),
        description: new FormControl(res.description, [Validators.required]),
        year: new FormControl(res.year, [Validators.required]),
        status: new FormControl(res.status, [Validators.required]),
        categoryId: new FormControl(res.categoryId, [Validators.required])
  
      })
    })
    //! START FUNCTION
    this.ControlService.getCategory().subscribe((res: any) => {
      this.tempData = res;
      this.tempData.forEach((item: any) => {
        this.dataCategory.push(item.name)
      })
    })

  }

  submit() {
    console.log(this.form.value);
    
  }

}
