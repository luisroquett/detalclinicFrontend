import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <>
      <footer className="Footer">
        <div className="contactData">
          <h2>Direccion</h2>
          <div>Carrer de La foneria </div>
        </div>
        <div className="contactData">
          <h2>Schedule</h2>
          <div>From Monday to Friday from 9AM to 8:30PM</div>
          </div>
        <div className="contactApponitmen">
          <h2>Contact</h2>
          <div>Phone Number: 684165405</div>
          </div>
      </footer>
    </>
  );
}
