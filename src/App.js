import './App.css';
import {useEffect, useState} from 'react';
import {getUser} from './api/endpoints';
import {deleteCookie} from './helpers/cookies';

function App({userId, appName, authCookieName}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(userId)
        .then((data) => {
          if (data) {
            setUser(data);
          }
        });
  }, [userId]);

  const onExit = () => {
    deleteCookie(authCookieName);
    location.reload();
  };

  const onAddButtonClick = () => {
    const addButtonClickEvent =
      new CustomEvent('addButtonClick', {detail: {userId}});
    window.dispatchEvent(addButtonClickEvent);
  };

  return (
    <div
      className="grid grid-cols-3 justify-center border-b-2 w-full
      py-2 px-4 items-center">
      <div className="flex justify-start">
        <button onClick={onAddButtonClick}>
          <svg className="h-10 w-10 text-indigo-500"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </button>
      </div>
      <h1 className="font-semibold text-2xl">{appName}</h1>
      <div className="flex items-center justify-end">
        {user?.name && <div className="mr-6">
          {user.name}
        </div>}
        <button
          onClick={onExit}
          className="inline-block px-6 py-2.5 bg-red-500 text-white
          font-medium text-xs leading-tight uppercase rounded shadow-md
          hover:bg-red-500 hover:shadow-lg focus:bg-red-600 focus:shadow-lg
          focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg
          transition duration-150 ease-in-out"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default App;
