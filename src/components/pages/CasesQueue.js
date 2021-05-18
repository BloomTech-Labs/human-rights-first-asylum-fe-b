import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const CasesQueue = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/cases/unapproved-cases`, {
        headers: {
          Authorization: 'Bearer ' + user.authState.idToken.idToken,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user.authState.idToken.idToken]);

  return <div></div>;
};
export default CasesQueue;
