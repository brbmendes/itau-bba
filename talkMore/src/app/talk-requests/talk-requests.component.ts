import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { GetEnumKeyByEnumValue } from '../shared/helpers/enum.helper';
import { SelectOption } from '../shared/interface/selectOption';
import { TalkMorePlan } from '../shared/utils/enum';
import { RequestsModel } from './models/requestsModel';
import { TalkRequestsService } from './talk-requests.service';

const ELEMENT_DATA: RequestsModel[] = [
  { id: 1421, company: 'Giovanni Sarao Araki ME', cnpj: '56874597000198', plan: TalkMorePlan['FaleMais 60'], tariff: 150.50, minutes: 100, planValue: 590.80, accessionDate: new Date(2020, 7, 15), sendDate: new Date(2020, 7, 1) },
  { id: 1420, company: 'Vitor Takara EPP', cnpj: '65498480000198', plan: TalkMorePlan['FaleMais 30'], tariff: 80.80, minutes: 50, planValue: 420.15, accessionDate: new Date(2020, 3, 3), sendDate: new Date(2020, 5, 24) },
  { id: 1419, company: 'Augustinho Celestino LTDA', cnpj: '48558485000197', plan: TalkMorePlan['FaleMais 120'], tariff: 800.80, minutes: 300, planValue: 987.26, accessionDate: new Date(2020, 6, 5), sendDate: new Date(2020, 4, 24) },
  
];
@Component({
  selector: 'app-talk-requests',
  templateUrl: './talk-requests.component.html',
  styleUrls: ['./talk-requests.component.sass']
})
export class TalkRequestsComponent implements OnInit {
  _talkMorePlan: SelectOption[] = this.getTalkMorePlans();
  
  displayedColumns: string[] = ['id', 'company', 'plan', 'tariff', 'minutes', 'planValue', 'accessionDate', 'sendDate', 'action'];
    dataSource = new MatTableDataSource<RequestsModel>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

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
    private talkRequestsService: TalkRequestsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMinutes(minutes: number): string {
    return minutes.toString() + ' min';
  }

  getPlan(planId: number): string {
    let key = "";
    Object.keys(TalkMorePlan).forEach((element) => {
			if (isNaN(Number(element)) === false && Number(element) === planId) {
         key = GetEnumKeyByEnumValue(TalkMorePlan, element);
			}
    })
    return key;
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
        let respo = this.getRequests();
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
