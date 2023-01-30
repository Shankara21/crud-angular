import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private controlService: ControlService) { }

  tempData: any[] = []
  dataCategory: any[] = []

  ngOnInit(): void {
    // this.controlService.getCategory().subscribe((res: any) => {
    //   this.tempData = res;
    //   console.log(this.tempData);
    //   this.tempData.forEach((item: any) => {
    //     this.dataCategory.push(item.name)
    //   })
    // })
  }

}
