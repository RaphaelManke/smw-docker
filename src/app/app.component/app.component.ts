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

  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  title = 'app';
  protected hide = true;

  extensions: Array<Extension> = new Array(4);


  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


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

  }



  ngDoCheck() {  }

  saveFile(): void {
    let file = new File(["Hello, world!"], "stack.json", {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(file);
  }

}
