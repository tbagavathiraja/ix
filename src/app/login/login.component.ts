import { Component, OnInit } from '@angular/core';
import '/home/ionixx/WebstormProjects/ix-coin/src/assets/js/crowdsale.js';
declare var crowdsale: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor () { }

  ngOnInit () {
    console.log('initialized...');
    /*console.log(crowdsale());*/
/*    crowdsale.func1();
    crowdsale.showAcc();*/
  }

}
