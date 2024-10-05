import React, { Component } from 'react';
import commentData from './CommentData'; 
import LikeButton from './LikeButton'; 
import TotalLikes from './TotalLike'; 


class CommentsClass extends Component {
    constructor(props) {
      super(props);
  
      // jumlah likes tiap komentar
      this.state = {
        likes: Array(commentData.length).fill(0),
      };
    }

    // tambah jumlah likes pada komentar berdasarkan index
    handleLikeClick = (index) => {
      const likes = [...this.state.likes]; // bikin salinan dari likes
      likes[index] += 1; // tambah 1 like pada komentar yang diklik
      this.setState({ likes }); // update state dengan jumlah likes baru
    };
    render() {
      return (
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {/* mapping commentData untuk menampilkan komentar */}
          {commentData.map((comment, index) => (
            <div className="comment" key={index}>
              <a className="avatar">
                <img src={comment.photo} alt="Avatar" />
              </a>  
              <div className="content">
                <a className="author">{comment.name}</a>
                <div className="metadata">
                  <span className="date">{comment.date}</span>
                  <TotalLikes count={this.state.likes[index]} />
                </div>
                <div className="text">{comment.comment}</div>
                <div className="actions">
                <LikeButton handleClick={() => this.handleLikeClick(index)} />
                <a className="reply" style={{ marginLeft: '15px' }}>Reply</a>
                 </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  
  export default CommentsClass;
  
