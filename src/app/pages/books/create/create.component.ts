import { Category } from './../../../Models/Book.models';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private controlService: ControlService, private router: Router) { }

  tempData: any[] = []
  dataCategory: any[] = []

  //NEEDED FOR CREATE
  form!: FormGroup;
  test: string = '';

  ngOnInit(): void {
    //! START FUNCTION
    this.controlService.getCategory().subscribe((res: any) => {
      this.tempData = res;
      this.tempData.forEach((item: any) => {
        this.dataCategory.push(item.name)
      })
    })
    //? END FUNCTION

    //! START FORM
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    })
    //? END FORM
  }
  submit() {
    this.form.value.categoryId = Number(this.form.value.categoryId);
    // year to string
    this.form.value.year = String(this.form.value.year);
    this.controlService.createBook(this.form.value).subscribe((res: any) => {
      this.router.navigate(['/home'])
    }
    )
  }

}
