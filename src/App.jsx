import { NavLink, Outlet } from "react-router-dom"
import NamedLink from "@/components/NamedLink"
import { useAuth } from "@/hooks/useAuth"
// import axios from "axios"

function App() {
  const { isLoggedIn, logout } = useAuth()

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) logout(true)
      return Promise.reject(error)
    }
  )

  function leftGuestLinks() {
    return <>
      <NamedLink name="home">
        Home
      </NamedLink>
    </>
  }

  function leftAuthLinks() {
    <>
      <NamedLink name="parkings.active">
      Parkings
      </NamedLink>
      <NamedLink name="vehicles.index">
        Vehicles
      </NamedLink>
    </>
  }

  function rightGuestLinks() {
    return <>
      <NamedLink name="login">
        Login
      </NamedLink>
      <NamedLink name="register">
        Register
      </NamedLink>
    </>
  }

  function rightAuthLinks() {
    return <>
      <NamedLink name="profile.edit">
        Profile
      </NamedLink>
      <NamedLink name="profile.change-password">
        Change Password
      </NamedLink>
      <button onClick={ logout } type="button" className="text-blue-600">
        Logout
      </button>
    </>
  }

  return (
    <div className="App">
      <header className="py-6 bg-gray-100 shadow">
        <div className="container md:px-2 px-4 mx-auto">
          <nav className="flex gap-4 justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-bold">
                <div className="inline-flex items-center justify-center bg-blue-600 w-6 h-6 text-center text-white rounded mr-1">
                  P
                </div>
                myParking
              </h2>
              {/* <NamedLink name='home'>Home</NamedLink>
              <NamedLink name='vehicles.index'>Vehicles</NamedLink> */}
              { isLoggedIn ? leftAuthLinks() : leftGuestLinks() }
            </div>
            <div className="flex gap-4 items-center">
              {/* <NamedLink name='register'>Register</NamedLink> */}
              { isLoggedIn ? rightAuthLinks() : rightGuestLinks() }
            </div>
          </nav>
        </div>
      </header>
      <div className="container md:px-2 px-4pt-8md:pt-16mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App
