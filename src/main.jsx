import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Datacontext from './Context/Datacontext.jsx'
import BasketContext from './Context/BasketContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'





createRoot(document.getElementById('root')).render(
<Datacontext>
<BrowserRouter>
<BasketContext>
<AuthProvider>

<App />
</AuthProvider>

</BasketContext>
 </BrowserRouter>
</Datacontext>
)