
import React, { useEffect, useState } from 'react';
import $ from "jquery";
import moment from 'moment'
import { useHistory } from 'react-router';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import axios from 'axios';

const BASE_URL_Doller = 'https://api.enayapay.com/api/v2.0/get_rate/';
const Home = () => {
  const history = useHistory();
  // const [Login, setIsLogin] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [firstNameSender, setFirstNameSender] = useState();
  const [lastNameSender, setLastNameSender] = useState();
  const [phoneSender, setPhoneSender] = useState();
  const [emailSender, setEmailSender] = useState("null");
  const [cardNumberSender, setCardNumberSender] = useState();
  const [expiryDateSender, setExpiryDateSender] = useState();
  const [amount, setAmount] = useState();
  const [cvv, setCvv] = useState();
  const [firstNameReceiver, setFirstNameReceiver] = useState();
  const [lastNameReceiver, setLastNameReceiver] = useState();
  const [phoneReceiver, setPhoneReceiver] = useState();
  const [emailReceiver, setEmailReceiver] = useState("null");
  const [cardNumberReceiver, setCardNumberReceiver] = useState();
  const [dollerPrice, setDollerPrice] = useState();
  const [message, setMessage] = useState();
  const [dollar, setDollar] = useState();
  useEffect(() => {
    $('#loader').fadeOut(5000);
    const data = {
      "from_card": "dfghjkl;lkjhgf",
    }
    axios.post(BASE_URL_Doller, data, {
      mode: "cors",
      headers: {
        'x-api-key': 'b6c0d5e7-c4b0-410e-a8f6-2b810fea9c44',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJha2hlZXQiLCJleHBpcnkiOiIyMDIxLTAyLTI0In0.3B3fsI3gWvV2Uks9NOx4UeeJNatJAvizrM5A0vaAjgw',
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      setDollerPrice(res.data.rate)
    })

  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    if(dollar<10){

    }else if(dollar>1000){

    }else{
    history.push({
      pathname: '/confirm',
      // search: '?query=abc',
      state: {
        from_card: cardNumberSender,
        to_card: cardNumberReceiver,
        IPIN: cvv,
        send_email: emailSender,
        phone_number: phoneSender,
        expiration_date: expiryDateSender,
        rec_email: emailReceiver,
        sen_first_name: firstNameSender,
        sen_last_name: lastNameSender,
        rec_first_name: firstNameReceiver,
        rec_last_name: lastNameReceiver,
        rec_phone_number: phoneReceiver,
        amount: amount,
        rec_message: message,
        amount_sud: dollar,
      }
    });
    }
  }
  return (
    <>
      <div className="nav-header">
        <div className="container">
          <div className="logo">
            <img src="img/Final-logo.svg" alt="logo" />
          </div>
        </div>
      </div>
      <div className="personal-information text-center">
        <div className="container">
          <div className="form-info">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="row">
                <div className="col-md-6 left" style={{ backgroundColor: '#C7EDFF' }}>
                  <h2 className="title-header text-capitalize">Sender Information</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first-name-sender">First Name</label>
                        <input type="text" id="first-name-sender" className="form-control" placeholder="Enter First Name" required
                          pattern="[A-Za-z]{3,20}"
                          onChange={e =>
                            setFirstNameSender(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last-name-sender">Last Name</label>
                        <input type="text" id="last-name-sender" className="form-control" placeholder="Enter Last Name" required
                          pattern="[A-Za-z]{3,20}"
                          onChange={e =>
                            setLastNameSender(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone-number-sender">Phone</label>
                        <IntlTelInput
                         pattern="[0-9]{10}"
                          size="12"
                          maxLength="12"
                          placeholder="Enter Phone Number"
                          required
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          preferredCountries={['us']}
                          containerClassName="intl-tel-input"
                          inputClassName="form-control"
                          onPhoneNumberChange={(status, value, countryData, number, id) => {
                            setPhoneSender(number)
                            setErrorMessage('')
                            $("input[type='tel']").attr("maxlength", "10")
                           
                          }}
                        >
                        </IntlTelInput>
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email-sender">Email <span className="text-secondary">(Optional)</span></label>
                        <input type="email" id="email-sender" className="form-control" placeholder="Enter E-mail"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          onChange={e =>
                            setEmailSender(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="card-number-sender">Card Number</label>
                        <input type="tel" id="card-number-sender" className="form-control" maxLength="19" minLength="19" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          onChange={
                            e => {
                              var foo = e.target.value.split("-").join(""); // remove hyphens
                              if (foo.length > 0) {
                                foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
                              }
                              setCardNumberSender(e.target.value)
                              e.target.value = foo
                            }
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="expiry-date">Expiry Date</label>
                        <input type="tel" id="expiry-date" className="form-control" placeholder="MM/YY" maxLength="5" required 
                          onChange={e =>{
                          e.target.value=e.target.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')
                            setExpiryDateSender(e.target.value.replace(/\//g, ''))
                          }
                          } />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="amount">Payment Amount SDG</label>
                        <div class="amount-parent">
                        <input type="tel" id="amount" className="form-control" placeholder="0" required maxLength="6"
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          onChange={
                            e => {
                              if (e.target.value > 0) {
                                let amount = e.target.value;
                                let finalAmount = amount / dollerPrice;
                                $('.dollar').removeClass('d-none');
                                $('.dollar').html('The Transfer Dollar is ' + finalAmount.toFixed(2) + ' USD')
                                $('.rsevie').removeClass('d-none')
                                if (finalAmount<5 && finalAmount >0 ) {
                                 $('.check') .html('Transfer amount must be at least $5')
                                $('.check').removeClass('d-none');
                                }else if(finalAmount>3000){
                                 $('.check') .html('Transfer limit is $3000.00')
                                $('.check').removeClass('d-none');
                                }else{
                                $('.check').addClass('d-none');
                                }
                              setDollar(finalAmount)
                              }else{
                                $('.check').addClass('d-none');
                                $('.dollar').addClass('d-none');
                              setAmount()
                              setDollar()
                              }
                              setAmount(e.target.value)
                            }
                          } />
                           <div class="amount">
                            <p>SDG</p>
                        </div>
                        <span class="dot">.00</span>
                        </div>
                        <p className="doller dollar d-none ">The Transfer Dollar is 0 USD</p>
                        <p className="with-errors check d-none "></p>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input type="password" id="cvv" className="form-control" placeholder="" maxLength="4" minLength="3" required
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          onChange={
                            e =>
                              setCvv(e.target.value)
                          } />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 rsevie d-none right" style={{ backgroundColor: '#D2FCDC' }}>
                  <h2 className="title-header text-capitalize">Receiver Information</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first-name-receiver">First Name</label>
                        <input type="text" id="first-name-receiver" className="form-control" placeholder="Enter First Name" required
                          pattern="[A-Za-z]{3,20}"
                          onChange={e =>
                            setFirstNameReceiver(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last-name-receiver">Last Name</label>
                        <input type="text" id="last-name-receiver" className="form-control" placeholder="Enter Last Name" required
                          pattern="[A-Za-z]{3,20}"
                          onChange={e =>
                            setLastNameReceiver(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone-number-receiver">Phone</label>
                        <IntlTelInput
                          pattern="[0-9]*"
                          required
                          placeholder="Enter Phone Number"
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          preferredCountries={['sd']}
                          containerClassName="intl-tel-input"
                          inputClassName="form-control"
                          onPhoneNumberChange={(status, value, countryData, number, id) => {
                            // console.log('onPhoneNumberBlur value', value + "  " + number);
                            $("input[type='tel']").attr("maxlength", "10")
                            setPhoneReceiver(number)
                            setErrorMessage('')
                          }}
                        >
                        </IntlTelInput>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email-receiver">Email <span className="text-secondary">(Optional)</span></label>
                        <input type="email" id="email-receiver" className="form-control" placeholder="Enter E-mail"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          onChange={e =>
                            setEmailReceiver(e.target.value)
                          } />
                        <span></span>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="card-number-receiver">Card Number</label>
                        <input type="tel" id="card-number-receiver" className="form-control" minLength="19" maxLength="19" placeholder="xxxx-xxxx-xxxx-xxxx"
                          pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                          onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                          onChange={
                            e => {
                              var foo = e.target.value.split("-").join(""); // remove hyphens
                              if (foo.length > 0) {
                                foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
                              }
                              setCardNumberReceiver(e.target.value)
                              e.target.value = foo
                            }
                          } />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="form-group">
                        <label htmlFor="card-number-receiver">Message</label>
                        <textarea className="form-control" rows="5" maxLength="70" placeholder="Enter Message" required
                          onChange={e =>
                            setMessage(e.target.value)
                          }></textarea>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="error">{errorMessage}</p>
              <div className="col-md-12 button-submit text-right">
                <button className="btn button-main">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="loader">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    </>
  )

}
export default Home;
