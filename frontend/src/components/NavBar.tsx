import {NavLink} from 'react-router-dom'
import React, { useState } from 'react'
import { useDarkMode } from '../utilities/DarkModeContext'

export default function NavBar(){
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    return(
      <div>
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        <button onClick={() => setIsDialogOpen(true)} className="m-3 p-4 text-xl bg-gray-500 hover:bg-gray-600 rounded-md font-medium text-white">Settings</button>
      </nav>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                className="mr-2"
              />
              <span className="text-gray-900 dark:text-gray-300">Dark Mode</span>
            </label>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      </div>
    )
}