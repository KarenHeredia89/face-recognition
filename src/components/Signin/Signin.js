import { useState } from 'react';

export default function Signin(props) {
    const [ signInEmail, setSignInEmail ] = useState('')
    const [ signInPassword, setSignInPassword ] = useState('')

    const onEmailChange = (e) => {
        setSignInEmail(e.target.value)
    };
    const onPasswordChange = (e) => {
        setSignInPassword(e.target.value)
    };

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                props.loadUser(user)
                props.onRouteChange('home')
            }
        })
        
    };

    return(
        <article className="center br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5" style={{margin: 'auto'}}>
            <main className="pa4">
                <div className="measure tc">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">
                            Email
                        </label>
                        <input 
                            onChange={onEmailChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={onPasswordChange}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p 
                            onClick={() => props.onRouteChange('register')} 
                            className="f6 link dim white db pointer">
                            Register
                        </p>
                        
                    </div>
                </div>
            </main>
        </article>
    );
}