import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const sendTestEmailSlice = createSlice({
  name: "testEmail",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetEmailState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTestEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendTestEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        error = null;
      })
      .addCase(sendTestEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Async thunk to send test email
export const sendTestEmail = createAsyncThunk(
  "testEmail/sendTestEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      console.log(emailData);
      const result = await window.Email.send({
        Host: emailData.smtp,
        Username: emailData.email,
        Password: emailData.password,
        To: emailData.testEmail,
        From: emailData.email,
        Subject: "Test Email",
        Body: "This is a test email sent from the admin panel!",
      });

      if (result === "OK") {
        toast.success("Test e-posta başarıyla gönderildi!");
        return result;
      } else {
        console.log(result);
        toast.error("Test e-postası gönderilemedi. Hata: " + result);
        return rejectWithValue(result);
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const { resetEmailState } = sendTestEmailSlice.actions;

export default sendTestEmailSlice.reducer;
