import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemove from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Score from './Score';
import CommentsCount from './CommentsCount';
import { ASCENDING_ORDER } from '../actions';

const PostList = ({
  posts,
  comments,
  increasePostScoreFunc,
  decreasePostScoreFunc,
  removePostFunc,
  openModalEditPostFunc,
  sort,
  filter
}) => {

  let filteredPosts = [];
  if (filter !== '') {
    filteredPosts = posts.filter((p) => p.category === filter)
  } else {
    filteredPosts = posts;
  }

  if (sort.order === ASCENDING_ORDER) {
    filteredPosts.sort( (a, b) => a[sort.field] - b[sort.field] )
  } else {
    filteredPosts.sort( (a, b) => b[sort.field] - a[sort.field] )
  }

  return (
    <div>
      { filteredPosts.length === 0 &&
      <Card><CardTitle title={`No posts for [${filter}] category`} /></Card> 
      }

      { filteredPosts && filteredPosts.map((p) =>
      <Card key={p.id}>
        <Link to={`/${p.category}/${p.id}`}>
          <CardTitle title={p.title} subtitle={p.category} />
        </Link>
        <CardText>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {p.author} :: </CardText>
        <CardText>{p.body}</CardText>
        <Score
          id={p.id}
          score={p.voteScore}
          increaseScoreFunc={increasePostScoreFunc}
          decreaseScoreFunc={decreasePostScoreFunc}
        />
        <CommentsCount
          postId={p.id}
          comments={comments}
        />

        <RaisedButton
          label="Edit"
          onClick={() => openModalEditPostFunc({ id: p.id, title: p.title, body: p.body })}
          style={{margin: 12}}
        >
          <EditorModeEdit />
        </RaisedButton>  

        <RaisedButton
          onClick={() => removePostFunc(p.id)}
          label="Remove"
          style={{margin: 12}}
        >
          <ContentRemove />
        </RaisedButton>
        
      </Card>
      )}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired,
  removePostFunc: PropTypes.func.isRequired,
  openModalEditPostFunc: PropTypes.func.isRequired,
}

export default PostList;
