# GoBarber - Front-End
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app);

This is the front-end of the gobarber application;

It is necessary to have the server running in the background;

All the files and documentation of the server can be reached with this [link](https://github.com/EduardoModel/gobarber);

### How to run?
It is just to type `yarn start` or `npm run start`;

Obs.: it is recommended to have the backend running inside another terminal;

### Details of the application
The web version of the app is only for the providers to check the current appointments that are
booked or open for the customers of the application;

### Utilized libraries
- **Axios**: To make HTTP requests to the API;
- **Date-Fns**: To work with dates and times in a more easily and concise way;
- **History**: To manage the browser history of the application;
- **Immer**: To helps to create a new immutable state for the redux after a change;
- **Polished**: To create some better styles for the components, like color manipulation;
- **Prop-Types**: To make the verification of the props that are been passed to a given component;
- **React-Icons**: To enable some cool styled icons to be used within the application;
- **React-Perfect-Scrollbar**: To create a better scrollbar element within the application;
- **React-Redux**: To bind the Redux state manager with the React application;
- **React-Router-Dom**: To create the navigation between the different pages of the application;
- **React-Toastify**: To call and create toast elements within the DOM;
- **Reactotron-React-Js**: To help to inspect the DOM that is being generated;
- **Reactotron-Redux**: To better visualize the dispatch of the actions to the Redux;
- **Reactotron-Redux-Saga**: To better visualize firing of the side-effects within the application;
- **Redux**: To create and manage a global state for the application;
- **Redux-Persist**: To persist the values saved inside the state;
- **Redux-Saga**: To fire side-effects after an action was dispatched to the Redux;
- **Styled Components**: To create and build logic inside the average HTML elements;
- **Yup**: To validate the schema of a given object (Login form for example);
### Available provider pages:
#### Without authentication
**SignIn**: To authenticate with the application;

**SignUp**: To register inside the application;

#### With authentication
**Dashboard**: To visualize the currently booked appointments for the provider;

**Profile**: To change the profil data, like password and avatar;

### Features to implement
- The access for the non provider users inside the web platform;

- Make possible for the provider to configure the available appointments, like the hours and the
days of the week;
