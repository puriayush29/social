import { UserRegistrationService } from './../user-registration.service';
import { Component, OnInit } from '@angular/core';
import * as google from './google-api';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private service:UserRegistrationService) { }

  ngOnInit() {
    
  }

  baseRequest = {
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods: null,
    transactionInfo: null,
    merchantInfo: null

    
}

 allowedCardNetworks = ["AMEX","DISCOVER","INTERAC","JCB","MASTERCARD","VISA"];

 allowedCardAuthMethods = ["PAN_ONLY","CRYPTOGRAM_3DS"];

 tokenizationSpecification = {
    type:'PAYMENT_GATEWAY',
    parameters: {
        'gateway': 'example',
        'gatewayMerchantId':'example'
    }
   }
     baseCardPaymentMethod = {
        type:'CARD',
        parameters: {
            allowedAuthMethods:this.allowedCardAuthMethods,
            allowedCardNetworks:this.allowedCardNetworks
        }
    }
     cardPaymentMethod = Object.assign(
      {},
      this.baseCardPaymentMethod,
      {
          tokenizationSpecification:this.tokenizationSpecification
      }  
    );
   paymentsClient = null;

   getGoogleIsReadyToPayRequest()
   {
       return Object.assign(
       {},
      this.baseRequest,
       {
           allowedPaymentMethods:[this.baseCardPaymentMethod]
       }
       );
   }
   
    getGooglePayementDataRequest()
             {
                 const paymentDataRequest = Object.assign({},this.baseRequest);
                 paymentDataRequest.allowedPaymentMethods = [this.cardPaymentMethod];
                 paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();
                 paymentDataRequest.merchantInfo = {
                     merchantName:'Example Merchant'
                 };
                 return paymentDataRequest;
             }
              getGooglePaymentsClient()
             {
                 if(this.paymentsClient == null)
                 {
                     this.paymentsClient = new google.payments.api.PaymentsClient({environment:'TEST'});
                     
                 }
                 return this.paymentsClient;
             }
          onGooglePayLoaded()
         {
             const paymentsClient = this.getGooglePaymentsClient();
             paymentsClient.isReadyToPay(this.getGoogleIsReadyToPayRequest())
             .then(function(response){
                 if(response.result){
                     this.addGooglePayButton();
                 }
             })
             .catch(function(err){
                 console.error(err);
             });
         }
         addGooglePayButton()
         {
             const paymentsClient = this.getGooglePaymentsClient();
             const button =
              paymentsClient.createButton({onClick:this.onGooglePaymentButtonClicked});
             document.getElementById('container').appendChild(button);
         }
          getGoogleTransactionInfo()
         {
             return {
                 countryCode:'US',
                 currencyCode:'USD',
                 totalPriceStatus:'FINAL',
                 // set to cart total
                 totalPrice:'1.00'
             };
         }

          prefetchGooglePaymentData()
         {
             const paymentDataRequest = this.getGooglePayementDataRequest();
             // transaction info must be set but does not affect cache
             paymentDataRequest.transactionInfo = {
                 totalPriceStatus:'NOT_CURRENTLY_KNOWN',
                 currencyCode:'USD'
             };
             const paymentsClient = this.getGooglePaymentsClient();
             paymentsClient.prefetchPaymentData(paymentDataRequest);
         }
         onGooglePaymentButtonClicked()
         {
             const paymentDataRequest = this.getGooglePayementDataRequest();
             paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();
             
             const paymentsClient = this.getGooglePaymentsClient();
             paymentsClient.loadPaymentData(paymentDataRequest)
             .then(function(paymentData){
                 // handle the response
                 this.processPayment(paymentData);
             })
             .catch(function(err)
             {
                 // show error in developer console for debugging
                 console.error(err);
             });
         }
          processPayment(paymentData)
         {
             // show returned data in developer console for debugging
             console.log(paymentData);
            //  pass payment token o your gateway to process payment
            let paymentToken = paymentData.paymentMethodData.tokenizationData.token;
         }

  // onPayment(form)
  // {
  //  let response = this.service.doPayment(form.value);
  //  response.subscribe((data)=> console.log(data));

  // }

  
  
}

// function paymentController($scope,$http)
//   {
//     $scope.user = {};
//     $scope.createUser = function()
//     {
//       $http({
//         method:"POST",
//         url:"http://localhost:8070/authorize_payment",
//         headers:{'Content-Type':'application/json'},
//         data: $scope.user
//       }).success(function(data)
//       {
//         $scope.status = data;
//       });
//     };
//   }

         
          
             

     
    
