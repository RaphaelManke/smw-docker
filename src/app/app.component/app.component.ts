import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Extension} from '../extension';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {

  title = 'app';
  protected hide = true;

  promiseExtension: Promise<Extension[]>;
  data: Extension[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  errorString: string;

  @Input() username; password;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService) {}

  async ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.promiseExtension = this.httpService.getExtensions();
    this.promiseExtension.then(
      extensions => this.data = extensions,
      error =>  this.errorString = <any>error);
  }

  ngDoCheck() {
    // console.log(this.data);
  }

  saveFile(): void {
    let file = new File(["Hello, world!"], "stack.txt", {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(file);
  }

}
