import { keyframes } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEnumKeyByEnumValue } from 'src/app/shared/helpers/enum.helper';
import { TalkMorePlan } from 'src/app/shared/utils/enum';

export interface PeriodicElement {
  id: number;
  company: string;
  cnpj: string;
  plan: TalkMorePlan;
  tariff: number;
  minutes: number;
  planValue: number;
  accessionDate: Date;
  sendDate: Date;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1421, company: 'Giovanni Sarao Araki ME', cnpj: '56874597000198', plan: TalkMorePlan['FaleMais 60'], tariff: 150.50, minutes: 100, planValue: 590.80, accessionDate: new Date(2020,7,15), sendDate: new Date(2020,7,1), action: "..."},
  {id: 1420, company: 'Vitor Takara EPP', cnpj: '65498480000198', plan: TalkMorePlan['FaleMais 30'], tariff: 80.80, minutes: 50, planValue: 420.15, accessionDate: new Date(2020,3,3), sendDate: new Date(2020,5,24), action: "..."},
  {id: 1419, company: 'Augustinho Celestino LTDA', cnpj: '48558485000197', plan: TalkMorePlan['FaleMais 120'], tariff: 800.80, minutes: 300, planValue: 987.26, accessionDate: new Date(2020,6,5), sendDate: new Date(2020,4,24), action: "..."},
];

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.sass']
})
export class MyRequestsComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'company', 'plan', 'tariff', 'minutes', 'planValue','accessionDate','sendDate','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

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
}
