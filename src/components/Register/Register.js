import { useState } from 'react';

export default function Register(props) {
    const [ registerName, setName ] = useState('');
    const [ registerEmail, setEmail ] = useState('');
    const [ registerPassword, setPassword ] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value)
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    };
    const onSubmitRegister = () => {
        fetch('https://face-recognition-api-iucp.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword
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
                    <fieldset id="register" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={onNameChange} 
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="mt3 mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
                            onClick={onSubmitRegister}
                            className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                        />
                    </div>
                </div>
            </main>
        </article>
    );
}