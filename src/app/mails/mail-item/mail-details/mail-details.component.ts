import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mail } from '../../mail.model';
import { MailsService } from '../../mails.service';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.css']
})
export class MailDetailsComponent implements OnInit, OnDestroy {
  @Input() mail?: Mail;
  mailSubscription?: Subscription;
  mailDeleteSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private mailsService: MailsService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      this.mailSubscription = this.mailsService.getMail(params.id).subscribe((mail:Mail) => {

        this.mail = mail;
        // console.log(mail);

      }, error => {

        console.log("Error: " + error);
        alert("Sorry! Email details couldn't found!!");
      });

      // console.log(this.mail);
    })
  }

  onDelete(id: string) {

    this.mailDeleteSubscription = this.mailsService.deleteMail(id).subscribe((response: string) => {

      this.mailsService.mailDeletedResponse = "Success! Email has been deleted successfully!!";
      
      this.router.navigate(['/mails']);
    
    }, (error: Error) => {

      console.log(error);
      alert("Sorry! Something went wrong!!\nTry again.");
    });
  }

  ngOnDestroy(): void {
    this.mailSubscription?.unsubscribe();
    this.mailDeleteSubscription?.unsubscribe();
  }

}
