import React, { useEffect } from 'react';
import $ from "jquery";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Redirect, useHistory, useLocation } from 'react-router';

const BASE_URL = 'https://api.enayapay.com/api/v2.0/takafully/';

function Confirm() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    $('#loader').fadeOut(5000);
  }, [])
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
            }
          });
        } else if (res.data.status === "failed") {
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
                      <li className="title">From Card</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.from_card}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">To Card</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.to_card}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Name Sender</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.sen_first_name} ${location.state.sen_last_name}`}</li>
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
                      <li className="title">Message</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.rec_message}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <l className="title" i>Cvv</l>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.IPIN}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <l className="title" i>Amount in SDG</l>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.amount}</li>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="col-md-12 button-submit text-right">
                <button className="btn button-secondry mr-1" onClick={cancel}>Cancel</button>
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
