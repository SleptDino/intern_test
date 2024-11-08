import React from 'react';
import LeaveRequestForm from './components/leaveRequestForm';
import LeaveRequestList from './components/leaveRequestList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>ระบบจัดการการลาหยุด</h1>
      </header>
      <main>
        <section>
          <h2>คำขอลาหยุดใหม่</h2>
          <LeaveRequestForm />
        </section>
        <section>
          <h2>รายการคำขอลาหยุด</h2>
          <LeaveRequestList />
        </section>
      </main>
    </div>
  );
}

export default App;
