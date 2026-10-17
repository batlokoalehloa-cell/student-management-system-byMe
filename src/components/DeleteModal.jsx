function DeleteModal(props) {
  if (!props.student) {
    return null;
  }

  return (
    <div className="modal-backdrop" onMouseDown={props.onCancel}>
      <section
        className="modal-card delete-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onMouseDown={function (event) { event.stopPropagation(); }}
      >
        <div className="delete-icon">!</div>
        <h2 id="delete-title">Delete student?</h2>
        <p>Are you sure you want to delete <strong>{props.student.fullName}</strong>? This action cannot be undone.</p>
        <div className="modal-actions centered-actions">
          <button className="button button-secondary" type="button" onClick={props.onCancel}>Cancel</button>
          <button className="button button-danger" type="button" onClick={props.onConfirm}>Delete student</button>
        </div>
      </section>
    </div>
  );
}

export default DeleteModal;
