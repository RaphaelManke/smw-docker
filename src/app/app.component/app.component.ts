import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Extension} from '../extension';
import * as fileSaver from 'file-saver';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {observable} from 'rxjs/symbol/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {

  title = 'app';
  protected hide = true;


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  errorString: string;
  path = './app.component/data.txt';
  url = '//raw.githubusercontent.com/wikimedia/mediawiki-extensions/master/.gitmodules';
  data = '';
  content;
  extensions: Array<Extension> = new Array<Extension>();

  promiseExtensions: Promise<string>;

  @Input() username; password;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.http.get(this.path, {responseType: 'text'})
      .subscribe(this.data => )
    console.log(data);
     this.createTable(data);

  }


  createTable(data): void {
    this.content = data.trim().split('[', 3);
    for (let i = 0; i < this.content.length; i++) {
      const name_start = this.content[i].indexOf('= ') + 2;
      const name_end = this.content[i].indexOf('url', name_start + 1) - 1;
      const url_start = this.content[i].indexOf('= ', name_end) + 2;
      const url_end = this.content[i].indexOf('branch', url_start + 1) - 1;
      this.extensions [i].name = this.content[i].substring(name_start, name_end);
      this.extensions [i].url = this.content[i].substring(url_start, url_end);
    }
  }

  ngDoCheck() {  }

  saveFile(): void {
    let file = new File(["Hello, world!"], "stack.json", {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(file);
  }

}
