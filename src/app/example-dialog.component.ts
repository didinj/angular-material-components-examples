import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    selector: 'app-example-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './example-dialog.component.html',
})
export class ExampleDialogComponent { }
