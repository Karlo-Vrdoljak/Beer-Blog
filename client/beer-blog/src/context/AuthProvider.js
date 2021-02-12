import User from 'models/User.model';
import React from 'react';

const user = new User();
const AuthContext = React.createContext(user);


export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;