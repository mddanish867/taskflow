import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOtpVerificationMutation } from '../api/authAPI/authApiSlice';
import {toast} from '../helper/toast';
import { Loader } from 'lucide-react';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);
  const [verifyOTP] = useOtpVerificationMutation();
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const email = localStorage.getItem("email");
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
    const email = localStorage.getItem('email');
    setLoading(true);
    try {      
      const response = await verifyOTP({
        email: email,
        otp: otpValue
      }).unwrap();
      if(response.status === 200){
          toast.success(response.message || 'OTP verified successfully!');
          navigate('/reset-password')
        }
        else{
          toast.error(response.message || 'Something went wrong');
        }      
    } catch (error) {
      console.error('OTP verification failed:', error);
      toast.error(error.data?.message || 'Something went wrong');
    }finally {
      setLoading(false);
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
      <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-md shadow-md">
      <div className="flex justify-center">
          <a href="/">
            <span className="text-3xl font-bold text-blue-600">SooraAuth</span>
          </a>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6 digit code to your <span className='text-blue-500'>{email}</span>. Please enter it below.
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
              className="w-12 h-12 text-center text-xl font-semibold outline-none border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
         {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Verify OTP'}
        </button>
      </div>
    </div>
  );
};
export default VerifyOTP