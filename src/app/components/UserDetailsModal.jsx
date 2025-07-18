"use client"

import { useState } from "react"
import { X, User, Phone, Mail, Calendar } from "lucide-react"

const UserDetailsModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: "", age: "", mobile: "", email: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
          <h2 className="modal-title">Complete Your Order</h2>
          <p className="modal-subtitle">Enter your details to continue with payment</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Name Field */}
          <div className="form-field">
            <label className="form-label">
              <User size={16} />
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Age Field */}
          <div className="form-field">
            <label className="form-label">
              <Calendar size={16} />
              Age
            </label>
            <input
              name="age"
              type="number"
              placeholder="Enter your age"
              value={form.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              className="form-input"
            />
          </div>

          {/* Mobile Field */}
          <div className="form-field">
            <label className="form-label">
              <Phone size={16} />
              Mobile Number
            </label>
            <input
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={form.mobile}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label className="form-label">
              <Mail size={16} />
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons-container">
            <button type="submit" className="btn-submit">
              Continue to Payment
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="modal-footer">
          <div className="security-note">
            <p className="security-note-text">🔒 Your information is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal