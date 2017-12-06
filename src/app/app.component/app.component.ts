import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {Observable} from 'rxjs/Observable';
import {Extension} from '../extension';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app';
  protected hide = true;

  observableExtensions: Observable<Extension[]>;
  extensions: Extension[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  errorString: string;

  constructor(private formBuilder: FormBuilder,
              private httpService: HttpService) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.observableExtensions = this.httpService.getExtensions();
    this.observableExtensions.subscribe(
      extensions => this.extensions = extensions,
      error => this.errorString = <any>error);

    console.log(this.extensions);
  }
}
