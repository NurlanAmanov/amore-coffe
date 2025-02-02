
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Datacontext from './Context/Datacontext.jsx'

createRoot(document.getElementById('root')).render(
<Datacontext>

<BrowserRouter>
     <App />
 </BrowserRouter>
</Datacontext>
)
