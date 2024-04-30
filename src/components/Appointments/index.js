// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MM yyyy ,EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getfilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachtransaction => eachtransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredClassNames = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getfilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointments-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  value={titleInput}
                  id="title"
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  type="date"
                  value={dateInput}
                  id="date"
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="hr-line" />
            <div className="header-filter-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={`${filteredClassNames} filter-style`}
                onClick={this.onFilter}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
