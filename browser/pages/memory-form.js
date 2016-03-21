import React, { Component } from 'react'
import request from 'superagent'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import AuthService from '../services/Auth'

class NewMemoryForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }

    this._handleSaveClick = this._handleSaveClick.bind(this)
  }

  _handleSaveClick () {
    request.post('/api/memory')
      .set('Authorization', 'Bearer ' + AuthService.getAuthToken())
      .send({ text: this.state.text })
      .end((err, res) => {
        if (err) return console.log(err)

        this.setState({
          text: '',
          saved: true
        })

        let self = this

        this.keydown = function keydown (e) {
          self.setState({ saved: false })
          document.removeEventListener('keydown', self.keydown)
        }

        document.addEventListener('keydown', this.keydown)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <textarea
            className='new-memory'
            valueLink={this.linkState('text')}
            id='text'
            name='text'
            cols='30'
            rows='10'
            placeholder='write something to remember...'>
          </textarea>
        </div>

        <div className='row'>
          <button className='left btn' onClick={this._handleSaveClick}>Save</button>
          {this.state.saved ? <p className='right success'>Saved</p> : ''}
        </div>
      </div>
    )
  }
}

ReactMixin(NewMemoryForm.prototype, LinkedStateMixin)

export default NewMemoryForm
