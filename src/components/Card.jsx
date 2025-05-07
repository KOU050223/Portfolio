import "../App.css";
import { Container, Image, Box } from "@chakra-ui/react";

function Card({ img, title, text }) {
  return (
    <Container>
      <Box display="flex" justifyContent="center" width="100%">
        <Image
          fit="cover"
          src={`${img}`}
          alt="NoData"
          maxW="100%"
          maxH="50%"
          margin="0 auto"
        />
      </Box>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </Container>
  );
}

export default Card;