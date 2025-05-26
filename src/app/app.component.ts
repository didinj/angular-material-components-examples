import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExampleDialogComponent } from './example-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatChipsModule,
    MatBadgeModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  nameControl = new FormControl('');
  displayedColumns: string[] = ['name', 'email', 'role'];
  users = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { name: 'Carol White', email: 'carol@example.com', role: 'Moderator' },
  ];

  formGroup1!: FormGroup;
  formGroup2!: FormGroup;
  selectedDate!: Date;

  languageControl = new FormControl('');
  languages: string[] = ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Kotlin'];
  filteredLanguages!: string[];

  tags: string[] = ['Angular', 'Material', 'UI'];
  newTag: string = '';

  notifications = 3;
  messages = 7;

  isLoading = false;
  showProgressBar = false;
  progressValue = 0;
  progressInterval: any;

  isDarkTheme = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.filteredLanguages = this.languages;

    this.languageControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      )
      .subscribe(filtered => {
        this.filteredLanguages = filtered;
      });

    this.formGroup1 = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.formGroup2 = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.languages.filter(lang =>
      lang.toLowerCase().includes(filterValue)
    );
  }

  submitName() {
    const name = this.nameControl.value;
    if (name) {
      this.snackBar.open(`Hello, ${name}! Your name was submitted.`, 'Close', {
        duration: 3000, // auto-hide after 3 seconds
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      this.snackBar.open('Please enter your name first.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  openDialog() {
    this.dialog.open(ExampleDialogComponent);
  }

  addTag() {
    const tag = this.newTag.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.newTag = '';
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  startProgress() {
    this.showProgressBar = true;
    this.progressValue = 0;
    clearInterval(this.progressInterval);

    this.progressInterval = setInterval(() => {
      if (this.progressValue >= 100) {
        clearInterval(this.progressInterval);
        setTimeout(() => (this.showProgressBar = false), 1000);
      } else {
        this.progressValue += 10;
      }
    }, 300);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(themeClass);
  }
}
