import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private _snackBar: MatSnackBar) { }

    showMessage(message: string, displayTime?: number): void {
        this._snackBar.open(message, 'Fechar', { 
            duration: this.getDuration(displayTime), 
            horizontalPosition: 'center', 
            verticalPosition: 'bottom' 
        })
    }

    private getDuration(displayTime?: number): number {
        if (displayTime !== undefined) {
            return displayTime * 1000;
        }
        return 3000;
    }
}
