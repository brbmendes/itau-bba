import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { GetEnumKeyByEnumValue } from 'src/app/shared/helpers/enum.helper';
import { SelectOption } from 'src/app/shared/interface/selectOption';
import { TalkMorePlan } from 'src/app/shared/utils/enum';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.sass']
})
export class NewRequestsComponent implements OnInit {
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
  
  constructor(private fb: FormBuilder, private coolDialogs: NgxCoolDialogsService) { }

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
    alert('eita');
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
