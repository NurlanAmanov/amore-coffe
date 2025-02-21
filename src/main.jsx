import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Datacontext from './Context/Datacontext.jsx';
import BasketContext from './Context/BasketContext.jsx';
import { ContactProvider } from './Context/ContactContext.jsx';
import { UserAuthProvider } from './Context/AuthRegstr.jsx';
import { CustomAuthProvider } from './Context/Authlogin.jsx';
import CabinetDatam from './Context/CabinetContext.jsx';
import LikeContext from './Context/LikeContext.jsx';
import { Elements } from '@stripe/react-stripe-js'; // Elements provider-i
import { loadStripe } from '@stripe/stripe-js'; // Stripe Publishable Key

// Stripe Publishable Key əlavə edin
const stripePromise = loadStripe('pk_test_51Qv0XND5MZObdgz7LhjLugfsVswdh94jqdtp8h18nslNTKN7oaK46Wej6PVaracVZg1REMLPk0pjhGhIaip55ac500TKpT4RQW');

createRoot(document.getElementById('root')).render(
  <Datacontext>
    <BrowserRouter>
      <BasketContext>
        <ContactProvider>
          <UserAuthProvider>
            <CustomAuthProvider>
              <CabinetDatam>
                <LikeContext>
                  {/* Stripe Elements provider-i əlavə edin */}
                  <Elements stripe={stripePromise}>
                    <App />
                  </Elements>
                </LikeContext>
              </CabinetDatam>
            </CustomAuthProvider>
          </UserAuthProvider>
        </ContactProvider>
      </BasketContext>
    </BrowserRouter>
  </Datacontext>
);