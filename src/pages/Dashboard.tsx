import { Button } from '../components/Button'
import PlusIcon from '../icons/PlusIcon'
import { Card1 } from '../components/Card3D'
import CreateContent from '../components/Create'
import { useEffect, useState } from 'react'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { YtIcon } from '../icons/yt'
import { TwitterIcon } from '../icons/twitter'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, setContents, refresh } = useContent()
  const navigate = useNavigate()

  async function fetchUserInfo() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user`, { withCredentials: true })
      //@ts-ignore
      const userI = response.data // This contains the user info
    } catch (error) {
      console.error('Error fetching user info:', error)
      navigate('/signup')
      return null
    }
  }

  async function logout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true })
      if (response.status === 200) {
        // Display a success message (e.g., using a modal or toast)
        console.log('Successfully Logged Out.')
        navigate('/signin')
        alert('Logged Out , Signin again')
      }
    } catch (error) {
      console.error('Logout failed:', error)
      // Display an error message
    }
  }

  // refresh when u click the cross icon

  useEffect(() => {
    refresh()
    fetchUserInfo()
  }, [modalOpen])

  function handleDelete(link: string) {
    setContents((prevContents) =>
      //@ts-ignore
      prevContents.filter((content) => content.link !== link)
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-law via-ren to-cium
        before:absolute before:left-[5%] before:top-[5%] before:h-[60%] before:w-[60%] before:animate-blob before:origin-center
        before:bg-red-200 before:rounded-full before:blur-[80px] before:brightness-125
        after:absolute after:right-[5%] after:bottom-[10%] after:h-[60%] after:w-[60%] after:animate-blob-reverse after:origin-center
        after:bg-purple-600 after:rounded-full after:blur-[80px] after:brightness-125"
      ></div>

      <div className="relative z-10 flex flex-col h-full w-full overflow-x-hidden overflow-y-auto">
        <div
          id="Navbar"
          className="fixed p-2 top-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] bg-black/50 backdrop-blur-lg bg-opacity-60 pt-3 z-50 px-5 flex justify-between items-center rounded-b-2xl shadow-lg border border-gray-600"
        >
          {/* Left Side - Logo */}
          <div id="leftSide">
            <img className="h-10 mb-2" src="https://i.imgur.com/pybaxR6.png" alt="logo" />
          </div>

          {/* Right Side - Buttons */}
          <div id="rytSide" className="flex space-x-4">
            <Button
              onclick={() => setModalOpen(true)}
              variant="secondary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />

            <button
              onClick={logout}
              className="relative m-2 mt-0 w-24 inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Logout
              </span>
            </button>
          </div>
        </div>

        <div className="p-4 min-h-screen pt-15">
          <CreateContent
            open={modalOpen}
            onclose={() => {
              setModalOpen(false)
            }}
          />

          <div className="flex justify-end"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {contents.length === 0 ? (
              <div className="text-4xl h-screen w-screen sm:text-7xl font-bold flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-slate-600">
                No data to show Start Creating One
              </div>
            ) : (
              //@ts-ignore
              contents.map(({ title, link, type, _id, userId }) => (
                <div key={_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                  <Card1
                    onDelete={handleDelete}
                    type={type}
                    //@ts-ignore
                    link={link}
                    keyId={userId}
                    keyy={_id}
                    appIcon={type === 'youtube' ? <YtIcon /> : <TwitterIcon />}
                    title={title}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}