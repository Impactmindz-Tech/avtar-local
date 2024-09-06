// import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
// import { app } from "@/FirebaseConfig/config"; // Ensure this path is correct
// import { registrationApi } from "@/utills/service/authService";
// import { setLocalStorage } from "@/utills/LocalStorageUtills";
// import toast from "react-hot-toast";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export const signupgoogle = async (navigate) => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     const user = result.user;

//     console.log("User:", user);
//     console.log("Token:", token);
//     const body = {
//       userName: user?.displayName,
//       email: user?.email,
//       uid: user?.uid,
//       isgoogleSignin: true,
//     };
//     if (user) {
//       try {
//         const response = await registrationApi(body);
//         console.log(response);
//         if (response?.isSucces) {
//           console.log(response);
//           toast.success(response?.message);
//           setLocalStorage("user_Signup", response?.data);
//           navigate("/auth/role/" + response?.data?._id);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData?.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);

//     console.error("Error Code:", errorCode);
//     console.error("Error Message:", errorMessage);
//     console.error("Email:", email);
//     console.error("Credential:", credential);

//     // Handle errors appropriately, e.g., show error message to the user
//   }
// };
