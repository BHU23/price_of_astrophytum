import ModelSignInSignUp from "@/components/login/model_signIn_signUp";

export default function Login() {
  
    return (
      <div className="h-full w-full bg-transparent relative">
            <ModelSignInSignUp canClose={false} />
      </div>
    );
};