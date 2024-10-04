// semantic

import React from "react";
import commentData from "./CommentData";

// Komponen untuk menampilkan komentar
const Comments = () => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {commentData.map((commentData, index) => (
        <div className="comment" key={index}>
          <a className="avatar">
            <img src={commentData.photo} alt="Avatar" />
          </a>

          <div className="content">
            <a className="author">{commentData.name}</a>
            <div className="metadata">
              <span className="date">{commentData.time}</span>
            </div>
            <div className="text">{commentData.comment}</div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;

  