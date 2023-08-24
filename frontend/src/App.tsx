import { router } from "./routes/Routes"
import {RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

function App() {
  
  return (
    <div className="tracking-widest">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App
