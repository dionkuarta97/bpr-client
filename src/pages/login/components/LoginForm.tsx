import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useLoginFormCtrl from '@/pages/login/libs/useLoginFormCtrl';

const LoginForm = () => {
  const { showPassword, setShowPassword, loginForm, setLoginForm, onSubmit } = useLoginFormCtrl();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col bg-white border-2 border-gray-300 rounded-[28px] px-8 py-12 w-1/3 items-center justify-center gap-4">
        <Typography color="textPrimary" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          BPR
        </Typography>
        <form
          id="login-form"
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <TextField
            size="medium"
            className="w-full"
            label="username"
            value={loginForm.username}
            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
          />
          <TextField
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            autoComplete="off"
            size="medium"
            className="w-full"
            label="password"
            type={showPassword ? 'text' : 'password'}
          />
          <Button type="submit" size="large" variant="contained" sx={{ borderRadius: '12px' }}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
