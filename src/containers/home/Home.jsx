import React from "react";
import { Button, Container, Row, Col, Card, CardGroup, Carousel } from "react-bootstrap";
import "./Home.scss";

export default function Home() {
   return (
      <Container>
         <Row className="mt-5">
            <Col>
               <h1 className="home-title">Welcome to Dental Clinic</h1>
               <Button variant="primary">Schedule an Appointment</Button>
            </Col>
         </Row>
         <Row className="mt-5">
            <Col md={6}>
               <Card className="home-card">
                  <Card.Body>
                     <Card.Title>Services</Card.Title>
                     <Card.Text>
                        At our dental clinic, we offer a wide range of services to take care of your oral health. Our highly skilled professionals will provide you with the best treatment and personalized care.
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={6}>
               <Card className="home-card">
                  <Card.Body>
                     <Card.Title>Medical Team</Card.Title>
                     <Card.Text>
                        We have a team of dentists specialized in different areas, including orthodontics, endodontics, periodontics, and oral surgery. Our experts stay updated with the latest techniques and technologies to ensure excellent results.
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
         <Row className="mt-5">
            <Col>
               <h2 className="home-testimonials-title">Testimonials from Our Patients</h2>
               <Carousel className="home-carousel">
                  <Carousel.Item>
                     <Card className="home-testimonial-card">
                        <Card.Body>
                           <Card.Text>
                              "Excellent care and results! I am very satisfied with my orthodontic treatment. The clinic staff is friendly and professional."
                           </Card.Text>
                           <Card.Title>Dani Molar</Card.Title>
                           <Card.Subtitle>Satisfied Patient</Card.Subtitle>
                        </Card.Body>
                     </Card>
                  </Carousel.Item>
                  <Carousel.Item>
                     <Card className="home-testimonial-card">
                        <Card.Body>
                           <Card.Text>
                              "Thanks to the dental clinic, my smile has significantly improved. I highly recommend their services. They are the best!"
                           </Card.Text>
                           <Card.Title>Luis Garganta</Card.Title>
                           <Card.Subtitle>Happy Patient</Card.Subtitle>
                        </Card.Body>
                     </Card>
                  </Carousel.Item>
               </Carousel>
            </Col>
         </Row>
      </Container>
   );
}
