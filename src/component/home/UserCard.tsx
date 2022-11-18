import styled from "styled-components";
import defaultUserProfile from "assets/images/default-user-profile.jpg";
import { User } from "types";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const { id, userName } = user;

  return (
    <Container>
      <UserProfile src={defaultUserProfile} alt={`user`} />
      <UserInfoBox>
        <UserNameBox>{userName}</UserNameBox>
        <DescriptionBox>{id}</DescriptionBox>
      </UserInfoBox>
    </Container>
  );
};

export default UserCard;

const UserNameBox = styled.div`
  width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #ededed;
  font-weight: 500;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
  max-width: 14rem;
`;

const DescriptionBox = styled.div`
  font-size: 0.8rem;
  color: #999999;
`;

const UserProfile = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.5rem;
`;
