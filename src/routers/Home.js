import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks"
import Movie from "../components/Movie";
import styled from "styled-components";
const GET_MOVIES = gql`{
    movies{
        id
        medium_cover_image
        isLiked @client 
    }
}`;
//@client -> client에 isLiked가 있다고 알림 백엔드에 등록
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  font-size: 35px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;
const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

export default () => {
    const {loading, data} = useQuery(GET_MOVIES);
    return (
        <Container>
          <Header>
            <h1>Apollo 2020</h1>
            <Subtitle>I love GraphQL</Subtitle>
          </Header>
          {loading && <Loading>Loading...</Loading>}
            <Movies>
                {data?.movies?.map(m => (
                    <Movie key={m.id} id={m.id} isLiked={m.isLiked} bg={m.medium_cover_image} />
                ))}
            </Movies>
        </Container>
      );
    
}