
import { Auth } from './Components/Auth/Auth';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Components/Navigator/Navigator';

export default function App() {

  return (
    <Auth>
      {/* <Navigator /> */}
        <Navigator />
    </Auth>
  );
}


