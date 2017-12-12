import {AfterContentInit, Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Extension} from '../extension';
import * as fileSaver from 'file-saver';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {observable} from 'rxjs/symbol/observable';
import {SelectionModel} from '@angular/cdk/collections';
import {MatListOption} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterContentInit {

  typeOfextensions = ['3D', 'AJAXPoll', 'AbsenteeLandlord', 'AbuseFilter', 'AccessControl'];
  selectedOptions: SelectionModel<MatListOption>;


  title = 'app';
  protected hide = true;

  // extensions: Array<Extension> = new Array(4);


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  url = '//raw.githubusercontent.com/wikimedia/mediawiki-extensions/master/.gitmodules';
  content;
  data = '';

  mapExtensions = new Map<string, string>();


  @Input() username; password;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {

    /*
    this.extensions[0].name = '3D';
    this.extensions[0].url = 'https://gerrit.wikimedia.org/r/mediawiki/extensions/3D';
    this.extensions[1].name = 'AJAXPoll';
    this.extensions[1].url = 'https://gerrit.wikimedia.org/r/mediawiki/extensions/AJAXPoll';
    */
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

    this.http.get(this.url, {responseType: 'text'})
      .subscribe(data => this.data = data);
  }



  ngAfterContentInit() {
    this.createTable();
  }

  start(selectedOptions) {
    // this.selectedOptions =s
    console.log('something');
  }

  createTable(): void {
    this.content = this.data.trim().split('[');
    for (let i = 0; i < this.content.length; i++) {
      const name_start = this.content[i].indexOf('= ') + 2;
      const name_end = this.content[i].indexOf('url', name_start + 1) - 1;
      const url_start = this.content[i].indexOf('= ', name_end) + 2;
      const url_end = this.content[i].indexOf('branch', url_start + 1) - 1;
      const name = this.content[i].substring(name_start, name_end);
      const url = this.content[i].substring(url_start, url_end);

      this.mapExtensions.set(name, url);
      console.log(this.mapExtensions);
    }
  }

  saveFile(): void {


    let content = '';

    /*
    for (let i = 0; i < selectedOptions.length; i++) {
      content += '{ "name" : "' + selectedOptions[i] + '", "url" : "' + this.mapExtensions.get(this.selectedOptions[i]) + '" }, ';
    }

    content = content.substring(0, content.length - 2);
    content = '{ "extension" : [ ' + content + ' ] }';

    */
    for (let i = 0; i < this.mapExtensions.size; i++) {
      content += '{ "name" : "' + this.mapExtensions[i] + '", "url" : "' + this.mapExtensions.get(this.selectedOptions[i]) + '" }, ';
    }

    content = content.substring(0, content.length - 2);
    content = '{ "extension" : [ ' + content + ' ] }';

    let file = new File([this.data], 'test.txt', {type: 'text/plain;charset=utf-8'});
    fileSaver.saveAs(file);
  }

}
