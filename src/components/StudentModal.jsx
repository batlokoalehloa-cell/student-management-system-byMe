
import { useEffect, useState } from 'react';

const emptyForm = {
  id: '',
  fullName: '',
  age: '',
  email: '',
  course: '',
  status: 'Enrolled'
};

function StudentModal({ open, student, onClose, onSave }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setForm({
        id: student.id,
        fullName: student.fullName,
        age: String(student.age),
        email: student.email,
        course: student.course,
        status: student.status
      });
    } else {
      setForm({ ...emptyForm });
    }

    setError('');
  }, [student, open]);

  if (!open) return null;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  }

  function validateForm() {
    const { id, fullName, age, email, course, status } = form;

    if (
      !id.trim() ||
      !fullName.trim() ||
      !age.trim() ||
      !email.trim() ||
      !course.trim() ||
      !status
    ) {
      return 'Please complete every field.';
    }

    const ageNumber = Number(age);

    if (!Number.isInteger(ageNumber) || ageNumber < 16 || ageNumber > 100) {
      return 'Age must be a whole number between 16 and 100.';
    }

    return '';
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const studentRecord = {
      id: form.id.trim(),
      fullName: form.fullName.trim(),
      age: Number(form.age),
      email: form.email.trim(),
      course: form.course.trim(),
      status: form.status
    };

    onSave(studentRecord);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">STUDENT RECORD</p>
            <h2 id="student-modal-title">
              {student ? 'Edit student' : 'Add a student'}
            </h2>
          </div>

          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Student ID
              <input
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="e.g. STU1004"
                disabled={Boolean(student)}
              />
            </label>

            <label>
              Full name
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="16"
                max="100"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 21"
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@example.com"
              />
            </label>

            <label className="full-width">
              Course of study
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Enter course name"
              />
            </label>

            <label className="full-width">
              Enrollment status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Deferred">Deferred</option>
                <option value="Graduated">Graduated</option>
              </select>
            </label>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="button button-primary" type="submit">
              {student ? 'Save changes' : 'Add student'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default StudentModal;
