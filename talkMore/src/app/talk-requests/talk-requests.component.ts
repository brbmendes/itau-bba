import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { MessageService } from '../shared/services/message.service';
import { DetailRequestComponent } from './detail-request/detail-request.component';
import { RequestModel } from './models/requestModel';
import { TalkRequestsService } from './talk-requests.service';

@Component({
  selector: 'app-talk-requests',
  templateUrl: './talk-requests.component.html',
  styleUrls: ['./talk-requests.component.sass']
})
export class TalkRequestsComponent implements OnInit {
  _talkMorePlan: any[];
  _matDataSource: RequestModel[] = []
  newRequestForm: FormGroup;

  displayedColumns: string[] = ['id', 'company', 'plan', 'tariff', 'minutes', 'planValue', 'accessionDate', 'sendDate', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private coolDialogs: NgxCoolDialogsService,
    private talkRequestsService: TalkRequestsService,
    private messageService: MessageService,
    private dialog: MatDialog) {
      this._talkMorePlan = ['FaleMais 30','FaleMais 60','FaleMais 120'];
      this.newRequestForm = this.fb.group({
        company: [null, Validators.required],
        cnpj: [null, Validators.required],
        plan: [null, Validators.required],
        tariff: [null, Validators.required],
        minutes: [null, Validators.required],
        planValue: [null, Validators.required],
        accessionDate: [null, Validators.required],
      });
     }

  ngOnInit(): void {
    this.GetRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMinutes(minutes: number): string {
    return minutes.toString() + ' min';
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
      this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(DetailRequestComponent, {
      data: { isEdit, request },
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetRequests();
    });
  }
}
