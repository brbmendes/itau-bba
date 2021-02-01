import { Component, Inject, Injectable, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MessageService } from 'src/app/shared/services/message.service';
import { RequestModel } from '../models/requestModel';
import { TalkRequestsService } from '../talk-requests.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.sass']
})
export class DetailRequestComponent implements OnInit {
  _talkMorePlan: any[];
  @Input() _requestForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private talkRequestsService: TalkRequestsService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailRequestComponent>,
    private coolDialogs: NgxCoolDialogsService) {
      this._talkMorePlan = ['FaleMais 30','FaleMais 60','FaleMais 120'];
      this._requestForm = this.fb.group({
        empresa: this.fb.control(null, [Validators.required]),
        cnpj: this.fb.control(null, [Validators.required]),
        plano: this.fb.control(null, [Validators.required]),
        tarifa: this.fb.control(null, [Validators.required]),
        minutos: this.fb.control(null, [Validators.required]),
        vplano: this.fb.control(null, [Validators.required]),
        dateAdesao: this.fb.control(null, [Validators.required]),
        dateEmissao: this.fb.control(null),
        id: this.fb.control(null),
        _id: this.fb.control(null),
      });
     }

  ngOnInit(): void {
    this._requestForm.controls.empresa.setValue(this.data.request.empresa);
    this._requestForm.controls.cnpj.setValue(this.data.request.cnpj);
    this._requestForm.controls.plano.setValue(this.data.request.plano);
    this._requestForm.controls.tarifa.setValue(this.data.request.tarifa.replace('.',','));
    this._requestForm.controls.minutos.setValue(this.data.request.minutos);
    this._requestForm.controls.vplano.setValue(this.data.request.vplano.replace('.',','));
    this._requestForm.controls.dateAdesao.setValue(this.data.request.dateAdesao);
    this._requestForm.controls.dateEmissao.setValue(this.data.request.dateEmissao);
    this._requestForm.controls._id.setValue(this.data.request._id);
    this._requestForm.controls.id.setValue(this.data.request.id);
  }

  ConfirmAction(message: string, action) {
    this.coolDialogs.confirm(message)
      .subscribe(response => {
        if (response) {
          action();
        }
      });
  }
  
  onClickClose(): void {
    this.dialogRef.close();
  }

  onClickSave(){
    if (!this._requestForm.valid) {
      return;
    }
    this.ConfirmAction("Deseja confirmar a operação?", () => this.UpdateRequest());
  }

  UpdateRequest(){
    let request: RequestModel = {
      id: this._requestForm.controls.id.value,
      _id: this._requestForm.controls._id.value,
      empresa: this._requestForm.controls.empresa.value,
      cnpj: this._requestForm.controls.cnpj.value,
      plano: this._requestForm.controls.plano.value,
      tarifa: this._requestForm.controls.tarifa.value.replace(',','.'),
      minutos: this._requestForm.controls.minutos.value,
      vplano: this._requestForm.controls.vplano.value.replace(',','.'),
      dateAdesao: new Date(this._requestForm.controls.dateAdesao.value),
      dateEmissao: new Date(),
    };

    this.talkRequestsService.UpdateRequest(request._id, request).subscribe((response) => {
      if (response) {
        this.messageService.showMessage('Solicitação atualizada com sucesso', 3);
        this.onClickClose();
      }
    });
  }
}
