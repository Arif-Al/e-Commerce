import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import PageNotFound from './components/page-not-found/PageNotFound';
import Header from './components/Layout/Header';

function App() {
  const router = createBrowserRouter([
    {  path: "/", element: <Header />,
       errorElement: <PageNotFound />  },
    { 
       path: "/sign-in", element: <SignIn /> 
       },
    { 
       path: "/sign-up", element: <SignUp />
       },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
