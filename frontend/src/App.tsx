import React from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import { DarkModeProvider } from './utilities/DarkModeContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
  <DarkModeProvider>
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Router>
        <EntryProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries/>}>
            </Route>
            <Route path="create" element={<NewEntry/>}>
            </Route>
            <Route path="edit/:id" element={<EditEntry/>}>
            </Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  </DarkModeProvider>
    
  );
}
