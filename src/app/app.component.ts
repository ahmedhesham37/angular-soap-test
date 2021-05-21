import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as JsonToXML from 'js2xmlparser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-soap-test';
  data: any;

  constructor(private httpClient: HttpClient) {

  }

  soapCall(): void {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://ibmbpm:9443/teamworks/webservices/CIB/InitiateLoanRequest.tws?WSDL', true);


    // xmlhttp.open('POST', '/api/teamworks/webservices/CIB/InitiateLoanRequest.tws?WSDL', true);

    // The following variable contains the xml SOAP request.
    const sr =
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:init="http://CIB/InitiateLoanRequest.tws">
         <soap:Header/>
         <soap:Body>
            <init:initialeLoanRequest>
               <init:loanRequest>
                  <!--Optional:-->
                  <init:customerName>Ahmed Hesham</init:customerName>
                  <!--Optional:-->
                  <init:customerNID>29310012104152</init:customerNID>
                  <!--Optional:-->
                  <init:customerMobileNumber>01144704788</init:customerMobileNumber>
               </init:loanRequest>
            </init:initialeLoanRequest>
         </soap:Body>
      </soap:Envelope>`;

    console.log('222');

    xmlhttp.onreadystatechange = () => {
      console.log('xml ', xmlhttp);
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          // Here I'm getting the value contained by the <return> node.
          // const response_number = parseInt(xml.getElementsByTagName('return')[0].childNodes[0].nodeValue);
          // Print result square number.
          // console.log(response_number);
        }
      }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.responseType = 'document';
    console.log(xmlhttp);
    xmlhttp.send(sr);
  }

  // tslint:disable-next-line:typedef
  soapCall1(): void {
    // The following variable contains the xml SOAP request.

    const url = 'https://ibmbpm:9443/teamworks/webservices/CIB/InitiateLoanRequest.tws?WSDL';
    // const url = '/api';
    // const options = {"headers" : {"Access-Control-Allow-Origin": "*"} , "responseType" : "text" };
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.httpClient.post(url, this.populateXMLObject(), {
      headers,
      responseType: 'text',
    }).subscribe((response) => {
      console.log(response);
    });
  }

  populateXMLObject(): string {

    const loanRequest = {
      'init:customerName': 'Mohamed',
      'init:customerNID': '21453654789654',
      'init:customerMobileNumber': '564798213'
    };
    let data = JsonToXML.parse('init:loanRequest', loanRequest);
    data = data.replace('<?xml version=\'1.0\'?>' , '');
    console.log('data ', data);

    const sr =
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:init="http://CIB/InitiateLoanRequest.tws">
         <soap:Header/>
         <soap:Body>
            <init:initialeLoanRequest>
            `;
    const sr1 = data + `
            </init:initialeLoanRequest>
         </soap:Body>
      </soap:Envelope>`;
    ;

    return  sr + sr1;
  }


}
