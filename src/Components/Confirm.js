import React, { useEffect, useState } from 'react';
import $ from "jquery";
import moment from 'moment'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Redirect, useHistory, useLocation } from 'react-router';

const BASE_URL = 'https://api.enayapay.com/api/v2.0/takafully/';

function Confirm() {
  const history = useHistory();
  const location = useLocation();
  const [banckNameLocal, setBankNameLocal] = useState();
  const [banckNameInternational, setBankNameInternational] = useState();
  const [feesUsd, setFeesUsd] = useState();
  // const [cardNumberReceiver, setCardNumberReceiver] = useState();
  // const [dollerPrice, setDollerPrice] = useState();
 function getTypeCard(cardNumber){
 const data_from = {
        "pan": cardNumber
      }
    axios.post("https://api.enayapay.com/api/v2.0/get_pan_info/", data_from, {
        headers: {
          'x-api-key': 'b6c0d5e7-c4b0-410e-a8f6-2b810fea9c44',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJha2hlZXQiLCJleHBpcnkiOiIyMDIxLTAyLTI0In0.3B3fsI3gWvV2Uks9NOx4UeeJNatJAvizrM5A0vaAjgw',
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (res.data.status === "success") {
          if (res.data.card_type === "Local") {
           setBankNameLocal(res.data.banck_name)
          }
          else if(res.data.card_type==="International"){
           setBankNameInternational(res.data.card_info.scheme)
          }
        } else if (res.data.status === "failed") {
        }
    })
    }
  useEffect(() => {
    $('#loader').fadeOut(5000);
  if (location.state) {
    let fees =((parseInt(location.state.amount_sud)* 5) / 100 + .5 )
    setFeesUsd(fees)
        getTypeCard(location.state.from_card)
        getTypeCard(location.state.to_card)
        }
   }, []);

  if (location.state) {
  
    const sendPyament = (e) => {
      e.preventDefault();
      $('#loader').fadeIn();
      const data = {
        "from_card": location.state.from_card,
        "to_card": location.state.to_card,
        "IPIN": location.state.IPIN,
        "send_email": location.state.send_email,
        "phone_number": location.state.phone_number,
        "expiration_date": location.state.expiration_date,
        "rec_email": location.state.rec_email,
        "platform": "web",
        "sen_first_name": location.state.sen_first_name,
        "sen_last_name": location.state.sen_last_name,
        "rec_first_name": location.state.rec_first_name,
        "rec_last_name": location.state.rec_last_name,
        "rec_phone_number": location.state.rec_phone_number,
        "amount": location.state.amount,
        "rec_message": location.state.rec_message,
        "UUID": uuidv4()
      }
      axios.post(BASE_URL, data, {
        headers: {
          'x-api-key': 'b6c0d5e7-c4b0-410e-a8f6-2b810fea9c44',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJha2hlZXQiLCJleHBpcnkiOiIyMDIxLTAyLTI0In0.3B3fsI3gWvV2Uks9NOx4UeeJNatJAvizrM5A0vaAjgw',
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (res.data.status === "Successful") {
          $('#loader').fadeOut(2000);
          sessionStorage.setItem("takafully", "UserLogin");
          history.push({
            pathname: '/success',
            state: {
              detail: res.data,
              rec_message: location.state.rec_message,
              phone_number: location.state.phone_number,
              sen_first_name: location.state.sen_first_name,
              sen_last_name: location.state.sen_last_name,
              rec_first_name: location.state.rec_first_name,
              rec_last_name: location.state.rec_last_name,
              rec_phone_number: location.state.rec_phone_number,
              banckNameLocal: banckNameLocal,
              banckNameInternational: banckNameInternational
            }
          });
        } else if (res.data.status === "failed") {
          sessionStorage.setItem("takafully", "UserLogin");
          $('#loader').fadeOut(2000);
          history.push({
            pathname: '/worng',
            state: {
              error: res.data.reason,
              from_card: location.state.from_card,
              to_card: location.state.to_card,
              IPIN: location.state.IPIN,
              send_email: location.state.send_email,
              phone_number: location.state.phone_number,
              expiration_date: location.state.expiration_date,
              rec_email: location.state.rec_email,
              sen_first_name: location.state.sen_first_name,
              sen_last_name: location.state.sen_last_name,
              rec_first_name: location.state.rec_first_name,
              rec_last_name: location.state.rec_last_name,
              rec_phone_number: location.state.rec_phone_number,
              amount: location.state.amount,
              rec_message: location.state.rec_message,
              banckNameLocal: banckNameLocal,
              banckNameInternational: banckNameInternational,
              UUID: uuidv4()
            }
          });
        }
      })
    }
    function cancel() {
      history.push({
        pathname: '/'
      });
    }
    return (
      <>
        <div className="nav-header">
          <div className="container">
            <div className="logo">
              <img src="img/Final-logo.svg" alt="images logo enayPay" />
            </div>
          </div>
        </div>
        <div className="personal-information succces text-left">
          <div className="container">
            <h2 className="title-header text-capitalize text-center">Confirm Payment</h2>
            <div className="form-info">
              <ul className="list-unstyled">
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">From</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.sen_first_name} ${location.state.sen_last_name}   |  ${location.state.phone_number}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">To</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.rec_first_name} ${location.state.rec_last_name}   |  ${location.state.rec_phone_number}`}</li>
                    </div>
                  </div>
                </div>
                  <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Amount in SDG</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.amount}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">SENT TO</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.to_card.substring(0,4) + '*'.repeat(location.state.to_card.length-8) + location.state.to_card.substring(location.state.to_card.length-4,location.state.to_card.length)}  |  ${banckNameLocal}`}</li>
                    </div>
                  </div>
                </div>
                   <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Amount in USD</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.amount_sud.toFixed(2)}`}</li>
                    </div>
                  </div>
                </div>
                  <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">SENT FROM</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.from_card.replace(/\d{4}(?=\d{4})/g, "**** ")}  |  ${banckNameInternational}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Name Receiver</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.rec_first_name} ${location.state.rec_last_name}`}</li>
                    </div>
                  </div>
                </div>
                  <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Fees in USD</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{feesUsd}</li>
                    </div>
                  </div>
                  </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <l className="title" i> Date / Time</l>
                    </div>
                    <div className="col-6">
                      <li className="desc">{moment().format('LLL')}</li>
                    </div>
                  </div>
                </div>
                 <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Sender’s Message</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.rec_message}</li>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="col-md-12 button-submit text-right">
                <button className="btn button-secondry mr-3" onClick={cancel}>Cancel</button>
                <button className="btn button-main" onClick={sendPyament}>Send</button>
              </div>
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
  } else {
    sessionStorage.clear()
    return (
      <Redirect to="/" />
    )
  }
}

export default Confirm
