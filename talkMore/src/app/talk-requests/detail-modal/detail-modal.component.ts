import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetEnumKeyByEnumValue } from 'src/app/shared/helpers/enum.helper';
import { SelectOption } from 'src/app/shared/interface/selectOption';
import { TalkMorePlan } from 'src/app/shared/utils/enum';
import { RequestModel } from '../models/requestModel';
import { TalkRequestsService } from '../talk-requests.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.sass']
})
export class DetailModalComponent implements OnInit {
  _talkMorePlan: SelectOption[] = this.getTalkMorePlans();
  @Input() requestForm: FormGroup = this.fb.group({
    empresa: this.fb.control(null),
    cnpj: this.fb.control(null),
    plano: this.fb.control(null),
    tarifa: this.fb.control(null),
    minutos: this.fb.control(null),
    vplano: this.fb.control(null),
    dateAdesao: this.fb.control(null),
    dateEmissao: this.fb.control(null),
  });;


  constructor(
    private fb: FormBuilder,
    private talkMoreService: TalkRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailModalComponent>,) { }

  ngOnInit(): void {
    
    
  }

  openDialog(request: any, isEdit: string): void {
    

    this.requestForm.controls.empresa.patchValue(request.empresa);
    // this.requestForm.controls.cnpj.setValue(request.cnpj);
    // this.requestForm.controls.plano.setValue(request.plano);
    // this.requestForm.controls.tarifa.setValue(request.tarifa);
    // this.requestForm.controls.minutos.setValue(request.minutos);
    // this.requestForm.controls.vplano.setValue(request.vplano);
    // this.requestForm.controls.dateAdesao.setValue(request.dateAdesao);
    // this.requestForm.controls.dateEmissao.setValue(request.dateEmissao);

    // this.dialog.open(DetailModalComponent, {
    //   width: '100%',
    //   data: { request, isEdit }
    // });
    
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getPlano(){
    return "eas";
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
}
