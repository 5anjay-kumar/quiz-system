import { constants } from './../app.constants';
import { EmitterService } from './../core/services/emitter.service';
import { StudentService } from './../core/services/student.service';
import { SubjectService } from './../core/services/subject.service';
import { TeacherService } from "./../core/services/teacher.service";
import { BatchService } from "./../core/services/batch.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy {
  totalBatches: number;
  totalTeachers: number;
  totalStudents: number;
  totalSubjects: number;

  constructor(
    private batchService: BatchService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private emitterService: EmitterService
  ) {}

  ngOnInit() {
    this._loadStudentsCount();
    this._loadSubjectsCount();
    this._loadTeachersCount();
    this._loadBatchesCount();

    this.emitterService.subscribe(constants.events.loadTeachersCount, () => this._loadTeachersCount());
  }

  private _loadTeachersCount() {
    this.teacherService.getTeachers().subscribe(teacher => {
      this.totalTeachers = teacher.length;
    });
  }

  private _loadStudentsCount() {
    this.studentService.getStudent().subscribe(student => {
      this.totalStudents = student.length;
    });
  }

  private _loadBatchesCount() {
    this.batchService.getBatches().subscribe(batch => {
      this.totalBatches = batch.length;
    });
  }

  private _loadSubjectsCount() {
    this.subjectService.getSubjects().subscribe(subject => {
      this.totalSubjects = subject.length;
    });
  }

  ngOnDestroy() {
    this.emitterService.unsubscribe(constants.events.loadTeachersCount);
  }
}
