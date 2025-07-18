"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Mail, ShoppingBag, ArrowRight } from "lucide-react"
import { runFireworks } from "../lib/utils"
import { urlFor } from "../lib/client"

const Success = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    const details = localStorage.getItem('orderDetails');
    if (details) setOrderDetails(JSON.parse(details));
    
    setOrderNumber(`ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
    localStorage.clear();
  }, [])

  useEffect(() => {
    if (orderDetails) {
      runFireworks();
    }
  }, [orderDetails]);

  const estimatedDelivery = orderDetails?.estimatedDelivery || "3-5 business days";

  return (
    <div className="success-page-container">
      <div className="success-content-wrapper">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon-wrapper">
            <CheckCircle className="success-icon" />
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Summary Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <ShoppingBag className="card-title-icon" />
              Order Summary
            </h2>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">Order Number</span>
                <span className="order-number-badge">{orderNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Amount</span>
                <span className="info-value-large">₹{orderDetails?.total || 0}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Delivery</span>
                <span className="info-value">{estimatedDelivery}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Delivery Information</h2>
          </div>
          <div className="card-body">
            <div className="info-grid-tight">
              <div>
                <span className="info-label-block">Name</span>
                <p className="info-value">{orderDetails?.user?.name || "-"}</p>
              </div>
              <div>
                <span className="info-label-block">Email</span>
                <p className="info-value">{orderDetails?.user?.email || "-"}</p>
              </div>
              <div>
                <span className="info-label-block">Mobile</span>
                <p className="info-value">{orderDetails?.user?.mobile || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Ordered Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Items Ordered</h2>
          </div>
          <div className="card-body">
            <div className="info-grid">
              {orderDetails?.cart?.map((item, idx) => (
                <div key={idx}>
                  <div className="ordered-item-row">
                    <div className="ordered-item-image-wrapper">
                      <img
                        src={Array.isArray(item.image) && item.image[0] ? urlFor(item.image[0]).url() : "/placeholder.svg"}
                        alt={item.name}
                        className="ordered-item-image"
                        onError={e => { e.target.src = "/placeholder.svg"; }}
                      />
                    </div>
                    <div className="ordered-item-details">
                      <p className="ordered-item-name">{item.name}</p>
                      <p className="ordered-item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="ordered-item-price-wrapper">
                      <span className="ordered-item-price">₹{item.price}</span>
                    </div>
                  </div>
                  {idx < orderDetails.cart.length - 1 && <div className="divider"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Notification */}
        <div className="email-notification-card">
          <div className="email-notification-content">
            <Mail className="email-notification-icon" />
            <div>
              <h3 className="email-notification-title">Confirmation Email Sent</h3>
              <p className="email-notification-text">
                We've sent a detailed receipt to your email address. Please check your inbox and spam folder.
              </p>
              <p className="email-notification-contact">
                Need help? Contact us at{" "}
                <a href="mailto:support@zephyr.com" className="email-notification-link">
                  support@zephyr.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-container">
          <Link href="/" className="action-button-link">
            <button className="btn btn-primary">
              <ShoppingBag className="btn-icon" />
              Continue Shopping
            </button>
          </Link>
          <Link href="/" className="action-button-link">
            <button className="btn btn-secondary">
              Track Order
              <ArrowRight className="btn-icon" />
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="additional-info-box">
          <p className="info-label">
            Your order is being processed and you'll receive tracking information soon.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Success