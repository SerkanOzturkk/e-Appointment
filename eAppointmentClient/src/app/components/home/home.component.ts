import { Component } from '@angular/core';
import { departments } from '../../constants';
import { DoctorModel } from '../../models/doctor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxSchedulerModule } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule,DxSchedulerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  departments = departments;
  doctors: DoctorModel[] = [];


  selectedDepartmentValue: number = 0;
  selectedDoctorId: string = "";

  appointments: any = [
    {
      startDate: new Date("2024-07-19 09.00"),
      endDate: new Date("2024-07-19 09.30"),
      title: "Serkan Öztürk"
    },
    {
      startDate: new Date("2024-07-19 09.30"),
      endDate: new Date("2024-07-19 10.00"),
      title: "Furkan Öztürk"
    },
    {
      startDate: new Date("2024-07-19 11.30"),
      endDate: new Date("2024-07-19 12.00"),
      title: "Ali Öztürk"
    }
  ]
}
