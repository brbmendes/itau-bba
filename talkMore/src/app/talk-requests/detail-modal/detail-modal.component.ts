import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetEnumKeyByEnumValue } from 'src/app/shared/helpers/enum.helper';
import { SelectOption } from 'src/app/shared/interface/selectOption';
import { TalkMorePlan } from 'src/app/shared/utils/enum';

export interface DialogData {
  animal: string;
  name: string;

}

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.sass']
})
export class DetailModalComponent implements OnInit {

  animal: string;
  name: string;
  _talkMorePlan: SelectOption[] = this.getTalkMorePlans();

  newRequestForm = this.fb.group({
    company: [null, Validators.required],
    cnpj: [null, Validators.required],
    plan: [null, Validators.required],
    tariff: [null, Validators.required],
    minutes: [null, Validators.required],
    planValue: [null, Validators.required],
    accessionDate: [null, Validators.required],
  });
  
  constructor(public dialog: MatDialog, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  openDialog(request: any, isEdit: boolean): void {
    this.dialog.open(DetailModalComponent, {
      width: '100%',
      data: {request, isEdit}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  onSave(){

  }

  getTalkMorePlans() {
    let array: SelectOption[] = [];
    Object.keys(TalkMorePlan).forEach((element) => {
      if (isNaN(Number(element)) === false) {
        var key = GetEnumKeyByEnumValue(TalkMorePlan, element);
        let plan: SelectOption = { value: element, label: key };
        array.push(plan);
      }
    })
    return array;
  }

  onSubmit(){
    console.log('eita')
  }
      
}
