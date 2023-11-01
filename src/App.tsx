//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import BaseButton from './components/common/BaseButton'

//interface Student<T, Y> {
//  id: number
//  name: string
//  class: T
//  phone: Y | number
//}

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

//const lamBeo: Student<number | string, object> = {
//  id: 1,
//  name: 'lam beo',
//  class: 'agaga',
//  phone: { id: 1 }
//}
//const { pokemon } = useSelector(selectAllPokemonState)
//const dispatch = useDispatch()

//useEffect(() => {
//dispatch(fetchPokemon() as any)
//}, [])

//const addID = <T extends object & Partial<Student<string, null>>>(obj: T) => {
//  return {
//    ...obj,
//    id: new Date().toString()
//  }
//}

function wait(duration: number | string) {
  return new Promise((resolve) => setTimeout(resolve, +duration))
}

function App() {
  const queryClient = useQueryClient()
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  const usePostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => {
        return POSTS.push({ id: Math.random(), title })
      }),

    onSuccess: () => queryClient.invalidateQueries(['posts'])
  })

  if (postsQuery.isLoading) return <h1>Loading</h1>
  if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>

  return (
    <>
      <h1>YEU THU TRANG </h1>
      {postsQuery.data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      <BaseButton disabled={usePostMutation.isLoading} onClick={() => usePostMutation.mutate('New Post')} $primary>
        ADD POST
      </BaseButton>
    </>
  )
  //return (
  //  <>
  //    <div>
  //      <a href='https://vitejs.dev' target='_blank'>
  //        <img src={viteLogo} className='logo' alt='Vite logo' />
  //      </a>
  //      <a href='https://react.dev' target='_blank'>
  //        <img src={reactLogo} className='logo react' alt='React logo' />
  //      </a>
  //    </div>
  //    <h1>Vite + React</h1>
  //    <BaseButton $primary>BUTTON SIU CAP VIPPRO</BaseButton>
  //  </>
  //)
}

export default App
