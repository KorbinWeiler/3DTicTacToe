export default function LoginPage(){
    let username = '';
    let password = '';
    let validUserLogin = true

    function validateUser(){
        if(username == '' && password == ''){
            validUserLogin = false;
        }
    }

    return(
        <>
            <div className="login-form">
                <form>
                    <label>Username</label>
                    <input className="input" type='text' placeholder="Username" onChange={(e)=>{username = e.target.value;}}></input>
                    <label>Password</label>
                    <input className="input" type="text" placeholder="Password" onChange={(e)=>{password=e.target.value;}}/>
                    <button type='button' onClick={validateUser}>Login</button>
                </form>
            </div>
        </>
    )
}