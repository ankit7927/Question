import { Route, Routes } from 'react-router-dom'
import ReqAuth from './components/ReqAuth'
import Home from './pages/Home'
import Layout from './pages/Layout'
import NewQuestion from './pages/NewQuestion'
import Profile from './pages/Profile'
import Question from './pages/Question'
import Questions from './pages/Questions'
import Search from './pages/Search'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='search/:query' element={<Search />} />
        <Route path='ques/:questID'>
          <Route index element={<Question />} />
        </Route>
        <Route element={<ReqAuth />}>
          <Route path='new-question' element={<NewQuestion />} />
          <Route path='profile/*' element={<Profile />} />
        </Route>
        <Route path='questions' element={<Questions />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App;
