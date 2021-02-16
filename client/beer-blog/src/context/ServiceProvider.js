import User from 'models/User.model';
import React from 'react';
import AppService from 'service/app.service';

const appService = new AppService();
const ServiceContext = React.createContext(appService);


export const ServiceProvider = ServiceContext.Provider;
export const ServiceConsumer = ServiceContext.Consumer;
export default ServiceContext;