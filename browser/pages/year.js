import React, { Component, PropTypes } from 'react'
import request from 'superagent'
import dateFormat from 'dateformat'
import pluralize from 'pluralize'
import AuthService from '../services/Auth'
import CryptoService from '../services/Crypto'

class Year extends Component {

  constructor (props) {
    super(props)

    this.state = {
      months: [],
      memories: [],
      mostMemorable: { memories: [] }
    }

    this.loadMemories()
  }

  _pluralize (amount) {
    return pluralize('memory', amount, true)
  }

  mostMemorableMonth (months) {
    let monthNames = Object.keys(months)
    let mostMemorable = months[monthNames[0]]

    monthNames.forEach((m) => {
      let month = months[m]
      if (mostMemorable && mostMemorable.memories.length < month.memories.length) {
        mostMemorable = month
      }
    })

    return mostMemorable
  }

  loadMemories () {
    request.get('/api/memory')
      .query({ year: this.props.params.year })
      .set('Authorization', 'Bearer ' + AuthService.getAuthToken())
      .end((err, res) => {
        if (err) return

        let memories = res.body.map((m) => {
          m.text = CryptoService.decrypt(m.text)
          return m
        })
        let months = this.parseMemoriesToMonths(memories)
        let mostMemorable = this.mostMemorableMonth(months)

        this.setState({ months, memories, mostMemorable })
      })
  }

  parseMemoriesToMonths (memories) {
    let months = {}

    memories.forEach((m) => {
      let memoryMonth = dateFormat(new Date(m.dateCreated), 'mmmm')
      if (!months[memoryMonth]) months[memoryMonth] = { memories: [], name: memoryMonth }
      months[memoryMonth].memories.push(m)
    })

    return months
  }

  render () {
    let months = Object.keys(this.state.months)
    let memoryList = months.map((monthName) => {
      let month = this.state.months[monthName]
      return (
        <div className='month' key={monthName}>
          <h3>{month.name}</h3>
          {(() => {
            return month.memories.map((m, index) => {
              return <div className='memory' key={m._id}>
                <p>{m.text}</p>
                <p>{dateFormat(new Date(m.dateCreated))}</p>
                <hr />
              </div>
            })
          })()}
        </div>
      )
    })

    return (
      <div className='container'>
        <header className='row'>
          <h1 className='logo'>{this.props.params.year}</h1>
        </header>

        <section className='row'>
          <h2>You banked a total of {this._pluralize(this.state.memories.length)} in {this.props.params.year}.</h2>
          <h2>
            Your most memorable month was {this.state.mostMemorable.name} with {this._pluralize(this.state.mostMemorable.memories.length)}.
          </h2>
          <hr />
        </section>

        <section className='row'>
          {memoryList}
        </section>
      </div>
    )
  }

}

Year.propTypes = {
  params: PropTypes.shape({
    year: PropTypes.string
  })
}

export default Year
