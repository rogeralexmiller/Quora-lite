var React = require("react");
var AnswerApiUtil = require("../util/answerApiUtil");
var SessionStore = require("../stores/sessionStore");
var CommentIndex = require("./CommentIndex");
var TimeStamp = require("./TimeStamp");

var AnswerIndexItem = React.createClass({

  getInitialState: function(){
    return {
      answerEdit: this.props.answer.body,
      commentCount: this.props.answer.commentCount,
      editing: false
    };
  },

  componentWillReceiveProps: function(e){
    this.setState({
      answerEdit: e.answer.body,
      commentCount: e.answer.commentCount
    });
  },

  textChange: function(e){
    this.setState({answerEdit: e.target.value});
  },

  editAnswer: function(){
    this.setState({editing: true});
  },

  deleteAnswer: function(){
    AnswerApiUtil.deleteAnswer(this.props.answer.id);
  },

  updateAnswer: function(){
    AnswerApiUtil.updateAnswer({
      id: this.props.answer.id,
      body: this.state.answerEdit
    })
    this.setState({editing: false})
  },

  cancelEdit: function(){
    this.setState({editing: false})
  },

  ownerButtons:  function(){
    if (SessionStore.currentUserOwns(this.props.answer)) {
      var ButtonGroupClass = this.state.editing ? "hidden" : "user-buttons group";
      return (
        <div className={ButtonGroupClass}>
          <button className="answer-button" onClick={this.editAnswer} > Edit </button>
          <button className="answer-button delete" onClick={this.deleteAnswer} > Delete </button>
        </div>
      )} else{
      return(<div> </div>);
    }
  },


  render: function(){
    var answerFormClass = this.state.editing ? "answer-form group" : "hidden";
    var answerShowClass = this.state.editing ? "hidden" : "answer-content";

    return (
      <div className = "answer-index-item group">
      <TimeStamp time={this.props.answer.created_at}/>
      <h3 className="answer-author" >{this.props.answer.author}</h3>
      <p className={answerShowClass} >{this.props.answer.body}</p>

      <form className={answerFormClass}>
        <div className="group">
          <textarea rows="3" className="answer-input" onChange={this.textChange} value={this.state.answerEdit}></textarea>

          <input type="submit" className="answer-button" value="Update" onClick={this.updateAnswer}/>
          <p className="cancelAnswer" onClick={this.cancelEdit}>Cancel</p>
        </div>
      </form>

      {this.ownerButtons()}
      <CommentIndex commentCount={this.state.commentCount} commentableType="Answer" commentableId={this.props.answer.id}/>
      </div>
    );
  }
});

module.exports = AnswerIndexItem;
