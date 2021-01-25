import React, { useEffect } from 'react';
import $ from "jquery";
import axios from 'axios';
import { Redirect, useHistory, useLocation } from 'react-router';
import { VscError } from "react-icons/vsc";
const BASE_URL = 'https://api.enayapay.com/api/v2.0/takafully/';


function Worng() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    $('#loader').fadeOut(5000);
  }, [])
  if (location.state) {
    const tryAgin = (e) => {
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
        "UUID": location.state.UUID
      }
      axios.post(BASE_URL, data, {
        headers: {
          'x-api-key': 'b6c0d5e7-c4b0-410e-a8f6-2b810fea9c44',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJha2hlZXQiLCJleHBpcnkiOiIyMDIxLTAyLTI0In0.3B3fsI3gWvV2Uks9NOx4UeeJNatJAvizrM5A0vaAjgw',
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (res.data.status === "success") {
          $('#loader').fadeOut(2000);
          sessionStorage.setItem("takafully", "UserLogin");
          // console.log( res.data.enaya_response.responseCode)
          // console.log( res.data.enaya_response.toCard)
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
              UUID: location.state.UUID,
            }
          });
        }
      })
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
        <section id="contact" className="error section-padding ">
          <div className="container">
            <div className="row  justify-content-center contact-form-area wow  p-4 fadeInUp" data-wow-delay="0.3s">
              <div className="col-md-4 services-item bg-danger wrong">
                <div className="description text-center p-3">
                  <h1 className="text-white">Something Wrong</h1>
                </div>
                <div className="icon text-center">
                  <VscError className=" p-icon position-relative text-white rounded-circle"></VscError>
                </div>
                <p className="lead text-white mt-5">{location.state.error}</p>
                <div className="row justify-content-center mt-5">
                  <div className="col-12 text-center">
                    <a href="">
                      <h2 className="text-white" onClick={(e) => tryAgin(e)}>Try Again</h2>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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


export default Worng
