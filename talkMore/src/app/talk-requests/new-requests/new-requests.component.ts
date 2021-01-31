import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { GetEnumKeyByEnumValue } from 'src/app/shared/helpers/enum.helper';
import { SelectOption } from 'src/app/shared/interface/selectOption';
import { TalkMorePlan } from 'src/app/shared/utils/enum';
import { RequestsModel } from '../models/requestsModel';
import { MyRequestsComponent } from '../my-requests/my-requests.component';
import { TalkRequestsService } from '../talk-requests.service';

@Injectable({
	providedIn: 'root',
})

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.sass']
})
export class NewRequestsComponent implements OnInit {
  _talkMorePlan: SelectOption[] = this.getTalkMorePlans();
  @ViewChild(MatTable) table: MatTable<any>;
  private tableRequests: any[];

  newRequestForm = this.fb.group({
    company: [null, Validators.required],
    cnpj: [null, Validators.required],
    plan: [null, Validators.required],
    tariff: [null, Validators.required],
    minutes: [null, Validators.required],
    planValue: [null, Validators.required],
    accessionDate: [null, Validators.required],
  });
  
  constructor(
    private fb: FormBuilder, 
    private coolDialogs: NgxCoolDialogsService,
    private talkRequestsService: TalkRequestsService,
    private myRequests: MyRequestsComponent) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.newRequestForm.valid) {
      this.ConfirmAction("Deseja confirmar a operação?", () => this.saveRequest());
		}
  }

  ConfirmAction(message: string, action) {
		this.coolDialogs.confirm(message)
			.subscribe(response => {
				if (response) {
					action();
				}
			});
  }
  
  saveRequest(): void {
    var request: RequestsModel = {
        id: 1,
        company: this.newRequestForm.controls.company.value,
        cnpj: this.newRequestForm.controls.cnpj.value,
        plan: this.newRequestForm.controls.plan.value,
        tariff: this.newRequestForm.controls.tariff.value,
        minutes: this.newRequestForm.controls.minutes.value,
        planValue: this.newRequestForm.controls.planValue.value,
        accessionDate: new Date(this.newRequestForm.controls.accessionDate.value),
        sendDate: new Date(),
    };
    
    let resp = this.talkRequestsService.SaveRequest(request);
    this.talkRequestsService.SaveRequest(request).subscribe((response) => {
      if (response) {
        // this.solicitacoes.push(this.solicitacao);
        // this.alertService.show('Solicitação cadastrada com sucesso', 3);
        // this.solicitacao = {};
        let respo = this.talkRequestsService.GetRequests();
        var a = 2;
      }
    });
    
  }

  getRequests(){
    this.talkRequestsService.GetRequests().subscribe((requests: any[]) => {
      var a = requests;
      var b = 2;
      // this.myRequests.dataSource = solicitacoes;
    });
  }
  
  getTalkMorePlans(){
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
