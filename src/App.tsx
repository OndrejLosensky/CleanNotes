import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { NewNote } from "./components/NewNote"

function App() {

  return (
    <React.Fragment>
      <section className="p-8">
        <Routes>
            <Route path="/" element={<h1 className="text-4xl font-bold text-red-500"> Homepage </h1>}/>
            <Route path="/new" element={<h1> <NewNote/> </h1>}/>
            <Route path="/:id">
              <Route index element={<h1> Show </h1>} />
              <Route path="edit" element={<h1> Edit </h1>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </section>
    </React.Fragment>
  )
}

export default App
