import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { AllUsersPage } from './pages/AllUsersPage'
import { BasesPage } from './pages/BasesPage'
import { FilterSpousesPage } from './pages/SpousesByBase'
import { BaseResultsPage } from './pages/BaseResultsPage'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
           {
            index:true,
            element: <HomePage/>
           },
           {
            path: 'profile',
            element:<ProfilePage/>
           },
           {
            path: 'allusers',
            element:<AllUsersPage/>
           },
           {
            path: 'allbases',
            element: <BasesPage/>
           },
           {
            path: 'filter/:base',
            element: <FilterSpousesPage/>
           },
           {
            path: 'results/:base',
            element: <BaseResultsPage/>
           }

        ]
    }
])