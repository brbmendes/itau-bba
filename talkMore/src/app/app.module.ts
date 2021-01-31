import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout'
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule } from 'ngx-mask'
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { TalkRequestsComponent } from './talk-requests/talk-requests.component';
import { HeaderComponent } from './shared/header/header.component';
import { NewRequestsComponent } from './talk-requests/new-requests/new-requests.component';
import { MyRequestsComponent } from './talk-requests/my-requests/my-requests.component';

registerLocaleData(localePt);

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		TalkRequestsComponent,
		HeaderComponent,
		NewRequestsComponent,
		MyRequestsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatCheckboxModule,
		MatCheckboxModule,
		MatButtonModule,
		MatInputModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatRadioModule,
		MatSelectModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		MatListModule,
		MatGridListModule,
		MatCardModule,
		MatStepperModule,
		MatTabsModule,
		MatExpansionModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatDialogModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		FlexLayoutModule,
		NgxMaskModule.forRoot(),
		NgxCoolDialogsModule.forRoot({
			theme: "default",
			okButtonText: "Sim",
			cancelButtonText: "Não",
			color: "#EC7000",
			titles: {
			  alert: "Atenção!",
			  confirm: "Confirmar",
			  prompt: "Informe"
			}
		  }),
	],
	providers: [{provide: LOCALE_ID, useValue: 'pt-br'}],
	bootstrap: [AppComponent]
})
export class AppModule { }
