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
                      <li className="title">Status</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.detail.status}`}</li>
                    </div>
                  </div>
                </div>
               <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Transaction ID</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.detail.transaction_id}`}</li>
                    </div>
                  </div>
                </div>
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
                      <li className="number-card-from desc">{`${location.state.detail.amount_sdg}`}</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">SENT TO</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.detail.to_card.substring(0,4) + '*'.repeat(location.state.detail.to_card.length-8) + location.state.detail.to_card.substring(location.state.detail.to_card.length-4,location.state.detail.to_card)}  |  ${location.state.banckNameLocal}`}</li>
                    </div>
                  </div>
                </div>
                   <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">Amount in USD</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.detail.amount_usd}`}</li>
                    </div>
                  </div>
                </div>
                  <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title">SENT FROM</li>
                    </div>
                    <div className="col-6">
                      <li className="number-card-from desc">{`${location.state.detail.from_card.replace(/\d{4}(?=\d{4})/g, "**** ")}  |  ${location.state.banckNameInternational}`}</li>
                    </div>
                  </div>
                </div>
                  <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <l className="title" i>Fees in USD</l>
                    </div>
                    <div className="col-6">
                      <li className="desc">{location.state.detail.fee.toFixed(2)} USD</li>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-6">
                      <li className="title"> Date / Time</li>
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
                <button className="btn button-main mr-3" style={{width:'200px'}} onClick={handerStorge}>Another Transfer</button>
                {/* <button className="btn button-main mr-1"><FaShareAlt /> Share</button> */}
                <button className="btn button-secondry" onClick={handerStorge}>CLOSE</button>
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