import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CommentForm from './componients/CommentForm'
import CommentList from './componients/CommentList'
import PostItem from './componients/PostItem'
import PostList from './componients/PostList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CommentForm/>
      <CommentList/>
      <PostItem/>
      <PostList/>
    </>
  )
}

export default App
