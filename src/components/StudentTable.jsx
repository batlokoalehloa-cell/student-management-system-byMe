function StudentTable(props) {
  if (props.students.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌕</div>
        <h3>No students found</h3>
        <p>Try another search, or add a new student record.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Student ID</th>
            <th>Age</th>
            <th>Course of study</th>
            <th>Status</th>
            <th className="actions-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map(function (student) {
            return (
              <tr key={student.id}>
                <td>
                  <div className="student-cell">
                    <div className="avatar">{student.fullName.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="student-name">{student.fullName}</div>
                      <div className="student-email">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td><span className="id-label">{student.id}</span></td>
                <td>{student.age}</td>
                <td><span className="course-name">{student.course}</span></td>
                <td><span className={'status status-' + student.status.toLowerCase()}>{student.status}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="text-button edit-button" type="button" onClick={function () { props.onEdit(student); }}>Edit</button>
                    <button className="text-button delete-button" type="button" onClick={function () { props.onDelete(student); }}>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
