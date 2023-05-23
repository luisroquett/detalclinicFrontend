import React from "react";
import { Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import "./Home.scss";

export default function Home() {
   return (
      <Container>
         <Row className="mt-5">
            <Col>
               <h1 className="home-title">Welcome to Dental Clinic</h1>
               </Col>
         </Row>
         <Row className="mt-5">
            <Col md={6}>
               <MDBCard className="home-card">
                  <MDBCardBody>
                     <MDBCardTitle>Services</MDBCardTitle>
                     <MDBCardText>
                        At our dental clinic, we offer a wide range of services to take care of your oral health. Our highly skilled professionals will provide you with the best treatment and personalized care.
                     </MDBCardText>
                     <MDBCardImage src="/src/assets/services.jpg" alt="Dentists" position="top" />
                  </MDBCardBody>
               </MDBCard>
            </Col>
            <Col md={6}>
               <MDBCard className="home-card">
                  <MDBCardBody>
                     <MDBCardTitle>Medical Team</MDBCardTitle>
                     <MDBCardText>
                        We have a team of dentists specialized in different areas, including orthodontics, endodontics, periodontics, and oral surgery. Our experts stay updated with the latest techniques and technologies to ensure excellent results.
                     </MDBCardText>
                     <MDBCardImage src="/src/assets/Dentistas.jpg" alt="Dentists" position="top" />
                  </MDBCardBody>
               </MDBCard>
            </Col>
         </Row>
         <Row className="mt-5">
            <Col>
               <h2 className="home-testimonials-title">Testimonials from Our Patients</h2>
               <Carousel className="home-carousel">
                  <Carousel.Item>
                     <MDBCard className="home-testimonial-card">
                        <MDBCardBody>
                           <MDBCardText>
                              "Excellent care and results! I am very satisfied with my orthodontic treatment. The clinic staff is friendly and professional."
                           </MDBCardText>
                           <MDBCardTitle>Dani Molar</MDBCardTitle>
                           <MDBCardTitle tag="h6">Satisfied Patient</MDBCardTitle>
                        </MDBCardBody>
                     </MDBCard>
                  </Carousel.Item>
                  <Carousel.Item>
                     <MDBCard className="home-testimonial-card">
                        <MDBCardBody>
                           <MDBCardText>
                              "Thanks to the dental clinic, my smile has significantly improved. I highly recommend their services. They are the best!"
                           </MDBCardText>
                           <MDBCardTitle>Luis Garganta</MDBCardTitle>
                           <MDBCardTitle tag="h6">Happy Patient</MDBCardTitle>
                        </MDBCardBody>
                     </MDBCard>
                  </Carousel.Item>
               </Carousel>
            </Col>
         </Row>
      </Container>
   );
}







