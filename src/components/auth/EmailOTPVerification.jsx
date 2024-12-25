import React from 'react'

const EmailOTPVerification = () => {
      const [otp, setOtp] = useState('');
      
      const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
    
        if (otp.length !== 6) {
          setError('Please enter a valid 6-digit OTP');
          return;
        }
    
        setLoading(true);
        try {
          // Simulate API call to verify OTP
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Handle successful verification
          console.log('Login successful');
          
        } catch (error) {
          setError('Invalid OTP. Please try again.');
        } finally {
          setLoading(false);
        }
      };
  return (
    <>
    <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter verification code
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  We've sent a 6-digit code to {email}
                </p>
                <div className="mt-1 relative">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 tracking-widest text-center text-lg"
                    placeholder="000000"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  disabled={countdown > 0 || loading}
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {countdown > 0 ? (
                    `Resend code in ${countdown}s`
                  ) : (
                    'Try different email'
                  )}
                </button>
              </div>
            </form></>
  )
}

export default EmailOTPVerification