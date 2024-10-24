import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import {
  Error,
  Home,
  Login,
  Register,
  Profile,
  CreateEvent,
  CreateSpace,
} from '../../pages';

const GitRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<CreateEvent />} />
        <Route path="/space" element={<CreateSpace />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

export default GitRouter;
