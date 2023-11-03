import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import BaseButton from './components/common/BaseButton'

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

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

  const renderView = () => {
    if (postsQuery.isLoading) return <h1>Loading</h1>

    if (postsQuery.isError) return <h1>{JSON.stringify(postsQuery.error)}</h1>

    return (
      <>
        {postsQuery.data.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
        <BaseButton disabled={usePostMutation.isLoading} onClick={() => usePostMutation.mutate('New Post')}>
          ADD POST
        </BaseButton>
      </>
    )
  }

  return <div className='min-w-screen min-h-screen flex justify-center items-center flex-col'>{renderView()}</div>
}

export default App
