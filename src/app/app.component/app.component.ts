import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';

interface ItemsResponse {
  results: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app';
  protected hide = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  results: string[] = new Array();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    const url = 'https://api.github.com/repos/wikimedia/mediawiki-extensions/contents/.gitmodules';

    this.http.get<ItemsResponse>(url).subscribe(data => {
      // data is now an instance of type ItemsResponse, so you can do this:
      this.results = data.results;
      console.log(this.results);
    });

    console.log(this.results);
  }
}

interface ItemResponse {
  result: string[];
}

/*

, (key, value) => {
        if (typeof value === 'content') {
          return value;
        }
      });
 */
