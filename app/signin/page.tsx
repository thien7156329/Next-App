"use client";
import React, { useEffect, useState } from "react";
import signIn from "../../pages/api/auth/signin";
import signUp from "../../pages/api/auth/signup";
import { useRouter } from "next/navigation";
import {
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../Providers";
import PhoneInput from "react-phone-number-input/input";
import { getToken, Messaging } from "firebase/messaging";
import firebase_app from "app/config";
import { getMessaging } from "firebase/messaging";

interface IForm {
  option: number;
}

function Page() {
  const [option, setOption] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState<ConfirmationResult>(
    {} as ConfirmationResult
  );

  const router = useRouter();

  const onSigin = async () => {
    try {
      const { result, error } = await signIn(email, password);
      if (error || result === null) {
        alert("Please check your email and password");
        return console.log(error);
      }
      // else successful
      return router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSignup = async () => {
    try {
      if (confirmPassword !== password) {
        alert("Please check your password !");
        return;
      }
      const { result, error } = await signUp(email, password);
      if (error) {
        return console.log(error);
      }
      return router.push("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        alert("That email address is invalid!");
      }
    }
  };

  const onResetEmail = async () => {
    try {
      if (!validateEmail) {
        alert("Please check your email !");
      }
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent please check it");
      setOption(1);
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const signinWithPhone = async () => {
    if (phoneNumber === "") return;

    let verify = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    await signInWithPhoneNumber(auth, phoneNumber, verify)
      .then((result) => {
        setResult(result);
        setOption(5);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const ValidateOtp = () => {
    if (otp === null) return;
    result
      .confirm(otp)
      .then((result) => {
        console.log("VERIFY_SUCCESS", result);
        router.push("/");
      })
      .catch((err) => {
        console.log(err, "ccc");
        alert("Incorrect code");
      });
  };

  const handleForm = async (event: any) => {
    event.preventDefault();
    switch (option) {
      case 1:
        onSigin();
        break;
      case 2:
        onSignup();
        break;
      case 3:
        onResetEmail();
        break;
      case 4:
        signinWithPhone();
        break;
      case 5:
        ValidateOtp();
        break;
      default:
        break;
    }
  };

  const getTokenFCM = async () => {
    const messagingFB = getMessaging(firebase_app);
    const fcm_token = await getToken(messagingFB, {
      vapidKey: "g3KgUs6cQB6Prpz7YG7AGXXAHwb-qfoD6erJ1n90Ad8",
    });
    console.log(fcm_token, "fcm_token");
    return fcm_token;
  };

  useEffect(() => {
    console.log("ccc");
    getTokenFCM();
  }, []);

  return (
    <div className="container-signin">
      <div className="header-signin">
        <div
          className={
            "header-headings " +
            (option === 1
              ? "sign-in"
              : option === 2
              ? "sign-up"
              : option === 3
              ? "forgot"
              : "signin-with-phone")
          }
        >
          <span>Sign in to your account</span>
          <span>Create an account</span>
          <span>Reset your password</span>
          <span>Signin With Phone</span>
        </div>
      </div>
      <ul className="options">
        <li
          className={option === 1 ? "active" : ""}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? "active" : ""}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
        <li
          className={option === 3 ? "active" : ""}
          onClick={() => setOption(3)}
        >
          Forgot
        </li>
        <li
          className={option === 4 ? "active" : ""}
          onClick={() => setOption(4)}
        >
          Phone
        </li>
      </ul>
      <form className="account-form" onSubmit={handleForm}>
        <div
          className={
            "account-form-fields " +
            (option === 1
              ? "sign-in"
              : option === 2
              ? "sign-up"
              : option === 3
              ? "forgot"
              : "signin-with-phone")
          }
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className={option > 3 ? "hidden" : ""}
            disabled={option === 4 ? true : false}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className={option > 3 ? "hidden" : ""}
            required={option === 1 || option === 2 ? true : false}
            disabled={option === 3 || option === 4 ? true : false}
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="repeat-password"
            name="repeat-password"
            type="password"
            placeholder="Repeat password"
            className={option > 3 ? "hidden" : ""}
            required={option === 2 ? true : false}
            disabled={option !== 2 ? true : false}
          />
          <PhoneInput
            country="VN"
            value={phoneNumber}
            onChange={(e: string) => setPhoneNumber(e)}
            className={option !== 4 ? "hidden" : ""}
          />
          {/* <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phone-number"
            name="phone-number"
            type="number"
            placeholder="Phone Number"
            required={option === 4 ? true : false}
            disabled={option !== 4 && option !== 2 ? true : false}
            className={option > 4 ? "hidden" : ""}
          /> */}
          <input
            onChange={(e) => setOtp(e.target.value)}
            id="otp"
            name="otp"
            type="number"
            placeholder="OTP"
            className={option !== 5 ? "hidden" : ""}
          />
        </div>
        <div id="recaptcha-container"></div>
        <button className="btn-submit-form" type="submit">
          {option === 1
            ? "Sign in"
            : option === 2
            ? "Sign up"
            : option === 3
            ? "Reset password"
            : option === 4
            ? "Signin With Phone"
            : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default Page;
