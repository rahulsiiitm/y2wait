import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import './auth-modal.css';

export type Role = 'driver' | 'transporter' | 'trader' | 'corporate' | null;

export type AuthStep =
  | 'role'
  | 'mobile'
  | 'password'
  | 'otp'
  | 'details'
  | 'forgot_otp'
  | 'reset_password'
  | 'forgot_phone'
  | 'forgot_new_password';

export interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register' | null;
  step: AuthStep;
  selectedRole: Role;
  user: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
    businessName: string;
    gst: string;
    dl: string;
    dp: string;
  };
  otpVal: string;
  onClose: () => void;
  onSelectRole: (role: Role) => void;
  onChangeMode: (mode: 'login' | 'register') => void;
  onChangeStep: (step: AuthStep) => void;
  onUserChange: (user: any) => void;
  setOtpVal: (otp: string) => void;
  onLoginSuccess: () => void;
  onRegisterSuccess: () => void;
}

const REGISTER_ROLES: { id: Exclude<Role, null>; index: string; title: string; desc: string; badge: string }[] = [
  {
    id: 'driver',
    index: '01',
    title: 'Driver / Pilot',
    desc: 'I own or drive a commercial truck · Instant spot loads & fast fuel advance.',
    badge: 'SINGLE TRUCK'
  },
  {
    id: 'transporter',
    index: '02',
    title: 'Transporter / Fleet Owner',
    desc: 'I manage multiple trucks or transport agency · Fleet dispatch & return loads.',
    badge: 'FLEET DISPATCH'
  },
  {
    id: 'trader',
    index: '03',
    title: 'Trader / Shipper / Consignor',
    desc: 'I have cargo to move across India · Direct corridor bids & live tracking.',
    badge: 'SPOT FREIGHT'
  },
  {
    id: 'corporate',
    index: '04',
    title: 'Enterprise Corporate',
    desc: 'I manage high-volume corporate supply chains · Contract RFQs & audit.',
    badge: 'ANNUAL CONTRACTS'
  }
];

const LOGIN_ROLES: { id: Exclude<Role, null>; num: string; label: string }[] = [
  { id: 'driver', num: '01', label: 'Driver' },
  { id: 'transporter', num: '02', label: 'Transporter' },
  { id: 'trader', num: '03', label: 'Trader' },
  { id: 'corporate', num: '04', label: 'Corporate' }
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  step,
  selectedRole,
  user,
  otpVal,
  onClose,
  onSelectRole,
  onChangeMode,
  onChangeStep,
  onUserChange,
  setOtpVal,
  onLoginSuccess,
  onRegisterSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentMode = mode || 'login';
  const effectiveRole = selectedRole || 'driver';

  // --- ACTIONS ---

  const handleSwitchToLogin = () => {
    setErrorMessage(null);
    onChangeMode('login');
    if (!selectedRole) onSelectRole('driver');
    onChangeStep('mobile');
  };

  const handleSwitchToRegister = () => {
    setErrorMessage(null);
    onChangeMode('register');
    onChangeStep('role');
  };

  // Direct login submit (mobile + password + role)
  const handleLoginSubmit = async () => {
    setErrorMessage(null);
    if (!user.mobile || user.mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!user.password) {
      setErrorMessage('Please enter your account password.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://y2wait-backend.onrender.com/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNum: `${user.mobile}`,
          password: user.password,
          role: effectiveRole
        })
      });
      if (response.ok) {
        onChangeStep('otp');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || data.message || 'Invalid credentials or mobile number for this role.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not connect to authentication gateway.');
    } finally {
      setLoading(false);
    }
  };

  // Register submit
  const handleRegister = async () => {
    setErrorMessage(null);
    if (!user.firstName || user.mobile.length !== 10 || !user.password) {
      setErrorMessage('Please fill in all required registration details.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://y2wait-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          mobileNum: `${user.mobile}`,
          password: user.password,
          role: effectiveRole,
          businessName: user.businessName,
          dl: user.dl
        })
      });
      if (response.ok) {
        onRegisterSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.message || data.error || 'This account already exists. Switch to Sign In.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error: Could not reach Y2Wait authentication gateway.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification
  const handleVerifyLoginOtp = async () => {
    setErrorMessage(null);
    if (otpVal.length !== 4) {
      setErrorMessage('Please enter the complete 4-digit OTP code.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://y2wait-backend.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNum: user.mobile,
          otp: otpVal
        })
      });
      if (response.ok) {
        onLoginSuccess();
      } else {
        setErrorMessage('Invalid or expired OTP. Please check the code and try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not complete multi-factor verification.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password handlers
  const handleSendForgotOtp = async () => {
    setErrorMessage(null);
    if (user.mobile.length !== 10) {
      setErrorMessage('Please provide a valid 10-digit registered number.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://y2wait-backend.onrender.com/api/auth/forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNum: user.mobile,
          role: effectiveRole
        })
      });
      if (response.ok) {
        onChangeStep('forgot_otp');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || data.message || 'No registered record found for this number.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Gateway unreachable.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setErrorMessage(null);
    if (user.password !== user.confirmPassword) {
      setErrorMessage('Password confirmation does not match.');
      return;
    }
    if (user.password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://y2wait-backend.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobileNum: user.mobile,
          otp: user.otp,
          newPassword: user.password,
          role: effectiveRole
        })
      });
      if (response.ok) {
        alert('Password reset successfully! Please log in with your new password.');
        onUserChange({ ...user, password: '', confirmPassword: '', otp: '' });
        handleSwitchToLogin();
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || data.message || 'Password update failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not commit new credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Determine current high-level view
  const isRecovering = step.startsWith('forgot');
  const isOtpStep = step === 'otp';
  const isLoginView = currentMode === 'login' && !isRecovering && !isOtpStep;
  const isRegisterStep1 = currentMode === 'register' && step === 'role' && !isRecovering && !isOtpStep;
  const isRegisterStep2 = currentMode === 'register' && step === 'details' && !isRecovering && !isOtpStep;

  return (
    <div
      className="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Y2Wait Operational Gateway"
    >
      <div className="auth-modal-frame">
        {/* ============================================================
            LEFT PANEL: EDITORIAL CORRIDOR TELEMETRY
            ============================================================ */}
        <div className="auth-editorial-panel">
          <div className="auth-editorial-bg" />
          <div className="auth-editorial-gradient" />

          <div className="auth-editorial-content">
            <div className="auth-badge">
              <i />
              <span>
                {currentMode === 'login' ? 'SYS_AUTH // OPERATIONAL ACCESS' : 'SYS_REG // CORRIDOR ONBOARDING'}
              </span>
            </div>

            <h2 className="auth-editorial-headline">
              {currentMode === 'login' ? (
                <>
                  WELCOME
                  <br />
                  <em>BACK TO</em>
                  <br />
                  THE GRID.
                </>
              ) : (
                <>
                  JOIN THE
                  <br />
                  <em>NATIONAL</em>
                  <br />
                  FREIGHT GRID.
                </>
              )}
            </h2>

            <p className="auth-editorial-desc">
              {currentMode === 'login'
                ? 'Sign in to monitor live GPS telemetry, confirm corridor loads, and manage spot bids across 480+ Indian corridors.'
                : 'Direct access to India’s verified freight network. Zero broker commissions, instant load matching, and verified vehicle identity.'}
            </p>

            <div className="auth-role-pill">
              ACCOUNT TYPE: <span>{effectiveRole.toUpperCase()}</span>
            </div>
          </div>

          <div className="auth-editorial-meta">
            <div className="auth-telemetry-row">
              <span>GATEWAY ENCRYPTION</span>
              <span className="val">256-BIT TLS // SECURE</span>
            </div>
            <div className="auth-telemetry-row">
              <span>VERIFIED OPERATORS</span>
              <span className="val">14,200+ ACTIVE</span>
            </div>
            <div className="auth-telemetry-row">
              <span>NATIONAL LANES</span>
              <span className="val">480+ CORRIDORS</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT PANEL: INTERACTIVE FORM CANVAS
            ============================================================ */}
        <div className="auth-form-panel">
          {/* Top Bar with Step label and Sharp Close */}
          <div className="auth-form-top">
            <div className="auth-step-label">
              <span>PORTAL // </span>
              <b>
                {isLoginView && 'OPERATOR SIGN IN'}
                {isRegisterStep1 && 'NEW ACCOUNT · STEP 1 OF 2: SELECT ROLE'}
                {isRegisterStep2 && 'NEW ACCOUNT · STEP 2 OF 2: OPERATOR DOSSIER'}
                {isOtpStep && 'TWO-FACTOR VERIFICATION'}
                {isRecovering && 'ACCOUNT RECOVERY'}
              </b>
            </div>

            <button
              type="button"
              className="auth-close-btn"
              onClick={onClose}
              title="Close Modal"
              aria-label="Close Modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Prominent, Full-Width Mode Switcher (only on main login or register steps) */}
          {!isRecovering && !isOtpStep && (
            <div className="auth-mode-switch" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={currentMode === 'login'}
                className={`auth-mode-tab ${currentMode === 'login' ? 'is-active' : ''}`}
                onClick={handleSwitchToLogin}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={currentMode === 'register'}
                className={`auth-mode-tab ${currentMode === 'register' ? 'is-active' : ''}`}
                onClick={handleSwitchToRegister}
              >
                Create New Account
              </button>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                background: '#fff1ec',
                border: '1px solid #de622b',
                color: '#de622b',
                padding: '10px 14px',
                fontSize: '11px',
                fontWeight: 600,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠</span> {errorMessage}
            </div>
          )}

          {/* ============================================================
              1. DIRECT LOGIN VIEW (SIGN IN)
              Single clean screen: Role bar + Phone + Password + Sign In CTA
              ============================================================ */}
          {isLoginView && (
            <div>
              <h3 className="auth-form-title">SIGN IN TO TERMINAL</h3>
              <p className="auth-form-subtitle">
                Select your account type and enter your registered credentials.
              </p>

              {/* Compact 1-Click Role Selector */}
              <div className="auth-login-role-wrap">
                <div className="auth-login-role-label">
                  <span>Your Role in Network</span>
                  <span style={{ color: '#de622b' }}>{effectiveRole.toUpperCase()}</span>
                </div>
                <div className="auth-login-role-grid">
                  {LOGIN_ROLES.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      className={`auth-login-role-btn ${effectiveRole === r.id ? 'is-selected' : ''}`}
                      onClick={() => {
                        onSelectRole(r.id);
                        setErrorMessage(null);
                      }}
                    >
                      <span className="auth-login-role-num">{r.num}</span>
                      <span className="auth-login-role-name">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Number Input */}
              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Registered Mobile Number</span> <span className="req">*</span>
                </label>
                <div className="auth-phone-wrap">
                  <span className="auth-phone-prefix">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    autoFocus
                    placeholder="10-Digit Mobile"
                    value={user.mobile}
                    onChange={(e) =>
                      onUserChange({ ...user, mobile: e.target.value.replace(/\D/g, '') })
                    }
                    className="auth-input auth-phone-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Access Password</span> <span className="req">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) => onUserChange({ ...user, password: e.target.value })}
                  className="auth-input"
                />
              </div>

              {/* Forgot Password Link */}
              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => {
                  setErrorMessage(null);
                  onChangeStep('forgot_phone');
                }}
              >
                Forgot Password?
              </button>

              {/* Submit CTA */}
              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleLoginSubmit}
                disabled={loading || user.mobile.length !== 10 || !user.password}
              >
                <span>{loading ? 'AUTHENTICATING...' : 'VERIFY & REQUEST OTP'}</span>
                <ArrowRight size={14} />
              </button>

              {/* Unmistakable Switch to Register */}
              <div className="auth-switch-footer">
                <span>Don't have an account on Y2Wait yet?</span>
                <button
                  type="button"
                  className="auth-switch-footer-btn"
                  onClick={handleSwitchToRegister}
                >
                  Create Account →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              2. REGISTRATION STEP 1: CHOOSE ROLE
              Clear statement & 4 rich role options
              ============================================================ */}
          {isRegisterStep1 && (
            <div>
              <h3 className="auth-form-title">CREATE OPERATOR ACCOUNT</h3>
              <p className="auth-form-subtitle">
                Choose what best describes your freight operations to begin registration:
              </p>

              <div className="auth-role-grid">
                {REGISTER_ROLES.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    className="auth-role-card"
                    onClick={() => {
                      onSelectRole(r.id);
                      setErrorMessage(null);
                      onChangeStep('details');
                    }}
                  >
                    <div className="auth-role-info">
                      <div className="auth-role-header">
                        <span className="auth-role-index">{r.index}</span>
                        <span className="auth-role-name">{r.title}</span>
                      </div>
                      <span className="auth-role-desc">{r.desc}</span>
                    </div>
                    <span className="auth-role-badge">{r.badge}</span>
                    <span className="auth-role-arrow">→</span>
                  </button>
                ))}
              </div>

              {/* Switch to Sign In */}
              <div className="auth-switch-footer">
                <span>Already registered with Y2Wait?</span>
                <button
                  type="button"
                  className="auth-switch-footer-btn"
                  onClick={handleSwitchToLogin}
                >
                  Sign In →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              3. REGISTRATION STEP 2: ENTER DOSSIER DETAILS
              Form with Role badge, Name, Phone, DL/Company, Password
              ============================================================ */}
          {isRegisterStep2 && (
            <div>
              <button
                type="button"
                className="auth-back-link"
                onClick={() => {
                  setErrorMessage(null);
                  onChangeStep('role');
                }}
              >
                <ArrowLeft size={12} /> BACK TO ROLE SELECTION
              </button>

              <h3 className="auth-form-title">OPERATOR DOSSIER</h3>
              <p className="auth-form-subtitle">
                Registering as <strong style={{ color: '#de622b' }}>{effectiveRole.toUpperCase()}</strong> on Y2Wait.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="auth-field-group">
                  <label className="auth-field-label">
                    <span>First Name</span> <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh"
                    value={user.firstName}
                    onChange={(e) => onUserChange({ ...user, firstName: e.target.value })}
                    className="auth-input"
                  />
                </div>

                <div className="auth-field-group">
                  <label className="auth-field-label">
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma"
                    value={user.lastName}
                    onChange={(e) => onUserChange({ ...user, lastName: e.target.value })}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Mobile Phone Number (India)</span> <span className="req">*</span>
                </label>
                <div className="auth-phone-wrap">
                  <span className="auth-phone-prefix">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-Digit Mobile"
                    value={user.mobile}
                    onChange={(e) =>
                      onUserChange({ ...user, mobile: e.target.value.replace(/\D/g, '') })
                    }
                    className="auth-input auth-phone-input"
                  />
                </div>
              </div>

              {(effectiveRole === 'trader' || effectiveRole === 'corporate' || effectiveRole === 'transporter') && (
                <div className="auth-field-group">
                  <label className="auth-field-label">
                    <span>Business / Enterprise Legal Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shreenath Logistics LLP"
                    value={user.businessName}
                    onChange={(e) => onUserChange({ ...user, businessName: e.target.value })}
                    className="auth-input"
                  />
                </div>
              )}

              {effectiveRole === 'driver' && (
                <div className="auth-field-group">
                  <label className="auth-field-label">
                    <span>Driving License Number (DL)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MH-12-2018-0049281"
                    value={user.dl}
                    onChange={(e) => onUserChange({ ...user, dl: e.target.value })}
                    className="auth-input"
                  />
                </div>
              )}

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Create Access Password</span> <span className="req">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={user.password}
                  onChange={(e) => onUserChange({ ...user, password: e.target.value })}
                  className="auth-input"
                />
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleRegister}
                disabled={loading || !user.firstName || user.mobile.length !== 10 || !user.password}
              >
                <span>{loading ? 'PROVISIONING ACCOUNT...' : 'CREATE ACCOUNT & JOIN NETWORK'}</span>
                <ArrowRight size={14} />
              </button>

              <div className="auth-switch-footer">
                <span>Already registered with Y2Wait?</span>
                <button
                  type="button"
                  className="auth-switch-footer-btn"
                  onClick={handleSwitchToLogin}
                >
                  Sign In →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              4. TWO-FACTOR OTP VERIFICATION STEP
              ============================================================ */}
          {isOtpStep && (
            <div>
              <button
                type="button"
                className="auth-back-link"
                onClick={() => {
                  setErrorMessage(null);
                  onChangeStep('mobile');
                }}
              >
                <ArrowLeft size={12} /> BACK TO SIGN IN
              </button>

              <h3 className="auth-form-title">TWO-FACTOR OTP</h3>
              <p className="auth-form-subtitle">
                Enter the 4-digit authorization code dispatched to <strong style={{ color: '#de622b' }}>+91 {user.mobile}</strong>
              </p>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>4-Digit One-Time Code</span> <span className="req">*</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  autoFocus
                  placeholder="• • • •"
                  value={otpVal}
                  onChange={(e) => setOtpVal(e.target.value.replace(/\D/g, ''))}
                  className="auth-input"
                  style={{
                    fontSize: '24px',
                    fontFamily: 'monospace',
                    letterSpacing: '8px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleVerifyLoginOtp}
                disabled={loading || otpVal.length !== 4}
              >
                <span>{loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER TERMINAL'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* ============================================================
              5. FORGOT PASSWORD FLOW
              ============================================================ */}
          {step === 'forgot_phone' && (
            <div>
              <button
                type="button"
                className="auth-back-link"
                onClick={handleSwitchToLogin}
              >
                <ArrowLeft size={12} /> BACK TO SIGN IN
              </button>

              <h3 className="auth-form-title">RESET CREDENTIALS</h3>
              <p className="auth-form-subtitle">
                Enter your registered 10-digit mobile number to receive an authorized recovery OTP.
              </p>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Registered Mobile</span> <span className="req">*</span>
                </label>
                <div className="auth-phone-wrap">
                  <span className="auth-phone-prefix">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-Digit Mobile"
                    value={user.mobile}
                    onChange={(e) =>
                      onUserChange({ ...user, mobile: e.target.value.replace(/\D/g, '') })
                    }
                    className="auth-input auth-phone-input"
                  />
                </div>
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleSendForgotOtp}
                disabled={loading || user.mobile.length !== 10}
              >
                <span>{loading ? 'DISPATCHING OTP...' : 'DISPATCH RECOVERY OTP'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 'forgot_otp' && (
            <div>
              <h3 className="auth-form-title">ENTER RECOVERY OTP</h3>
              <p className="auth-form-subtitle">
                6-digit recovery token sent to <strong style={{ color: '#de622b' }}>+91 {user.mobile}</strong>
              </p>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>6-Digit Recovery Code</span> <span className="req">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6 digits"
                  value={user.otp}
                  onChange={(e) =>
                    onUserChange({ ...user, otp: e.target.value.replace(/\D/g, '') })
                  }
                  className="auth-input"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'monospace',
                    letterSpacing: '6px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={() => {
                  if (!user.otp || user.otp.length < 4) {
                    setErrorMessage('Please enter the complete OTP code.');
                    return;
                  }
                  setErrorMessage(null);
                  onChangeStep('forgot_new_password');
                }}
                disabled={!user.otp}
              >
                <span>VALIDATE CODE & PROCEED</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 'forgot_new_password' && (
            <div>
              <h3 className="auth-form-title">NEW ACCESS KEY</h3>
              <p className="auth-form-subtitle">
                Set a strong access password for your operator account.
              </p>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>New Password</span> <span className="req">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={user.password}
                  onChange={(e) => onUserChange({ ...user, password: e.target.value })}
                  className="auth-input"
                />
              </div>

              <div className="auth-field-group">
                <label className="auth-field-label">
                  <span>Confirm New Password</span> <span className="req">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    onUserChange({ ...user, confirmPassword: e.target.value })
                  }
                  className="auth-input"
                />
              </div>

              <button
                type="button"
                className="auth-primary-btn"
                onClick={handleResetPassword}
                disabled={loading || !user.password || !user.confirmPassword}
              >
                <span>{loading ? 'UPDATING KEY...' : 'COMMIT NEW CREDENTIALS'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
