import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ListObservable, UserSubject, EstaticObservable } from './_subscribeManager';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public formUser : FormGroup
  private _userSubject: UserSubject
  private _observerList: ListObservable
  private _observerEstatic: EstaticObservable
  constructor(
    private fb:FormBuilder,
  ){
    this._userSubject =  new UserSubject()
    this._observerList = new ListObservable()
    this._observerEstatic = new EstaticObservable()
    this._userSubject.addObservable(this._observerList)
    this._userSubject.addObservable(this._observerEstatic)
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.formUser = this.fb.group({
      nome:new FormControl(''),
      email: new FormControl(''),
      birthday: new FormControl(Date)
    })
  }

  adicionar(){
    this._userSubject.addUser(this.formUser.value)
  }

  remover(index:number){
    this._userSubject.removeUser(index)
  }

  get listPessoas(){
    return this._observerList.getList
  }

  get getStatistic(){
    return this._observerEstatic.getObj
  }

}

