import styled from "styled-components";
import { User } from "types";
import UserCard from "component/home/UserCard";
import Search from "assets/svgs/Search";

interface Props {
  myUser: User;
  otherUsers: User[];
}

const EnterUsersBox = ({ myUser, otherUsers }: Props) => {
  return (
    <>
      <Container>
        <Wrapper>
          <UserCard user={myUser} />
          <SearchBox>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <SearchInput type="text" placeholder={`누구를 찾고 있나요?`} />
          </SearchBox>
          <UserList>
            {otherUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </UserList>
        </Wrapper>
      </Container>
    </>
  );
};

export default EnterUsersBox;

const SearchInput = styled.input`
  width: calc(100% - 2rem);
  height: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const SearchIcon = styled.div`
  width: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 2rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
`;

const UserList = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 20rem;
  background-color: #f5f5f5;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 20rem;
`;
