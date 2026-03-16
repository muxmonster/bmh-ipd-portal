import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: 'app-ipd-oper',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './ipd-oper.html',
  styleUrl: './ipd-oper.scss',
})
export class IpdOper {
  collapsed = signal<boolean>(false);

  toggleMenu() {
    this.collapsed.update((v) => !v);
  }
}
