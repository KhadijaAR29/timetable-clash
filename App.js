import React from "react";
import { TimetableProvider } from "./context/contextTT";
import UploadTT from "./components/uploadTT";
import UploadRegistration from "./components/uploadRegister";
import ViewTT from "./components/viewTT";

function App() {
  return (
    <TimetableProvider>
      <h1>Timetable Clash System</h1>
      <UploadTT />
      <UploadRegistration />
      <ViewTT />
    </TimetableProvider>
  );
}

export default App;