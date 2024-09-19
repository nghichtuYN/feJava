import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

const NotFoundComponent = () => {
  return (
    <Container className="text-center mt-5">
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="p-4">
          <Card.Body>
            <FaSearch size={50} className="text-muted mb-3" />
            <Card.Text>
              Không tìm thấy kết quả nào
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default NotFoundComponent