import { StudentService } from './../core/services/student.service';
import { SubjectService } from './../core/services/subject.service';
import { TeacherService } from "./../core/services/teacher.service";
import { BatchService } from "./../core/services/batch.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  totalBatches: number;
  totalTeachers: number;
  totalStudents: number;
  totalSubjects: number;

  constructor(
    private batchService: BatchService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.batchService.getBatches().subscribe(batch => {
      this.totalBatches = batch.length;
    });

    this.teacherService.getTeachers().subscribe(teacher => {
      this.totalTeachers = teacher.length;
    });

    this.subjectService.getSubjects().subscribe(subject => {
      this.totalSubjects = subject.length;
    });

    this.studentService.getStudent().subscribe(student => {
      this.totalStudents = student.length;
    });
  }
}
