import React, { useState } from 'react';

const defaultState = {
  email: '',
  password: ''
};

const ContextStore = React.createContext(defaultState);

function StoreProvider({ children }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const store = {
    email,
    setEmail,
    password,
    setPassword,
  }

  return (
    <ContextStore.Provider value={store}>
      {children}
    </ContextStore.Provider>
  )
}

export default { StoreProvider, ContextStore };
