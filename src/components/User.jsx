import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/users/usersSlice';
import { useEffect } from 'react';

const Users = () => {
  const dispatch = useDispatch();
  const { usersList, isLoading, error } = useSelector((state) => state.usersState);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) {
    return <h2>There is an error in loading page: {error}</h2>;
  }

  if (isLoading) {
    return <h2>Page is loading...</h2>;
  }

  return (
    <div>
      <ul>
        {usersList.map((userList) => (
          <li key={userList.cell}>
            { userList.name.title }.
            { ' ' + userList.name.first + ' '}
            { userList.name.last }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
