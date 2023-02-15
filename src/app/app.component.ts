import { Component, ViewChildren, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChildren(FormControlName, { read: ElementRef })
  formControls: ElementRef[];

  formObj: {};
  userForm: FormGroup;
  message: { [key: string]: string } = {};
  status: string;
  userData = [];
  userdata: any;
  // { fname: 'testname', lname: 'dfdsf', email: 'dsfdsfds' },
  //   { fname: 'testname', lname: 'dfdsf', email: 'dsfdsfds' },
  me: any;

  private validationMessages: {
    [key: string]: { [key: string]: string | { [key: string]: string } };
  };
  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      firstName: {
        required: 'Please enter your first name',
      },
      lastName: {
        required: 'Please enter your last name',
      },
      email: {
        required: 'Please enter your Email',
        email: 'Please enter a valid email password',
      },
      lineOne: {
        required: 'Please enter your address line one',
      },
      lineTwo: {
        required: 'Please enter your address line two',
      },
      city: {
        required: 'Please enter your city',
      },
      state: {
        required: 'Please enter your state',
      },
      country: {
        required: 'Please enter your country',
      },
    };
  }

  ngAfterViewInit(): void {
    const addBlurs: Observable<any>[] = this.formControls.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );
    merge(this.userForm.valueChanges, ...addBlurs)
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.message = this.invalidInputs(this.userForm);
      });
  }

  ngOnInit(): void {



  }
  onsubmitReg() {
    // if(!this.userForm.valid){
    //   alert("Enter currect fields")
    // }
    let uuu = this.userForm.value;
    this.userData.push(uuu);
    console.log(this.userData);
    this.userForm.reset();
  }
  deleteUser(userdata) {
    this.userData = this.userData.filter((t) => t.phone !== userdata.phone);
    // this.registeredUsers = this.registeredUsers.filter(item => item.id != user.id);
  }
  editData(userdata) {
    this.userForm.patchValue({
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      phone: userdata.phone,
      company: userdata.company,
      gender: userdata.gender,
    });
    // this.me = userdata.firstname.value;
    // this.me = this.userForm.get('firstName').patchValue(userdata.firstname);
    // console.log(this.userForm.get('firstName'));
  }
 

  onSubmit() {
    let { formObj } = this;
    let { value } = this.userForm;
    console.log(value);
    const sth = JSON.stringify({ ...formObj, business: value });
    try {
      localStorage.setItem('form', sth);
    } catch {
      (e) => console.log(e);
    }
  }
}
class Movie {
  title: string;
  director: string;
  cast: string;
  releaseDate: string;
}
