import { Component, Input, OnInit } from '@angular/core';
import { Mail } from '../mail.model';

@Component({
  selector: 'app-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})
export class MailItemComponent implements OnInit {
  @Input() mail?: Mail;
  @Input() id!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
