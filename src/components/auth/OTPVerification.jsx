import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setIsResendActive(false);
    setTimer(30);
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsResendActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpValue }),
      });

      if (response.ok) {
        router('/login');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        startTimer();
      }
    } catch (error) {
      console.error('Resend OTP failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a code to your email. Please enter it below.
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={el => inputRefs.current[index] = el}
              value={otp[index]}
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-600">
              Resend code in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={!isResendActive}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Resend Code
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.join('').length !== 6}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;