import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
const navigate = useNavigate();

useEffect(()=>{
    (async function(){
        try{
            const result = await axios.post("http://localhost:5000/api/user/session/verification");
            if(result.data.message == "success"){
                navigate("/")
            }
        } catch (error){
            console.error(error)
        }
    })()
})

const [formData, setFromData] = useState({
    email: "",
    password: ""
});

const handleFormSubmit = (e)=>{
    const {name, value} = e.target;
    setFromData((prevData)=>({
         ...prevData,
        [name]: value
    }));
}

const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        console.log("Form Data", formData)
        const result = await axios.post("/api/user/login/verification", formData);
        if(result.data.message == "success"){
            navigate('/')
            console.log(result.data.message)
        }
        // success

    } catch (error){
        console.log("System Error: ", error)
        console.error()
    }
}
  return (
    <main className="login-page min-h-screen flex bg-slate-50">
        {/* Brand panel - visible on large screens */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#005ee2] text-white">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-white/10" />
            <div className="absolute top-1/2 right-16 h-40 w-40 rounded-full border-2 border-white/20" />

            <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                    EngineDigital
                    <span className="block font-light text-white/90">Project Management</span>
                </h1>
                <div className="mt-6 h-1 w-16 rounded-full bg-white/70" />
                <p className="mt-6 max-w-md text-lg text-white/80">
                    Plan, track and deliver your projects — all in one place.
                </p>
            </div>
        </section>

        {/* Form panel */}
        <section className="flex w-full lg:w-1/2 items-center justify-center px-4 py-10 sm:px-6">
            <div className="w-full max-w-md">
                {/* Heading for small screens */}
                <div className="mb-8 text-center lg:hidden">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#005ee2]">
                        EngineDigital Project Management
                    </h1>
                </div>

                <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-slate-800">Welcome back</h2>
                        <p className="mt-1 text-sm text-slate-500">Sign in to continue to your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter email here.."
                                value={formData.email}
                                onChange={handleFormSubmit}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15"
                            />
                        </div>

                        <div>
                            <label htmlFor="pass" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="pass"
                                placeholder="Enter password here.."
                                value={formData.password}
                                onChange={handleFormSubmit}
                                required
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#005ee2] focus:ring-4 focus:ring-[#005ee2]/15"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-[#005ee2] px-4 py-3 font-semibold text-white shadow-lg shadow-[#005ee2]/30 transition hover:bg-[#004bb5] focus:outline-none focus:ring-4 focus:ring-[#005ee2]/30 active:scale-[0.99]"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} EngineDigital. All rights reserved.
                </p>
            </div>
        </section>
    </main>
  )
}

export default Login