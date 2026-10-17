
import { useEffect, useState } from 'react';
import { initialStudents } from './data.js';
import StudentModal from './components/StudentModal.jsx';
import DeleteModal from './components/DeleteModal.jsx';
import StudentTable from './components/StudentTable.jsx';

function App() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('student-management-records');

    if (savedStudents) {
      try {
        return JSON.parse(savedStudents);
      } catch {
        return initialStudents;
      }
    }

    return initialStudents;
  });

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentBeingEdited, setStudentBeingEdited] = useState(null);
  const [studentBeingDeleted, setStudentBeingDeleted] = useState(null);
  const [notice, setNotice] = useState('');

  // Save student records whenever they change.
  useEffect(() => {
    localStorage.setItem(
      'student-management-records',
      JSON.stringify(students)
    );
  }, [students]);

  // Hide notifications after a short time.
  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => {
      setNotice('');
    }, 3500);

    return () => clearTimeout(timer);
  }, [notice]);

  // Search students by name, ID, email or course.
  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      student.fullName.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === 'All statuses' ||
      student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count students who are currently enrolled.
  const isEnrolled = (student) => student.status === 'Enrolled';
  const enrolledCount = students.filter(isEnrolled).length;

  // Add a new student if their ID is not already in use.
  function addStudent(student) {
    const alreadyExists = students.some(
      (currentStudent) =>
        currentStudent.id.toLowerCase() === student.id.toLowerCase()
    );

    if (alreadyExists) {
      setNotice('A student with that ID already exists.');
      return;
    }

    setStudents((currentStudents) => [...currentStudents, student]);
    setStudentModalOpen(false);
    setNotice('Student added successfully.');
  }

  // Update an existing student's details.
  function editStudent(updatedStudent) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );

    setStudentModalOpen(false);
    setStudentBeingEdited(null);
    setNotice('Student details updated.');
  }

  // Remove the selected student.
  function deleteStudent() {
    if (!studentBeingDeleted) return;

    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) => student.id !== studentBeingDeleted.id
      )
    );

    setStudentBeingDeleted(null);
    setNotice('Student deleted.');
  }

  // Open the form for adding a student.
  function openAddModal() {
    setStudentBeingEdited(null);
    setStudentModalOpen(true);
  }

  // Open the form with the selected student's details.
  function openEditModal(student) {
    setStudentBeingEdited(student);
    setStudentModalOpen(true);
  }

  // Close the form and clear the selected student.
  function closeStudentModal() {
    setStudentModalOpen(false);
    setStudentBeingEdited(null);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            S<span>+</span>
          </div>
          <div className="brand-copy">
            <strong>StudentHub</strong>
            <span>ADMINISTRATION</span>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <div className="nav-item active">
          <span className="nav-icon">▦</span>
          Student dashboard
        </div>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <strong>Need a hand?</strong>
            <p>Manage student records from one simple dashboard.</p>
          </div>

          <div className="profile-row">
            <div className="profile-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>System manager</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Students</strong>
          </div>

          <div className="topbar-right">
            <span className="online-dot"></span>
            Student records
            <span className="topbar-date">Management portal</span>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h1>Student dashboard</h1>
              <p className="page-subtitle">
                Manage student information, enrollment, and records.
              </p>
            </div>

            <button
              className="button button-primary add-button"
              type="button"
              onClick={openAddModal}
            >
              <span>＋</span> Add student
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Total students</span>
                <span className="stat-icon icon-purple">♙</span>
              </div>
              <div className="stat-number">{students.length}</div>
              <div className="stat-caption">
                Student records in the system
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Currently enrolled</span>
                <span className="stat-icon icon-green">✓</span>
              </div>
              <div className="stat-number">{enrolledCount}</div>
              <div className="stat-caption">
                Active enrollment status
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Other statuses</span>
                <span className="stat-icon icon-amber">◷</span>
              </div>
              <div className="stat-number">
                {students.length - enrolledCount}
              </div>
              <div className="stat-caption">
                Deferred or graduated
              </div>
            </div>
          </div>

          <section className="records-panel">
            <div className="records-heading">
              <div>
                <h2>All students</h2>
                <p>View and manage each student record.</p>
              </div>

              <span className="record-count">
                {filteredStudents.length}{' '}
                {filteredStudents.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            <div className="filters-row">
              <label className="search-box">
                <span>⌕</span>
                <input
                  type="search"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by name, ID, email or course..."
                  aria-label="Search students"
                />
              </label>

              <select
                className="status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by enrollment status"
              >
                <option>All statuses</option>
                <option>Enrolled</option>
                <option>Deferred</option>
                <option>Graduated</option>
              </select>
            </div>

            <StudentTable
              students={filteredStudents}
              onEdit={openEditModal}
              onDelete={setStudentBeingDeleted}
            />

            <div className="table-footer">
              Showing <strong>{filteredStudents.length}</strong> of{' '}
              <strong>{students.length}</strong> student records
              <span>Changes save automatically in this browser.</span>
            </div>
          </section>

          <footer className="page-footer">
            StudentHub <span>•</span> Student Management System
          </footer>
        </section>
      </main>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      <StudentModal
        open={studentModalOpen}
        student={studentBeingEdited}
        onClose={closeStudentModal}
        onSave={studentBeingEdited ? editStudent : addStudent}
      />

      <DeleteModal
        student={studentBeingDeleted}
        onCancel={() => setStudentBeingDeleted(null)}
        onConfirm={deleteStudent}
      />
    </div>
  );
}

export default App;
