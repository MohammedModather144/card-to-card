import moment from 'moment'
import React, { useEffect } from 'react';
import $ from "jquery";
import { Redirect, useHistory, useLocation } from "react-router";
import { FaCheck } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
const Success = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    $('#loader').fadeOut(5000);
  }, [])
  if (location.state) {
    function handerStorge() {
      sessionStorage.clear()
      history.push({
        pathname: '/',
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
            <h2 className="title-header text-capitalize text-center">Successfull Payment</h2>
            <div className="form-info">
              <div className="success text-center">
                <FaCheck />
              </div>
              <ul className="list-unstyled">
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">From</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{location.state.detail.from_card}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">To</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-to desc">{location.state.detail.to_card}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Date & Time</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{moment().format('LLL')}</li>
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
                      <l className="title" i>Amount in SDG</l>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.detail.amount_sdg} SDG</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Amount in USD</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.detail.amount_usd.toFixed(2)} USD</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Fee in USD</li>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.detail.fee.toFixed(2)} USD</li>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="col-md-12 button-submit text-right">
                {/* <button className="btn button-main mr-1"><FaShareAlt /> Share</button> */}
                <button className="btn button-main" onClick={handerStorge}>Done</button>
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

export default Success;