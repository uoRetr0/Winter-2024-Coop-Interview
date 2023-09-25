import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent {
  
  constructor(private router: Router) {}

  returnToGame() {
    this.router.navigate(['/']);
  }
}
