import { useState } from "react";
import "./comments.css";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Comments({ comments }) {
  const [nameValue, setNameValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [addComment, SetAddComment] = useState([]);

  const handleNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const addNewComment = () => {
    if (!nameValue || !commentValue) {
      return ;
    }
    SetAddComment([
      ...addComment,
      { id: new Date(), name: nameValue, comment: commentValue },
    ]);
    setNameValue("");
    setCommentValue("");
  };

  const keyPressed = (e) => {
    if( e.key === "Enter"){
      addNewComment();
    }
    
  }

  const deleteComment = (index) => {
    SetAddComment(addComment.filter((_, i) => i !== index));
  };

  return (
    <div id="Comments">
      <h2>comments</h2>
      <div className="user-input-container">
        <input
          className="input-name"
          type="text"
          value={nameValue}
          onInput={handleNameValue}
          placeholder="your Name..."
          onKeyDown={keyPressed}
        />
        <input
          className="input-comments"
          type="text"
          value={commentValue}
          onInput={handleCommentValue}
          placeholder="Enter your comment..."
          onKeyDown={keyPressed}
        />
        <button type="button" onClick={addNewComment}>
          add
        </button>
      </div>

      <div className="all-list-container">
        <div className="comments-list-container">
          {addComment &&
            addComment.map((add, index) => (
              <div key={add} className="list">
                <p className="username">
                  {" "}
                  <FaUser className="user-btn" />
                  {add.name}
                </p>
                <br />
                <p className="comment-content">{add.comment}</p>
                <p className="date">added just now</p>
                <button
                  type="button"
                  className="delete-comment"
                  onClick={() => deleteComment(index)}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
            ))}
        </div>

        <div className="comments-list-container">
          {comments.map((comment) => (
            <div key={comment.id} className="list">
              <p className="username">
                {" "}
                <FaUser className="user-btn" /> {comment.author}
              </p>{" "}
              <br />
              <p className="comment-content">{comment.content}</p>
              <p className="date">{comment.created_at.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};
