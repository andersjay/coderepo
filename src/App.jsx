import { ToastContainer } from 'react-toastify'
import { ListRepo } from './components/ListRepo'
import {GlobalStyle} from './GlobalStyels'

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  

  return (
    <>
      <ListRepo/>
      <GlobalStyle/>
      <ToastContainer/>
    </>
  )
}

export default App
