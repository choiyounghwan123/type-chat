import styled from "styled-components";
import UserCard from "component/home/UserCard";
import Search from "assets/svgs/Search";
import useUser from "hooks/useUser";
import useUserList from "hooks/useUserList";

const defaultUser = { userName: "익명의 유저", id: "unknown" };

const EnterUsersBox = () => {
  const { user } = useUser();
  const { users } = useUserList();

  return (
    <>
      <Container>
        <Wrapper>
          <UserCard user={user ?? defaultUser} />
          <SearchBox>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <SearchInput type="text" placeholder={`누구를 찾고 있나요?`} />
          </SearchBox>
          <UserList>
            {users
              .filter(({ userName }) => userName !== user?.userName)
              .map((user) => (
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
  background-color: #3e404c;
  color: #999999;
`;

const SearchIcon = styled.div`
  width: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #3e404c;
  color: #999999;
  font-weight: 600;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 3rem;
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
  background-color: #2b2d36;
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
