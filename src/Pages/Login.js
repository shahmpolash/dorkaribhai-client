import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
   

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);


      let from = location.state?.from?.pathname || "/";
      if(loading || gLoading){
        return <Loading></Loading>
      }

      if(user || gUser){
        navigate(from, { replace: true});
      }

    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
        navigate('/dashboard');
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">User Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" class="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                  value: /[A-Za-z]{3}/,
                                  message: 'Provide a Valid Email' 
                                }
                              })}
                             />
                            <label class="label">
                                {errors.email?.type === 'required' && 'Email is Required'}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" class="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                  value: 6,
                                  message: 'Minimum 6 Characters' 
                                }
                              })}
                             />
                            <label class="label">
                                {errors.password?.type === 'required' && 'Password is Required'}
                            </label>
                        </div>

                        <input className='btn w-full max-w-xs' type="submit" value="Login" />
                    </form>
                    <p>New to DorkariBhai <Link className='text-primary' to="/signup">Create New Account</Link></p>
                    <div className="divider">Or</div>
                    <button className="btn btn-outline" onClick={() => signInWithGoogle()} >Join With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;