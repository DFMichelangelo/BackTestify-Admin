import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RoundLoader from "components/RoundLoader";
import config from "configuration/config";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import Endpoints from "Endpoints";
import { useFormik } from "formik";
import useFetch from "hooks/useFetch";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import "./style.scss";

function Login(props) {
  let [disableButton, setDisableButton] = useState(true);
  let [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  let [loadingRedirect,] = useState(false)
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { fetch } = useFetch();
  const { loading, fetch: fetchUser } = useFetch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  /*const socialLogin = type => event => {
    setLoadingRedirect(true)
    const usp = new URLSearchParams(props.location.search)
    const returnUrl = usp.get('returnUrl')
    if (!_.isEmpty(returnUrl)) localStorage.returnUrl = returnUrl
    window.location.href = process.env.REACT_APP_API_URL + "/v1/auth/login/" + type
  }
  */

  useEffect(() => {
    isUserLogged();
    if (props.showSocialLoginError) {
      themeContext.showErrorSnackbar({ message: "auth.errorOnSocialLogin" })
      localStorage.removeItem("returnUrl")
    }
  }, []);

  const isUserLogged = useCallback(async () => {
    try {
      const data = await fetchUser({
        method: "GET",
        url: Endpoints.user.profile,
        redirectToLogin: false,
      });
      userContext.setUser(data);
      history.push("/");
    } catch (e) {
      //console.log("error", e)
    }
  }, []);

  const pushInsideApp = () => {
    const usp = new URLSearchParams(props.location.search);
    const returnUrl = usp.get("returnUrl");
    if (returnUrl) history.push(returnUrl);
    else history.push("/");
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, formikBag) => {
      try {
        let data = await fetch({
          url: Endpoints.auth.login,
          data: values,
          method: "POST",
        });
        userContext.setUser(data.user);
        pushInsideApp();
      } catch (err) {
        if (err.status === 403)
          themeContext.showErrorSnackbar({
            message: "auth.wrongEmailOrPassword",
          });
        else if (err.status === 404)
          themeContext.showErrorSnackbar({
            message: "auth." + err.data.message,
          });
      }
    },
    validationSchema,
    validate: (values) => {
      validationSchema.isValid(values).then((e) => setDisableButton(!e));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  if (loading || loadingRedirect === true) return <RoundLoader />;
  return (
    <div id="login">
      <Helmet title={`${config.name.short} - ${t("auth.login")}`} />

      <div id="loginForm">
        <img
          width="300px"
          className="mb-5 self-center"
          src={process.env.PUBLIC_URL + "/img/logos/longLogo.svg"}
          alt="Main logo"
        />
        <Typography align="center" variant="h3" gutterBottom>
          {t("auth.login")}
        </Typography>
        {
          // ? FORM
        }
        <form onSubmit={loginFormik.handleSubmit} className="mt-6">
          <div id="formInputs">
            <TextField
              error={
                loginFormik.touched.email && Boolean(loginFormik.errors.email)
              }
              id="email"
              label={"Email"}
              variant="filled"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.email}
              helperText={
                loginFormik.touched.email &&
                t(loginFormik.errors.Email)
              }
            />

            <TextField
              error={
                loginFormik.touched.password &&
                Boolean(loginFormik.errors.password)
              }
              variant="filled"
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.password}
              helperText={
                loginFormik.touched.password && t(loginFormik.errors.password)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div id="submitInput">
            <Button
              size="large"
              type="submit"
              disabled={disableButton || loginFormik.isSubmitting}
              variant="contained"
              color="primary"
            >
              {t("auth.login")}
            </Button>
          </div>
        </form>
        {/*<span className="mb-3 mt-10">
              <Divider />
              <span className="flex justify-center mt-1">
                <Typography variant="body2">
                  {t("auth.loginWithThirdParty")}
                </Typography>
              </span>
            </span>
            <div className=" flex justify-center">
              <FacebookLoginButton
                iconSize="15px"
                align="center"
                onClick={socialLogin('facebook')}
              >
                {t("auth.loginWithFacebook")}
              </FacebookLoginButton>
              <GoogleLoginButton
                iconSize="15px"
                align="center"
                onClick={socialLogin('google')}
              >
                {t("auth.loginWithGoogle")}
              </GoogleLoginButton>
            </div>*/}
      </div>
    </div>
  );
}

export default Login;
