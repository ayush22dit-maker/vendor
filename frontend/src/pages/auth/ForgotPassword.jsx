
import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../../api/api";

const ForgotPassword = () => {
 
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); 
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // -------------------------
  // STEP 1: SEND OTP
  // -------------------------
  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check email
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const response = await forgotPassword({
        email: email,
      });

      console.log("Forgot password response:", response.data);

      setMessage(
        response.data.message || "OTP sent successfully"
      );

      // Go to OTP step
      setStep(2);
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  // -------------------------
  // STEP 2: VERIFY OTP
  // -------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      const response = await verifyOtp({
        email: email,
        otp: otp,
      });

      console.log("Verify OTP response:", response.data);

      setMessage(
        response.data.message || "OTP verified successfully"
      );

      // Go to reset password step
      setStep(3);
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Invalid OTP"
      );
    }
  };

  // -------------------------
  // STEP 3: RESET PASSWORD
  // -------------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check password
    if (!newPassword) {
      setError("Please enter new password");
      return;
    }

    // Check confirm password
    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    // Match passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        otp,
        newPassword: newPassword,
      });

      console.log("Reset password response:", response.data);

      setMessage(
        response.data.message ||
          "Password reset successfully"
      );

      // Redirect to login after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Failed to reset password"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 400,
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Forgot Password
          </Typography>

          {/* ERROR MESSAGE */}
          {error && (
            <Typography
              color="error"
              sx={{ textAlign: "center", mb: 2 }}
            >
              {error}
            </Typography>
          )}

          {/* SUCCESS MESSAGE */}
          {message && (
            <Typography
              color="success.main"
              sx={{ textAlign: "center", mb: 2 }}
            >
              {message}
            </Typography>
          )}

          {/* =========================
              STEP 1 - EMAIL
          ========================== */}

          {step === 1 && (
            <Box
              component="form"
              onSubmit={handleSendOtp}
            >
              <Typography sx={{ mb: 2 }}>
                Enter your registered email
              </Typography>

              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send OTP
              </Button>
            </Box>
          )}

          {/* =========================
              STEP 2 - OTP
          ========================== */}

          {step === 2 && (
            <Box
              component="form"
              onSubmit={handleVerifyOtp}
            >
              <Typography sx={{ mb: 2 }}>
                OTP sent to:
              </Typography>

              <Typography
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {email}
              </Typography>

              <TextField
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          )}

          {/* =========================
              STEP 3 - NEW PASSWORD
          ========================== */}

          {step === 3 && (
            <Box
              component="form"
              onSubmit={handleResetPassword}
            >
              <Typography sx={{ mb: 2 }}>
                Create a new password
              </Typography>

              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                sx={{ mb: 2 }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          )}

          <Button
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;

