import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { GetEnumKeyByEnumValue } from '../shared/helpers/enum.helper';
import { SelectOption } from '../shared/interface/selectOption';
import { MessageService } from '../shared/services/message.service';
import { TalkMorePlan } from '../shared/utils/enum';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { RequestModel } from './models/requestModel';
import { TalkRequestsService } from './talk-requests.service';

@Component({
  selector: 'app-talk-requests',
  templateUrl: './talk-requests.component.html',
  styleUrls: ['./talk-requests.component.sass']
})
export class TalkRequestsComponent implements OnInit {
  _talkMorePlan: SelectOption[] = this.getTalkMorePlans();
  _matDataSource: RequestModel[] = []

  displayedColumns: string[] = ['id', 'company', 'plan', 'tariff', 'minutes', 'planValue', 'accessionDate', 'sendDate', 'action'];
  dataSource = new MatTableDataSource<any>();

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
    private talkRequestsService: TalkRequestsService,
    private messageService: MessageService,
    private detailModalComonent: DetailModalComponent,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMinutes(minutes: number): string {
    return minutes.toString() + ' min';
  }

  getTalkMorePlans() {
    let array: SelectOption[] = [];
    Object.keys(TalkMorePlan).forEach((element) => {
      if (isNaN(Number(element)) === false) {
        var key = GetEnumKeyByEnumValue(TalkMorePlan, element);
        let plan: SelectOption = { value: key, label: key };
        array.push(plan);
      }
    })
    return array;
  }

  ConfirmAction(message: string, action) {
    this.coolDialogs.confirm(message)
      .subscribe(response => {
        if (response) {
          action();
        }
      });
  }

  onSubmit() {
    if (this.newRequestForm.valid) {
      this.ConfirmAction("Deseja confirmar a operação?", () => this.SaveRequest());
    }
  }

  SaveRequest(): void {
    this.talkRequestsService.GetRequests().subscribe((requests: any[]) => {
      let maxId = Math.max.apply(Math, requests.map(function(o) { return o.id; }))
      
      if(Number(maxId) === 0 || maxId === null || maxId === undefined){
        maxId = 1;
      }
      else {
        maxId += 1;
      }

      var request: RequestModel = {
        id: maxId,
        empresa: this.newRequestForm.controls.company.value,
        cnpj: this.newRequestForm.controls.cnpj.value,
        plano: this.newRequestForm.controls.plan.value,
        tarifa: this.newRequestForm.controls.tariff.value,
        minutos: this.newRequestForm.controls.minutes.value,
        vplano: this.newRequestForm.controls.planValue.value,
        dateAdesao: new Date(this.newRequestForm.controls.accessionDate.value),
        dateEmissao: new Date(),
      };

      this.talkRequestsService.SaveRequest(request).subscribe((response) => {
        if (response) {
          this.messageService.showMessage('Solicitação cadastrada com sucesso', 3);
          this.GetRequests();
        }
      });
    });
  }

  GetRequests() {
    this.talkRequestsService.GetRequests().subscribe((requests: any[]) => {
      this._matDataSource = [];
      requests.forEach((element) => {
        let tableLine: RequestModel = {
          _id: element._id,
          cnpj: element.cnpj,
          dateAdesao: element.dateAdesao,
          dateEmissao: element.dateEmissao,
          empresa: element.empresa,
          minutos: element.minutos,
          plano: element.plano,
          tarifa: element.tarifa,
          vplano: element.vplano,
          id: element.id,

        }
        this._matDataSource.push(tableLine);
      });
      this.dataSource = new MatTableDataSource<RequestModel>(this._matDataSource);
    });
  }

  onClickDelete(request: any) {
    this.ConfirmAction("Deseja confirmar a operação?", () => this.DeleteRequest(request._id));
  }

  DeleteRequest(requestId: string){
    this.talkRequestsService.DeleteRequest(requestId).subscribe((response) => {
      if(response){
        this.messageService.showMessage('Solicitação removida com sucesso', 3);
        this.GetRequests();
      }
      else {
        this.messageService.showMessage('Falha ao remover solicitação. Por favor tente novamente', 3);
      }
    });
  }

  onClickDetails(request: any, isEdit: boolean ){
    const dialogRef = this.dialog.open(DetailModalComponent, {
      data: { isEdit, request },
      width: '100%'
    });
  }
}
