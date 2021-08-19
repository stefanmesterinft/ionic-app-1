import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public allContacts: any

  constructor(private contacts: Contacts) {}

  ngOnInit() {
    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'],{multiple: true}).then(contacts => {
      console.log(contacts);
      this.allContacts = contacts;
    })
  }

}
